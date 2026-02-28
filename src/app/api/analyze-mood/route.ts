import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = "AIzaSyCny0zUO5kE1XisDj2VlUXQYz1w_FrPIOY";

const VALID_STATES = [
  "grieving",
  "angry",
  "confused",
  "hopeful",
  "accepting",
  "lonely",
  "anxious",
  "grateful",
  "nostalgic",
  "mixed",
];

export async function POST(req: NextRequest) {
  try {
    const { content } = (await req.json()) as { content?: string };
    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const prompt = `You analyze journal entries for emotional/mental state. Return ONLY valid JSON, no markdown or extra text.

Rules:
- state: MUST be exactly one of: ${VALID_STATES.join(", ")}
- intensity: number 1-10 (1=very low, 10=very strong)
- briefInsight: one short supportive sentence, max 15 words

Journal entry:
"""
${content.slice(0, 8000)}
"""

Return ONLY this JSON, nothing else: {"state":"X","intensity":N,"briefInsight":"Y"}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 256,
          },
        }),
      }
    );

    const data = (await res.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      error?: { message?: string };
    };

    if (!res.ok) {
      const errMsg = data.error?.message ?? (typeof data === "object" ? JSON.stringify(data) : "Unknown");
      console.error("Gemini API error:", errMsg);
      return NextResponse.json({ error: "Mood analysis failed", details: errMsg }, { status: 500 });
    }

    const parts = data.candidates?.[0]?.content?.parts ?? [];
    let text = parts.map((p: { text?: string }) => p.text ?? "").join("").trim();
    text = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/g, "")
      .trim();

    let parsed: { state?: string; intensity?: number; briefInsight?: string };
    try {
      parsed = JSON.parse(text) as typeof parsed;
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]) as typeof parsed;
        } catch {
          const fixed = match[0].replace(/,(\s*[}\]])/g, "$1");
          try {
            parsed = JSON.parse(fixed) as typeof parsed;
          } catch {
            const stateMatch = match[0].match(/"state"\s*:\s*"([^"]+)"/);
            const intensityMatch = match[0].match(/"intensity"\s*:\s*(\d+)/);
            if (stateMatch && intensityMatch) {
              parsed = {
                state: stateMatch[1],
                intensity: parseInt(intensityMatch[1], 10),
                briefInsight: "",
              };
            } else {
              console.error("Gemini parse failed, raw:", text.slice(0, 300));
              return NextResponse.json({ error: "Invalid response from AI" }, { status: 500 });
            }
          }
        }
      } else {
        const stateMatch = text.match(/"state"\s*:\s*"([^"]+)"/);
        const intensityMatch = text.match(/"intensity"\s*:\s*(\d+)/);
        if (stateMatch && intensityMatch) {
          parsed = {
            state: stateMatch[1],
            intensity: parseInt(intensityMatch[1], 10),
            briefInsight: "",
          };
        } else {
          console.error("Gemini parse failed, raw:", text.slice(0, 300));
          return NextResponse.json({ error: "Invalid response from AI" }, { status: 500 });
        }
      }
    }

    const state = VALID_STATES.includes(parsed.state ?? "")
      ? parsed.state
      : "mixed";
    const intensity = Math.min(10, Math.max(1, Number(parsed.intensity) || 5));
    const briefInsight =
      typeof parsed.briefInsight === "string"
        ? parsed.briefInsight.slice(0, 100)
        : "";

    return NextResponse.json({
      state,
      intensity,
      briefInsight,
    });
  } catch (err) {
    console.error("analyze-mood error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

/**
 * Quick test for the mood analysis API.
 * Run with: node scripts/test-mood-api.js
 * Make sure the dev server is running (npm run dev) first.
 */

const testContent =
  "Today was really hard. I miss them so much but I know I need to move on. Part of me feels hopeful about the future.";

async function test() {
  console.log("Testing /api/analyze-mood...");
  console.log("Content:", testContent.slice(0, 50) + "...\n");

  try {
    const res = await fetch("http://localhost:3000/api/analyze-mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: testContent }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("FAILED:", res.status, JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log("SUCCESS!");
    console.log("State:", data.state);
    console.log("Intensity:", data.intensity + "/10");
    console.log("Insight:", data.briefInsight || "(none)");
  } catch (err) {
    console.error("Error:", err.message);
    console.log("\nMake sure the dev server is running: npm run dev");
    process.exit(1);
  }
}

test();

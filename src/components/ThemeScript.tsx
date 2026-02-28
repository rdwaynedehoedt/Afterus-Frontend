"use client";

import Script from "next/script";

export default function ThemeScript() {
  return (
    <Script
      id="theme-init"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var theme = localStorage.getItem('after-us-theme');
            if (theme === 'light' || theme === 'dark') {
              document.documentElement.setAttribute('data-theme', theme);
            } else {
              document.documentElement.setAttribute('data-theme', 'dark');
            }
          })();
        `,
      }}
    />
  );
}

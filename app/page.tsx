"use client";

import { useEffect, useRef, useState } from "react";

type RoleKey = "Designer" | "FE Dev" | "CIS";

const checklists: Record<RoleKey, { section: string; items: string[] }[]> = {
  Designer: [
    {
      section: "Color & Contrast",
      items: [
        "Text contrast ratio is at least 7:1 (AAA)",
        "Large text contrast ratio is at least 4.5:1 (AAA)",
        "UI components and graphical objects meet 3:1 contrast ratio",
        "Color is never the sole means of conveying information",
      ],
    },
    {
      section: "Focus & Interaction",
      items: [
        "Focus indicator is clearly visible and meets 3:1 contrast change",
        "Focus order follows a logical, meaningful sequence",
        "Hover and focus states do not obscure adjacent content",
        "Pointer and touch targets are at least 44×44 CSS pixels",
      ],
    },
    {
      section: "Typography & Layout",
      items: [
        "Text can be resized up to 200% without loss of content or function",
        "Line height is at least 1.5× the font size",
        "Letter spacing can be increased to 0.12em without breaking layout",
        "Content reflows without horizontal scrolling at 320px viewport width",
      ],
    },
    {
      section: "Motion & Animation",
      items: [
        "All non-essential animation can be disabled via prefers-reduced-motion",
        "No content flashes more than 3 times per second",
        "Parallax and auto-playing animations respect motion preferences",
      ],
    },
  ],
  "FE Dev": [
    {
      section: "Semantic HTML",
      items: [
        "Headings follow a logical hierarchy (h1 → h2 → h3…)",
        "Landmark roles (main, nav, header, footer) are present and unique",
        "Lists use ul, ol, or dl elements appropriately",
        "Tables include caption, th with scope, and summary where needed",
      ],
    },
    {
      section: "Keyboard & Focus",
      items: [
        "All interactive elements are reachable and operable via keyboard",
        "No keyboard trap exists anywhere on the page",
        "Custom widgets implement the correct ARIA keyboard interaction patterns",
        "focus-visible styles are never removed without an accessible replacement",
      ],
    },
    {
      section: "ARIA & Roles",
      items: [
        "ARIA roles, states, and properties are valid and accurately reflect usage",
        "aria-label or aria-labelledby is provided for all icon-only controls",
        "Live regions (aria-live) announce dynamic content updates to screen readers",
        "Modal dialogs trap focus when open and restore it on close",
      ],
    },
    {
      section: "Forms & Errors",
      items: [
        "Every input has a programmatically associated label element",
        "Error messages identify the field and describe how to correct it",
        "Required fields are identified both visually and programmatically",
        "Autocomplete attributes are set on fields that collect personal data",
      ],
    },
  ],
  CIS: [
    {
      section: "Plain Language",
      items: [
        "Reading level does not exceed lower-secondary education (WCAG AAA 3.1.5)",
        "Unusual words and jargon are defined inline or in a glossary",
        "Abbreviations are expanded on first use",
        "Pronunciation guidance is provided for words with ambiguous meaning",
      ],
    },
    {
      section: "Structure & Navigation",
      items: [
        "Page titles are unique and clearly describe the page purpose",
        "Section headings accurately describe the content that follows",
        "Link text is descriptive out of context — no 'click here' or 'read more'",
        "Multiple navigation paths exist to reach each page",
      ],
    },
    {
      section: "Multimedia & Alternatives",
      items: [
        "All images have meaningful alt text (empty alt for decorative images)",
        "Complex images such as charts have extended text descriptions",
        "Videos include accurate captions and a full audio description track",
        "Sign language interpretation is provided for prerecorded video (AAA)",
      ],
    },
    {
      section: "Timing & Context",
      items: [
        "No time limits are imposed, or users can extend or disable them",
        "Context changes are never triggered without explicit user intent",
        "Help and error recovery options are consistently available across pages",
      ],
    },
  ],
};

// ─── Role config ──────────────────────────────────────────────────────────────

const roleConfig = {
  Designer: {
    description: "UI/UX & Visual Design",
    // Light: white card + violet-700 text/border — contrast ≥ 6.5:1 (AAA) against white
    lightBtn:
      "bg-white text-violet-700 border-2 border-violet-700 hover:bg-violet-50 active:bg-violet-100 focus-visible:ring-violet-700",
    // Dark: gradient — violet-600 gives ≥ 5.3:1 against white text (AA)
    darkBtn:
      "bg-gradient-to-br from-violet-600 to-purple-700 text-white hover:from-violet-700 hover:to-purple-800 active:from-violet-800 active:to-purple-900 focus-visible:ring-violet-300",
    lightHeading: "text-violet-700",
    darkHeading: "text-violet-400",
    lightBorder: "border-violet-700",
    darkBorder: "border-violet-500",
    lightCheckbox: "accent-violet-700",
    darkCheckbox: "accent-violet-400",
  },
  "FE Dev": {
    description: "Front-End Development",
    // Light: blue-700 text/border — contrast ≥ 6.1:1 (AAA) against white
    lightBtn:
      "bg-white text-blue-700 border-2 border-blue-700 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-700",
    // Dark: cyan-700→blue-700 — cyan-700 gives ≥ 4.9:1 (AA) against white
    darkBtn:
      "bg-gradient-to-br from-cyan-700 to-blue-700 text-white hover:from-cyan-800 hover:to-blue-800 active:from-cyan-900 active:to-blue-900 focus-visible:ring-cyan-300",
    lightHeading: "text-blue-700",
    darkHeading: "text-cyan-400",
    lightBorder: "border-blue-700",
    darkBorder: "border-cyan-600",
    lightCheckbox: "accent-blue-700",
    darkCheckbox: "accent-cyan-400",
  },
  CIS: {
    description: "Content & Info Strategy",
    // Light: emerald-700 text/border — contrast ≥ 5.0:1 (AA) against white
    lightBtn:
      "bg-white text-emerald-700 border-2 border-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 focus-visible:ring-emerald-700",
    // Dark: emerald-700→teal-700 — both give ≥ 5.0:1 (AA) against white
    darkBtn:
      "bg-gradient-to-br from-emerald-700 to-teal-700 text-white hover:from-emerald-800 hover:to-teal-800 active:from-emerald-900 active:to-teal-900 focus-visible:ring-emerald-300",
    lightHeading: "text-emerald-700",
    darkHeading: "text-emerald-400",
    lightBorder: "border-emerald-700",
    darkBorder: "border-emerald-600",
    lightCheckbox: "accent-emerald-700",
    darkCheckbox: "accent-emerald-400",
  },
} satisfies Record<RoleKey, object>;

// ─── SVG icons ────────────────────────────────────────────────────────────────

function DesignerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function FeDevIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10"
      aria-hidden="true"
      focusable="false"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  );
}

function CisIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

const roleIcons: Record<RoleKey, () => React.ReactElement> = {
  Designer: DesignerIcon,
  "FE Dev": FeDevIcon,
  CIS: CisIcon,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [view, setView] = useState<"home" | "checklist">("home");
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState<RoleKey | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const backRef = useRef<HTMLButtonElement | null>(null);

  // Initialise theme from localStorage, then system preference
  useEffect(() => {
    const stored = localStorage.getItem("wcag-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("wcag-theme", next);
      return next;
    });
  }

  function fadeTransition(next: () => void, msg: string) {
    setVisible(false);
    setTimeout(() => {
      next();
      setAnnouncement(msg);
      setVisible(true);
    }, 300);
  }

  // addEventListener on each role button
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const labels: RoleKey[] = ["Designer", "FE Dev", "CIS"];

    labels.forEach((label) => {
      const el = buttonRefs.current[label];
      if (!el) return;

      function handleCardClick() {
        fadeTransition(
          () => {
            setSelected(label);
            setView("checklist");
          },
          `Showing ${label} WCAG 2.2 AAA checklist`
        );
      }

      el.addEventListener("click", handleCardClick);
      cleanups.push(() => el.removeEventListener("click", handleCardClick));
    });

    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // addEventListener on the back button (re-runs whenever ref target changes)
  useEffect(() => {
    const el = backRef.current;
    if (!el) return;

    function handleBackClick() {
      fadeTransition(
        () => {
          setView("home");
          setSelected(null);
        },
        "Showing role selection"
      );
    }

    el.addEventListener("click", handleBackClick);
    return () => el.removeEventListener("click", handleBackClick);
  });

  const isDark = theme === "dark";

  // ── Shared theme classes ──
  const pageBg = isDark ? "bg-gray-950" : "bg-gray-50";
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const subtitleColor = isDark ? "text-gray-400" : "text-gray-600";
  const ringOffset = isDark
    ? "focus-visible:ring-offset-gray-950"
    : "focus-visible:ring-offset-gray-50";
  const sectionHeaderColor = isDark ? "text-gray-400" : "text-gray-500";
  const itemTextColor = isDark ? "text-gray-200" : "text-gray-800";
  const dividerColor = isDark ? "border-gray-700" : "border-gray-200";
  const backBtnColor = isDark
    ? "text-gray-400 hover:text-white focus-visible:ring-gray-400"
    : "text-gray-600 hover:text-gray-900 focus-visible:ring-gray-700";
  const toggleBtnColor = isDark
    ? "text-gray-300 hover:text-white hover:bg-gray-800 focus-visible:ring-gray-300"
    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-700";

  return (
    <>
      {/* ── Skip link (WCAG 2.4.1) ── */}
      <a
        href="#main-content"
        className={[
          "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50",
          "focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold",
          "focus:outline-none focus:ring-2",
          isDark
            ? "focus:bg-white focus:text-gray-900 focus:ring-white"
            : "focus:bg-gray-900 focus:text-white focus:ring-gray-900",
        ].join(" ")}
      >
        Skip to main content
      </a>

      {/* ── ARIA live region for view-transition announcements (WCAG 4.1.3) ── */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      <div className={`${pageBg} min-h-screen`}>
        {/* ── Header: theme toggle ── */}
        <header className="flex justify-end p-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
            className={[
              "p-2.5 rounded-lg transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              ringOffset,
              toggleBtnColor,
            ].join(" ")}
          >
            {isDark ? (
              /* Sun icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </header>

        {/* ── Main content ── */}
        <main
          id="main-content"
          className="flex flex-col items-center justify-center px-6 pb-12"
          style={{ minHeight: "calc(100vh - 68px)" }}
        >
          <div
            style={{ transition: "opacity 300ms ease" }}
            className={visible ? "opacity-100" : "opacity-0"}
          >
            {view === "home" ? (
              /* ── Home: role selector ── */
              <section aria-labelledby="role-heading">
                <h1
                  id="role-heading"
                  className={`text-3xl font-bold mb-2 tracking-tight text-center ${headingColor}`}
                >
                  Select Your Role
                </h1>
                <p className={`mb-12 text-sm text-center ${subtitleColor}`}>
                  Choose the role that best describes you
                </p>

                <div
                  role="list"
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                  {(["Designer", "FE Dev", "CIS"] as RoleKey[]).map((label) => {
                    const cfg = roleConfig[label];
                    const Icon = roleIcons[label];
                    const btnCls = isDark ? cfg.darkBtn : cfg.lightBtn;

                    return (
                      <div key={label} role="listitem">
                        <button
                          ref={(el) => {
                            buttonRefs.current[label] = el;
                          }}
                          type="button"
                          className={[
                            "group flex flex-col items-center gap-4 px-8 py-8 rounded-2xl",
                            "font-semibold shadow-md",
                            "transition-all duration-200",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                            ringOffset,
                            "hover:scale-105 hover:shadow-xl active:scale-95",
                            "min-w-[9rem]",
                            btnCls,
                          ].join(" ")}
                        >
                          <span className="transition-transform duration-200 group-hover:-translate-y-1">
                            <Icon />
                          </span>
                          <span className="flex flex-col items-center gap-1">
                            <span className="text-lg leading-tight">{label}</span>
                            <span
                              className={`text-xs font-normal ${isDark ? "opacity-80" : "opacity-70"}`}
                            >
                              {cfg.description}
                            </span>
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : (
              /* ── Checklist view ── */
              selected && (
                <div className="w-full max-w-2xl mx-auto">
                  {/* Back button */}
                  <button
                    ref={(el) => {
                      backRef.current = el;
                    }}
                    type="button"
                    className={[
                      "flex items-center gap-2 mb-8 text-sm font-medium rounded",
                      "transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      ringOffset,
                      backBtnColor,
                    ].join(" ")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back to roles
                  </button>

                  {/* Checklist header */}
                  <h1
                    className={`text-4xl font-bold mb-1 ${isDark ? roleConfig[selected].darkHeading : roleConfig[selected].lightHeading}`}
                  >
                    {selected}
                  </h1>
                  <p className={`text-sm mb-2 ${subtitleColor}`}>
                    {roleConfig[selected].description}
                  </p>
                  <p className={`text-xs mb-8 ${subtitleColor}`}>
                    WCAG 2.2 AAA accessibility checklist
                  </p>

                  <hr className={`mb-8 ${dividerColor}`} aria-hidden="true" />

                  {/* Checklist sections */}
                  <div className="space-y-8">
                    {checklists[selected].map(({ section, items }) => (
                      <section
                        key={section}
                        aria-labelledby={`section-${section.replace(/\s+/g, "-")}`}
                        className={`border-l-2 pl-5 ${isDark ? roleConfig[selected].darkBorder : roleConfig[selected].lightBorder}`}
                      >
                        <h2
                          id={`section-${section.replace(/\s+/g, "-")}`}
                          className={`text-xs font-semibold uppercase tracking-widest mb-4 ${sectionHeaderColor}`}
                        >
                          {section}
                        </h2>
                        <ul className="space-y-3">
                          {items.map((item) => {
                            const id = `chk-${item.slice(0, 32).replace(/\W+/g, "-")}`;
                            return (
                              <li key={item} className="flex items-start gap-3">
                                <input
                                  type="checkbox"
                                  id={id}
                                  className={[
                                    "mt-0.5 h-4 w-4 shrink-0 rounded cursor-pointer",
                                    isDark
                                      ? "border-gray-600 bg-gray-800"
                                      : "border-gray-400 bg-white",
                                    isDark
                                      ? roleConfig[selected].darkCheckbox
                                      : roleConfig[selected].lightCheckbox,
                                  ].join(" ")}
                                />
                                <label
                                  htmlFor={id}
                                  className={`text-sm leading-snug cursor-pointer select-none ${itemTextColor}`}
                                >
                                  {item}
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </main>
      </div>
    </>
  );
}

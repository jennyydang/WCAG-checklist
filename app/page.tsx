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
        "Focus indicator is clearly visible and high-contrast",
        "Focus order follows a logical, meaningful sequence",
        "Hover and focus states do not obscure adjacent content",
        "Pointer/touch targets are at least 44×44 px",
      ],
    },
    {
      section: "Typography & Layout",
      items: [
        "Text can be resized up to 200% without loss of content",
        "Line height is at least 1.5× font size",
        "Letter spacing can be increased to 0.12em without breaking layout",
        "No horizontal scrolling at 320px viewport width",
      ],
    },
    {
      section: "Motion & Animation",
      items: [
        "All non-essential animation can be disabled (prefers-reduced-motion)",
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
        "Landmark roles (main, nav, header, footer) are present",
        "Lists use <ul>/<ol>/<dl> elements appropriately",
        "Tables have <caption>, <th scope>, and summary where needed",
      ],
    },
    {
      section: "Keyboard & Focus",
      items: [
        "All interactive elements are reachable and operable via keyboard",
        "No keyboard trap exists anywhere in the page",
        "Custom widgets implement correct ARIA keyboard patterns",
        "focus-visible is never overridden without an equivalent replacement",
      ],
    },
    {
      section: "ARIA & Roles",
      items: [
        "ARIA roles, states, and properties are valid and match usage",
        "aria-label / aria-labelledby are provided for all icon-only controls",
        "Live regions (aria-live) are used for dynamic content updates",
        "Modal dialogs trap focus and restore it on close",
      ],
    },
    {
      section: "Forms & Errors",
      items: [
        "Every input has a programmatically associated <label>",
        "Error messages identify the field and describe how to fix it",
        "Required fields are identified both visually and programmatically",
        "Autocomplete attributes are set on common personal-data fields",
      ],
    },
  ],
  CIS: [
    {
      section: "Plain Language",
      items: [
        "Reading level does not exceed lower-secondary education (WCAG AAA 3.1.5)",
        "Unusual words and jargon are defined or avoided",
        "Abbreviations are expanded on first use",
        "Pronunciation guidance is provided for ambiguous words",
      ],
    },
    {
      section: "Structure & Navigation",
      items: [
        "Page titles are unique and describe the page purpose",
        "Section headings accurately describe the content that follows",
        "Link text is descriptive out of context (no 'click here')",
        "Multiple navigation paths exist to reach each page",
      ],
    },
    {
      section: "Multimedia & Alternatives",
      items: [
        "All images have meaningful alt text (or empty alt for decorative)",
        "Complex images (charts, diagrams) have extended descriptions",
        "Videos include captions and a full audio description track",
        "Sign language interpretation is provided for prerecorded video (AAA)",
      ],
    },
    {
      section: "Timing & Context",
      items: [
        "No time limits are imposed, or users can extend/disable them",
        "Context changes are not triggered without user intent",
        "Help and error recovery options are consistently available",
      ],
    },
  ],
};

const roleAccent: Record<RoleKey, string> = {
  Designer: "text-violet-400",
  "FE Dev": "text-cyan-400",
  CIS: "text-emerald-400",
};

const roleBorder: Record<RoleKey, string> = {
  Designer: "border-violet-500",
  "FE Dev": "border-cyan-500",
  CIS: "border-emerald-500",
};

const roleCheckbox: Record<RoleKey, string> = {
  Designer: "accent-violet-500",
  "FE Dev": "accent-cyan-500",
  CIS: "accent-emerald-500",
};

export default function Home() {
  // "home" | "checklist"
  const [view, setView] = useState<"home" | "checklist">("home");
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState<RoleKey | null>(null);

  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const backRef = useRef<HTMLButtonElement | null>(null);

  const roles: {
    label: RoleKey;
    description: string;
    icon: React.ReactNode;
    accent: string;
    ring: string;
    hover: string;
  }[] = [
    {
      label: "Designer",
      description: "UI/UX & Visual Design",
      icon: (
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
        >
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
      accent: "from-violet-500 to-purple-600",
      ring: "focus-visible:ring-violet-400",
      hover: "hover:from-violet-600 hover:to-purple-700",
    },
    {
      label: "FE Dev",
      description: "Front-End Development",
      icon: (
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
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      ),
      accent: "from-cyan-500 to-blue-600",
      ring: "focus-visible:ring-cyan-400",
      hover: "hover:from-cyan-600 hover:to-blue-700",
    },
    {
      label: "CIS",
      description: "Content & Info Strategy",
      icon: (
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
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      accent: "from-emerald-500 to-teal-600",
      ring: "focus-visible:ring-emerald-400",
      hover: "hover:from-emerald-600 hover:to-teal-700",
    },
  ];

  function fadeTransition(next: () => void) {
    setVisible(false);
    setTimeout(() => {
      next();
      setVisible(true);
    }, 300);
  }

  // Attach addEventListener("click", handler) to each role button
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    roles.forEach(({ label }) => {
      const el = buttonRefs.current[label];
      if (!el) return;

      function handleCardClick() {
        fadeTransition(() => {
          setSelected(label);
          setView("checklist");
        });
      }

      el.addEventListener("click", handleCardClick);
      cleanups.push(() => el.removeEventListener("click", handleCardClick));
    });

    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Attach addEventListener("click", handler) to the back button
  useEffect(() => {
    const el = backRef.current;
    if (!el) return;

    function handleBackClick() {
      fadeTransition(() => {
        setView("home");
        setSelected(null);
      });
    }

    el.addEventListener("click", handleBackClick);
    return () => el.removeEventListener("click", handleBackClick);
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 px-6 py-12">
      <div
        style={{ transition: "opacity 300ms ease" }}
        className={visible ? "opacity-100" : "opacity-0"}
      >
        {view === "home" ? (
          <>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight text-center">
              Select Your Role
            </h1>
            <p className="text-gray-400 mb-12 text-sm text-center">
              Choose the role that best describes you
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {roles.map(({ label, description, icon, accent, ring, hover }) => (
                <button
                  key={label}
                  ref={(el) => {
                    buttonRefs.current[label] = el;
                  }}
                  type="button"
                  className={`
                    group flex flex-col items-center gap-4 px-8 py-8 rounded-2xl
                    bg-gradient-to-br ${accent} ${hover}
                    text-white font-semibold shadow-lg
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-4 ${ring} focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950
                    active:scale-95 hover:scale-105 hover:shadow-2xl
                    min-w-[9rem]
                  `}
                >
                  <span className="transition-transform duration-200 group-hover:-translate-y-1">
                    {icon}
                  </span>
                  <span className="flex flex-col items-center gap-1">
                    <span className="text-lg leading-tight">{label}</span>
                    <span className="text-xs font-normal opacity-80">{description}</span>
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          selected && (
            <div className="w-full max-w-2xl mx-auto">
              {/* Back button */}
              <button
                ref={(el) => {
                  backRef.current = el;
                }}
                type="button"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded"
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
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back to roles
              </button>

              {/* Checklist header */}
              <h1 className={`text-4xl font-bold mb-1 ${roleAccent[selected]}`}>
                {selected}
              </h1>
              <p className="text-gray-400 text-sm mb-8">
                WCAG 2.2 AAA accessibility checklist
              </p>

              {/* Checklist sections */}
              <div className="space-y-8">
                {checklists[selected].map(({ section, items }) => (
                  <div
                    key={section}
                    className={`border-l-2 ${roleBorder[selected]} pl-5`}
                  >
                    <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-4">
                      {section}
                    </h2>
                    <ul className="space-y-3">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id={item}
                            className={`mt-0.5 h-4 w-4 shrink-0 rounded border-gray-600 bg-gray-800 cursor-pointer ${roleCheckbox[selected]}`}
                          />
                          <label
                            htmlFor={item}
                            className="text-sm text-gray-200 leading-snug cursor-pointer select-none"
                          >
                            {item}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}

export default function Home() {
  const roles = [
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

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 px-4">
      <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
        Select Your Role
      </h1>
      <p className="text-gray-400 mb-12 text-sm">
        Choose the role that best describes you
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        {roles.map(({ label, description, icon, accent, ring, hover }) => (
          <button
            key={label}
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
    </main>
  );
}

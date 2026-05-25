import { PROJECTS } from "@/constants/data";

export default function ProjectsSection() {
  return (
    <section className="flex flex-col items-center py-24 px-6 relative bg-zinc-950 border-t border-zinc-900">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">
            Featured Projects
          </h2>
          <p className="text-zinc-400 text-sm mt-1 text-center md:text-left">
            Koleksi aplikasi dan sistem yang udah gue kembangin.
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, idx) => (
          <div
            key={idx}
            className="project-card bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col group hover:border-zinc-700 transition-all duration-300"
          >
            {/* Preview placeholder */}
            <div className="relative w-full h-48 bg-zinc-950">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-600 font-bold tracking-widest text-xs uppercase">
                {project.title} Preview
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2 text-zinc-100 group-hover:text-red-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-white flex items-center gap-1 hover:text-red-400 transition-colors w-fit"
              >
                View Repository
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
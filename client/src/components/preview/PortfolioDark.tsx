import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioDark() {
  const { userData } = useBuilder();

  return (
    <div id="portfolio-preview-content" className="bg-gray-950 text-white">
      {/* Hero Banner */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{userData.fullName}</h1>
          <p className="text-3xl text-gray-300 mb-3">{userData.role}</p>
          <p className="text-lg text-gray-400">{userData.portfolioHero || "Crafting beautiful and functional digital experiences"}</p>
        </div>
      </section>

      {/* About Section */}
      {userData.summary && (
        <section className="py-16 px-6 border-b border-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">About Section</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{userData.summary}</p>
          </div>
        </section>
      )}

      {/* Skills Pills */}
      {userData.skills?.length > 0 && (
        <section className="py-16 px-6 border-b border-gray-800 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Skills Pills</h2>
            <div className="flex flex-wrap gap-3">{userData.skills.map((s, i) => <span key={i} className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/50 font-medium">{s}</span>)}</div>
          </div>
        </section>
      )}

      {/* Project Gallery */}
      {userData.projects?.length > 0 && (
        <section className="py-16 px-6 border-b border-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">Project Gallery</h2>
            <div className="grid grid-cols-2 gap-6">
              {userData.projects.map((p, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition">
                  <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-cyan-400 mb-3">{p.tools}</p>
                  <p className="text-gray-400">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Cards */}
      {userData.experience?.length > 0 && (
        <section className="py-16 px-6 border-b border-gray-800 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">Experience Cards</h2>
            <div className="space-y-6">
              {userData.experience.map((e, i) => (
                <div key={i} className="border-l-2 border-cyan-500 pl-6 py-4">
                  <h3 className="text-xl font-bold text-white mb-1">{e.role}</h3>
                  <p className="text-cyan-400 font-semibold mb-1">{e.organization}</p>
                  <p className="text-sm text-gray-500 mb-2">{e.duration}</p>
                  <p className="text-gray-400">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer Contact */}
      <footer className="py-16 px-6 text-center border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-white">Footer Contact</h2>
          <p className="text-xl text-gray-300 mb-2">{userData.email}</p>
          <p className="text-xl text-gray-300">{userData.phone}</p>
        </div>
      </footer>
    </div>
  );
}

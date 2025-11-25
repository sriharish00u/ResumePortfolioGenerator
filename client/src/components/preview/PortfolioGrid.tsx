import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioGrid() {
  const { userData } = useBuilder();

  return (
    <div id="portfolio-preview-content" className="bg-white">
      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-2">{userData.fullName}</h1>
          <p className="text-2xl text-slate-300 mb-4">{userData.role}</p>
          <p className="text-lg text-slate-400">{userData.portfolioHero || "Creative Developer & Designer"}</p>
        </div>
      </section>

      {/* About */}
      {userData.summary && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">About</h2>
            <p className="text-gray-700 text-lg">{userData.summary}</p>
          </div>
        </section>
      )}

      {/* Skills Grid */}
      {userData.skills?.length > 0 && (
        <section className="py-16 px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Skills Grid</h2>
            <div className="grid grid-cols-3 gap-4">{userData.skills.map((s, i) => <div key={i} className="bg-white p-4 rounded-lg text-center font-semibold text-gray-700">{s}</div>)}</div>
          </div>
        </section>
      )}

      {/* Project Grid */}
      {userData.projects?.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Project Cards Grid</h2>
            <div className="grid grid-cols-2 gap-6">
              {userData.projects.map((p, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{p.tools}</p>
                  <p className="text-gray-700">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Timeline */}
      {userData.experience?.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Experience Timeline</h2>
            <div className="space-y-6">
              {userData.experience.map((e, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-1 bg-blue-600 rounded-full"></div>
                  <div className="flex-1 pb-6">
                    <h3 className="text-xl font-bold text-gray-900">{e.role}</h3>
                    <p className="text-blue-600 font-semibold">{e.organization}</p>
                    <p className="text-sm text-gray-500 mb-2">{e.duration}</p>
                    <p className="text-gray-700">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-xl mb-2">{userData.email}</p>
          <p className="text-xl">{userData.phone}</p>
        </div>
      </footer>
    </div>
  );
}

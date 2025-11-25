import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioSimple() {
  const { userData } = useBuilder();

  return (
    <div id="portfolio-preview-content" className="bg-white">
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
        <div className="max-w-4xl mx-auto">
          {userData.profileImage && (
            <img src={userData.profileImage} alt={userData.fullName} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-white" />
          )}
          <h1 className="text-5xl font-bold mb-2">{userData.fullName}</h1>
          <p className="text-2xl mb-4">{userData.role}</p>
          <p className="text-lg max-w-2xl mx-auto">{userData.portfolioHero || "Building beautiful digital experiences"}</p>
        </div>
      </section>

      {/* About */}
      {userData.summary && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">About</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{userData.summary}</p>
          </div>
        </section>
      )}

      {/* Skills */}
      {userData.skills?.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Skills</h2>
            <div className="flex flex-wrap gap-3">{userData.skills.map((s, i) => <span key={i} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">{s}</span>)}</div>
          </div>
        </section>
      )}

      {/* Projects */}
      {userData.projects?.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Projects</h2>
            <div className="space-y-6">
              {userData.projects.map((p, i) => (
                <div key={i} className="border-l-4 border-blue-600 pl-6 py-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{p.tools}</p>
                  <p className="text-gray-700">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements */}
      {userData.achievements?.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Achievements</h2>
            <div className="space-y-3">{userData.achievements.map((a, i) => <p key={i} className="text-gray-700">✓ {a.title}</p>)}</div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="py-16 px-6 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl mb-4">{userData.email}</p>
          <p className="text-xl">{userData.phone}</p>
        </div>
      </section>
    </div>
  );
}

import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioBrand() {
  const { userData } = useBuilder();

  return (
    <div id="portfolio-preview-content" className="bg-white">
      {/* Intro with Photo */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto flex gap-10 items-center">
          {userData.profileImage && (
            <img src={userData.profileImage} alt={userData.fullName} className="w-40 h-40 rounded-2xl object-cover flex-shrink-0 border-4 border-white" />
          )}
          <div>
            <h1 className="text-5xl font-bold mb-2">{userData.fullName}</h1>
            <p className="text-2xl mb-3">{userData.role}</p>
            <p className="text-lg">{userData.portfolioHero || "Passionate about creating exceptional digital products"}</p>
          </div>
        </div>
      </section>

      {/* About Me */}
      {userData.summary && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">About Me</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{userData.summary}</p>
          </div>
        </section>
      )}

      {/* Expertise */}
      {userData.skills?.length > 0 && (
        <section className="py-16 px-6 bg-indigo-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Expertise</h2>
            <div className="grid grid-cols-2 gap-4">
              {userData.skills.map((s, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border-l-4 border-indigo-600">
                  <p className="font-semibold text-gray-900">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Showcase */}
      {userData.projects?.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Projects Showcase</h2>
            <div className="space-y-8">
              {userData.projects.map((p, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-8 border-l-4 border-purple-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 font-semibold">{p.tools}</p>
                  <p className="text-gray-700">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {userData.achievements?.length > 0 && (
        <section className="py-16 px-6 bg-purple-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Certifications & Awards</h2>
            <div className="space-y-3">{userData.achievements.map((a, i) => <div key={i} className="bg-white p-4 rounded-lg border-l-4 border-purple-600"><p className="font-semibold text-gray-900">{a.title}</p></div>)}</div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl mb-2">{userData.email}</p>
          <p className="text-xl">{userData.phone}</p>
        </div>
      </section>
    </div>
  );
}

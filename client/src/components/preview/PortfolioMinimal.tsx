import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioMinimal() {
  const { userData } = useBuilder();

  return (
    <div id="portfolio-preview-content" className="bg-white">
      {/* Landing Hero */}
      <section className="py-32 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          {userData.profileImage && (
            <img src={userData.profileImage} alt={userData.fullName} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gray-200" />
          )}
          <h1 className="text-6xl font-bold text-gray-900 mb-3">{userData.fullName}</h1>
          <p className="text-2xl text-gray-600 mb-4">{userData.role}</p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{userData.portfolioHero || "Building digital products with passion and precision"}</p>
        </div>
      </section>

      {/* Skills Snapshot */}
      {userData.skills?.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Skills Snapshot</h2>
            <div className="flex flex-wrap justify-center gap-3">{userData.skills.map((s, i) => <span key={i} className="px-3 py-1 bg-white text-gray-700 rounded-md font-medium border border-gray-200">{s}</span>)}</div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {userData.projects?.length > 0 && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h2>
            <div className="space-y-6">
              {userData.projects.map((p, i) => (
                <div key={i} className="pb-6 border-b border-gray-200 last:border-b-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{p.tools}</p>
                  <p className="text-gray-700">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {userData.summary && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">About Section</h2>
            <p className="text-gray-700 text-center leading-relaxed">{userData.summary}</p>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl mb-4">{userData.email}</p>
          <p className="text-xl">{userData.phone}</p>
        </div>
      </section>
    </div>
  );
}

import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioPreview() {
  const { userData } = useBuilder();

  return (
    <div id="portfolio-preview-content" className="bg-white min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {userData.profileImage && (
            <img
              src={userData.profileImage}
              alt={userData.fullName}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-xl"
            />
          )}
          <h1 className="text-5xl font-bold mb-4">
            {userData.fullName || "Your Name"}
          </h1>
          <p className="text-2xl mb-6 text-blue-100">
            {userData.role || "Your Role"}
          </p>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto text-blue-50">
            {userData.portfolioHero || userData.summary || "Welcome to my portfolio"}
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            {userData.email && (
              <a href={`mailto:${userData.email}`} className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                Contact Me
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            About Me
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {userData.summary || "Tell us about yourself..."}
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-gray-600">
            {userData.email && <span>{userData.email}</span>}
            {userData.phone && <span>•</span>}
            {userData.phone && <span>{userData.phone}</span>}
          </div>
          {userData.links && (
            <div className="flex items-center justify-center gap-6 mt-4">
              {userData.links.github && (
                <a href={userData.links.github} className="text-blue-600 hover:underline">
                  GitHub
                </a>
              )}
              {userData.links.linkedin && (
                <a href={userData.links.linkedin} className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              )}
              {userData.links.portfolio && (
                <a href={userData.links.portfolio} className="text-blue-600 hover:underline">
                  Portfolio
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      {userData.skills && userData.skills.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 bg-blue-50 text-blue-700 rounded-lg text-center font-semibold"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {userData.projects && userData.projects.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {userData.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {project.images && project.images.length > 0 && (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-blue-600 mb-3 font-medium">
                      {project.tools}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    {project.images && project.images.length > 1 && (
                      <div className="grid grid-cols-3 gap-2">
                        {project.images.slice(1, 4).map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`${project.title} screenshot ${imgIndex + 2}`}
                            className="w-full h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {userData.hasExperience && userData.experience && userData.experience.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Experience
            </h2>
            <div className="space-y-6">
              {userData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.role}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {exp.organization}
                      </p>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {userData.achievements && Array.isArray(userData.achievements) && userData.achievements.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Achievements & Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {userData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {achievement.title}
                  </h3>
                  {achievement.description && (
                    <p className="text-gray-700">
                      {achievement.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {userData.education && userData.education.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Education
            </h2>
            <div className="space-y-6">
              {userData.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right text-gray-600">
                      <p>{edu.startYear} - {edu.endYear}</p>
                      {edu.grade && (
                        <p className="font-semibold">{edu.grade}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg mb-8 text-blue-50">
            I'm always open to discussing new projects and opportunities
          </p>
          <div className="flex items-center justify-center gap-6">
            {userData.email && (
              <a
                href={`mailto:${userData.email}`}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Get in Touch
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

import { useBuilder } from "@/contexts/BuilderContext";

export function ResumeCreative() {
  const { userData, sectionVisibility } = useBuilder();

  return (
    <div id="resume-preview-content" className="bg-white p-12 min-h-[1122px] w-[794px]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg text-center">
        {userData.profileImage && (
          <img src={userData.profileImage} alt={userData.fullName} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-white" />
        )}
        <h1 className="text-3xl font-bold">{userData.fullName}</h1>
        <p className="text-lg mt-1">{userData.role}</p>
      </div>

      {/* Tagline */}
      {sectionVisibility.summary && userData.summary && (
        <div className="mb-6 text-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h2 className="font-bold text-gray-900 mb-2">What I Can Do</h2>
          <p className="text-sm text-gray-700">{userData.summary}</p>
        </div>
      )}

      {/* Technologies */}
      {sectionVisibility.skills && userData.skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Technologies & Skills</h2>
          <div className="flex flex-wrap gap-2">{userData.skills.map((s, i) => <span key={i} className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">{s}</span>)}</div>
        </div>
      )}

      {/* Projects */}
      {sectionVisibility.projects && userData.projects?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">My Projects</h2>
          {userData.projects.map((p, i) => (
            <div key={i} className="mb-3 p-3 border-l-4 border-purple-500 bg-purple-50">
              <h3 className="font-semibold text-gray-900">{p.title}</h3>
              <p className="text-xs text-gray-600 mb-1">{p.tools}</p>
              <p className="text-sm text-gray-700">{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {sectionVisibility.achievements && userData.achievements?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Certifications & Achievements</h2>
          {userData.achievements.map((a, i) => (
            <div key={i} className="mb-2 flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              <p className="text-sm text-gray-700">{a.title}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {sectionVisibility.education && userData.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Education</h2>
          {userData.education.map((e, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold text-gray-900">{e.degree} in {e.field}</p>
              <p className="text-sm text-gray-600">{e.institution} ({e.startYear})</p>
            </div>
          ))}
        </div>
      )}

      {/* Hobbies */}
      {sectionVisibility.hobbies && userData.hobbies?.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Hobbies & Interests</h2>
          <p className="text-sm text-gray-700">{userData.hobbies.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

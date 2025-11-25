import { useBuilder } from "@/contexts/BuilderContext";

export function ResumeSingleColumn() {
  const { userData, sectionVisibility } = useBuilder();

  return (
    <div id="resume-preview-content" className="bg-white p-12 min-h-[1122px] w-[794px]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="mb-8 flex gap-6 items-start">
        {userData.profileImage && (
          <img src={userData.profileImage} alt={userData.fullName} className="w-24 h-24 rounded-lg object-cover" />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900">{userData.fullName}</h1>
          <p className="text-xl text-blue-600 font-semibold mt-1">{userData.role}</p>
          <div className="flex gap-3 text-sm text-gray-600 mt-2">
            {userData.email && <span>{userData.email}</span>}
            {userData.phone && <span>•</span>}
            {userData.phone && <span>{userData.phone}</span>}
          </div>
        </div>
      </div>

      {/* Profile */}
      {sectionVisibility.summary && userData.summary && (
        <div className="mb-7">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Professional Profile</h2>
          <p className="text-gray-700 leading-relaxed">{userData.summary}</p>
        </div>
      )}

      {/* Skills */}
      {sectionVisibility.skills && userData.skills?.length > 0 && (
        <div className="mb-7">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Skills</h2>
          <div className="grid grid-cols-3 gap-2">{userData.skills.map((s, i) => <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">{s}</span>)}</div>
        </div>
      )}

      {/* Experience */}
      {sectionVisibility.experience && userData.experience?.length > 0 && (
        <div className="mb-7">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Experience</h2>
          {userData.experience.map((e, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{e.role}</h3>
                  <p className="text-sm text-gray-600">{e.organization}</p>
                </div>
                <p className="text-xs text-gray-500">{e.duration}</p>
              </div>
              <p className="text-sm text-gray-700 mt-1">{e.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {sectionVisibility.projects && userData.projects?.length > 0 && (
        <div className="mb-7">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Projects</h2>
          {userData.projects.map((p, i) => (
            <div key={i} className="mb-4">
              <h3 className="font-bold text-gray-900">{p.title}</h3>
              <p className="text-xs text-gray-500 mb-1">{p.tools}</p>
              <p className="text-sm text-gray-700">{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {sectionVisibility.education && userData.education?.length > 0 && (
        <div className="mb-7">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Education</h2>
          {userData.education.map((e, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-bold text-gray-900">{e.degree} in {e.field}</h3>
              <p className="text-sm text-gray-600">{e.institution} ({e.startYear} - {e.endYear})</p>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {sectionVisibility.achievements && userData.achievements?.length > 0 && (
        <div className="mb-7">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Achievements</h2>
          {userData.achievements.map((a, i) => (
            <p key={i} className="text-sm text-gray-700 mb-1">• {a.title}</p>
          ))}
        </div>
      )}
    </div>
  );
}

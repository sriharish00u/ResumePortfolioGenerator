import { useBuilder } from "@/contexts/BuilderContext";

export function ResumeClassic() {
  const { userData, sectionVisibility } = useBuilder();

  return (
    <div id="resume-preview-content" className="bg-white p-12 min-h-[1122px] w-[794px]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="mb-8 text-center">
        {userData.profileImage && (
          <img src={userData.profileImage} alt={userData.fullName} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
        )}
        <h1 className="text-3xl font-bold text-gray-900">{userData.fullName || "Your Name"}</h1>
        <p className="text-lg text-gray-600 mt-1">{userData.role || "Your Role"}</p>
        <div className="flex justify-center gap-3 text-sm text-gray-600 mt-2">
          {userData.email && <span>{userData.email}</span>}
          {userData.phone && <span>•</span>}
          {userData.phone && <span>{userData.phone}</span>}
        </div>
      </div>

      {/* Summary */}
      {sectionVisibility.summary && userData.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">Summary</h2>
          <p className="text-gray-700">{userData.summary}</p>
        </div>
      )}

      {/* Skills */}
      {sectionVisibility.skills && userData.skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">{userData.skills.map((s, i) => <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">{s}</span>)}</div>
        </div>
      )}

      {/* Education */}
      {sectionVisibility.education && userData.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">Education</h2>
          {userData.education.map((e, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-semibold text-gray-900">{e.institution}</h3>
              <p className="text-sm text-gray-600">{e.degree} in {e.field}</p>
              <p className="text-xs text-gray-500">{e.startYear} - {e.endYear}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {sectionVisibility.projects && userData.projects?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">Projects</h2>
          {userData.projects.map((p, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-semibold text-gray-900">{p.title}</h3>
              <p className="text-xs text-gray-500 mb-1">{p.tools}</p>
              <p className="text-sm text-gray-700">{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {sectionVisibility.experience && userData.experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">Experience</h2>
          {userData.experience.map((e, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-semibold text-gray-900">{e.role} at {e.organization}</h3>
              <p className="text-xs text-gray-500 mb-1">{e.duration}</p>
              <p className="text-sm text-gray-700">{e.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {sectionVisibility.achievements && userData.achievements?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">Achievements</h2>
          {userData.achievements.map((a, i) => (
            <div key={i} className="mb-2">
              <p className="text-sm text-gray-700">• {a.title}</p>
            </div>
          ))}
        </div>
      )}

      {/* Hobbies */}
      {sectionVisibility.hobbies && userData.hobbies?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">Hobbies</h2>
          <p className="text-sm text-gray-700">{userData.hobbies.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

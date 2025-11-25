import { useBuilder } from "@/contexts/BuilderContext";

export function ResumeExperience() {
  const { userData, sectionVisibility } = useBuilder();

  return (
    <div id="resume-preview-content" className="bg-white p-12 min-h-[1122px] w-[794px]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Title */}
      <div className="mb-8 border-b-4 border-blue-600 pb-4">
        {userData.profileImage && (
          <img src={userData.profileImage} alt={userData.fullName} className="w-16 h-16 rounded-full object-cover mb-3" />
        )}
        <h1 className="text-4xl font-bold text-gray-900">{userData.fullName}</h1>
        <p className="text-2xl text-blue-600 font-semibold">{userData.role}</p>
      </div>

      {/* Experience (Primary) */}
      {sectionVisibility.experience && userData.experience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-4">Professional Experience</h2>
          {userData.experience.map((e, i) => (
            <div key={i} className="mb-5 relative pl-6 border-l-4 border-blue-400">
              <div className="absolute left-[-12px] top-0 w-5 h-5 bg-blue-600 rounded-full"></div>
              <h3 className="font-bold text-gray-900">{e.role}</h3>
              <p className="text-sm text-blue-600 font-semibold">{e.organization}</p>
              <p className="text-xs text-gray-500 mb-1">{e.duration}</p>
              <p className="text-sm text-gray-700">{e.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {sectionVisibility.skills && userData.skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">Core Skills</h2>
          <div className="flex flex-wrap gap-2">{userData.skills.map((s, i) => <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-medium text-sm">{s}</span>)}</div>
        </div>
      )}

      {/* Projects */}
      {sectionVisibility.projects && userData.projects?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">Key Projects</h2>
          {userData.projects.map((p, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-semibold text-gray-900">{p.title}</h3>
              <p className="text-xs text-gray-500 mb-1">{p.tools}</p>
              <p className="text-sm text-gray-700">{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {sectionVisibility.education && userData.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">Education</h2>
          {userData.education.map((e, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold text-gray-900">{e.degree} in {e.field}</p>
              <p className="text-sm text-gray-600">{e.institution} ({e.startYear})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

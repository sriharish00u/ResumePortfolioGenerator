import { useBuilder } from "@/contexts/BuilderContext";

export function ResumeModern() {
  const { userData, sectionVisibility } = useBuilder();

  return (
    <div id="resume-preview-content" className="bg-white min-h-[1122px] w-[794px] flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Left Sidebar */}
      <div className="w-60 bg-gray-50 p-8 border-r border-gray-200">
        {userData.profileImage && (
          <img src={userData.profileImage} alt={userData.fullName} className="w-32 h-32 rounded-lg mx-auto mb-4 object-cover" />
        )}
        <h1 className="text-xl font-bold text-gray-900 text-center mb-1">{userData.fullName}</h1>
        <p className="text-xs text-gray-600 text-center mb-6">{userData.role}</p>

        {/* Contact */}
        <div className="mb-8 pb-6 border-b border-gray-300">
          <h3 className="font-bold text-gray-900 text-sm mb-2">Contact</h3>
          <p className="text-xs text-gray-600 break-all">{userData.email}</p>
          <p className="text-xs text-gray-600">{userData.phone}</p>
        </div>

        {/* Skills */}
        {sectionVisibility.skills && userData.skills?.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 text-sm mb-3">Skills</h3>
            <div className="space-y-1">{userData.skills.map((s, i) => <p key={i} className="text-xs text-gray-600">• {s}</p>)}</div>
          </div>
        )}

        {/* Links */}
        {userData.links && (
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 text-sm mb-2">Links</h3>
            <div className="space-y-1 text-xs">
              {userData.links.github && <a href={userData.links.github} className="text-blue-600 break-all block">GitHub</a>}
              {userData.links.linkedin && <a href={userData.links.linkedin} className="text-blue-600 break-all block">LinkedIn</a>}
              {userData.links.portfolio && <a href={userData.links.portfolio} className="text-blue-600 break-all block">Portfolio</a>}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8">
        {/* Profile */}
        {sectionVisibility.summary && userData.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">Profile</h2>
            <p className="text-sm text-gray-700">{userData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {sectionVisibility.experience && userData.experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">Experience</h2>
            {userData.experience.map((e, i) => (
              <div key={i} className="mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">{e.role} • {e.organization}</h3>
                <p className="text-xs text-gray-500">{e.duration}</p>
                <p className="text-sm text-gray-700">{e.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {sectionVisibility.projects && userData.projects?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">Projects</h2>
            {userData.projects.map((p, i) => (
              <div key={i} className="mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">{p.title}</h3>
                <p className="text-sm text-gray-700">{p.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {sectionVisibility.education && userData.education?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">Education</h2>
            {userData.education.map((e, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold text-sm text-gray-900">{e.degree} in {e.field}</p>
                <p className="text-xs text-gray-600">{e.institution} ({e.startYear}-{e.endYear})</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useBuilder } from "@/contexts/BuilderContext";

export function ResumePreview() {
  const { userData, sectionVisibility } = useBuilder();

  return (
    <div id="resume-preview-content" className="bg-white p-12 min-h-[1122px] w-[794px]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="mb-8 text-center">
        {userData.profileImage && (
          <img
            src={userData.profileImage}
            alt={userData.fullName}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
          />
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {userData.fullName || "Your Name"}
        </h1>
        <p className="text-xl text-gray-600 mb-3">
          {userData.role || "Your Role"}
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          {userData.email && <span>{userData.email}</span>}
          {userData.phone && <span>•</span>}
          {userData.phone && <span>{userData.phone}</span>}
        </div>
        {userData.links && (
          <div className="flex items-center justify-center gap-4 text-sm text-blue-600 mt-2">
            {userData.links.github && <a href={userData.links.github}>GitHub</a>}
            {userData.links.linkedin && <a href={userData.links.linkedin}>LinkedIn</a>}
            {userData.links.portfolio && <a href={userData.links.portfolio}>Portfolio</a>}
          </div>
        )}
      </div>

      {/* Summary */}
      {sectionVisibility.summary && userData.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-blue-600 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {userData.summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-blue-600 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {userData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {sectionVisibility.education && userData.education && userData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Education
          </h2>
          {userData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{edu.startYear} - {edu.endYear}</p>
                  {edu.grade && <p className="font-medium">{edu.grade}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Projects
          </h2>
          {userData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold text-gray-900">{project.title}</h3>
              <p className="text-sm text-blue-600 mb-1">{project.tools}</p>
              <p className="text-gray-700 leading-relaxed mb-2">{project.description}</p>
              {project.images && project.images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {project.images.slice(0, 3).map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img}
                      alt={`${project.title} screenshot ${imgIndex + 1}`}
                      className="w-32 h-20 object-cover rounded border border-gray-200"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {sectionVisibility.experience && userData.hasExperience && userData.experience && userData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Experience
          </h2>
          {userData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-700">{exp.organization}</p>
                </div>
                <p className="text-sm text-gray-600">{exp.duration}</p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {sectionVisibility.achievements && userData.achievements && Array.isArray(userData.achievements) && userData.achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Achievements & Certifications
          </h2>
          {userData.achievements.map((achievement, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
              {achievement.description && (
                <p className="text-gray-700 text-sm">{achievement.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Hobbies */}
      {sectionVisibility.hobbies && userData.hobbies && Array.isArray(userData.hobbies) && userData.hobbies.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 border-b-2 border-blue-600 pb-1">
            Hobbies & Interests
          </h2>
          <p className="text-gray-700">
            {userData.hobbies.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

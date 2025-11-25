import { useEffect } from "react";
import { useLocation } from "wouter";
import { useBuilder } from "@/contexts/BuilderContext";
import { ProgressStepper } from "@/components/ProgressStepper";
import { BasicInfo } from "@/components/builder-steps/BasicInfo";
import { SkillsEducation } from "@/components/builder-steps/SkillsEducation";
import { ProjectsExperience } from "@/components/builder-steps/ProjectsExperience";
import { AchievementsHobbies } from "@/components/builder-steps/AchievementsHobbies";
import { DataManagement } from "@/components/DataManagement";

const steps = [
  { id: 1, title: "Basic Info", description: "Profile & Contact" },
  { id: 2, title: "Skills & Education", description: "Your Expertise" },
  { id: 3, title: "Projects & Experience", description: "Your Work" },
  { id: 4, title: "Final Touches", description: "Achievements & More" },
];

export default function Builder() {
  const { currentStep, setCurrentStep } = useBuilder();
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setLocation("/templates");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setLocation("/");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfo onNext={handleNext} onBack={handleBack} />;
      case 1:
        return <SkillsEducation onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <ProjectsExperience onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <AchievementsHobbies onNext={handleNext} onBack={handleBack} />;
      default:
        return <BasicInfo onNext={handleNext} onBack={handleBack} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <ProgressStepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-6 py-8">
        <div className="lg:col-span-2">
          <div className="pb-20">
            {renderStep()}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <DataManagement />
          </div>
        </div>
      </div>
    </div>
  );
}

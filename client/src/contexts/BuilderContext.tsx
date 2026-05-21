import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { UserData, SectionVisibility, SectionOrder } from "@shared/schema";
import { storage } from "@/lib/storage";

interface BuilderContextType {
  userData: Partial<UserData>;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;
  sectionVisibility: SectionVisibility;
  updateSectionVisibility: (visibility: Partial<SectionVisibility>) => void;
  sectionOrder: SectionOrder;
  updateSectionOrder: (order: SectionOrder) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isSaving: boolean;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(
    storage.getSectionVisibility()
  );
  const [sectionOrder, setSectionOrder] = useState<SectionOrder>(
    storage.getSectionOrder()
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Load data on mount
  useEffect(() => {
    const savedData = storage.getUserData();
    if (savedData) {
      setUserData(savedData);
    }
  }, []);

  const updateUserData = (data: Partial<UserData>) => {
    setIsSaving(true);
    setUserData((prev) => {
      // Deep merge for nested objects and arrays
      const updated: Partial<UserData> = { ...prev };
      
      // Handle nested links object
      if (data.links) {
        updated.links = { ...prev.links, ...data.links };
      }
      
      // Handle arrays - replace completely when provided
      if (data.skills !== undefined) updated.skills = data.skills;
      if (data.education !== undefined) updated.education = data.education;
      if (data.projects !== undefined) updated.projects = data.projects;
      if (data.experience !== undefined) updated.experience = data.experience;
      if (data.achievements !== undefined) updated.achievements = data.achievements;
      if (data.hobbies !== undefined) updated.hobbies = data.hobbies;
      
      // Handle other scalar values
      if (data.fullName !== undefined) updated.fullName = data.fullName;
      if (data.role !== undefined) updated.role = data.role;
      if (data.email !== undefined) updated.email = data.email;
      if (data.phone !== undefined) updated.phone = data.phone;
      if (data.profileImage !== undefined) updated.profileImage = data.profileImage;
      if (data.summary !== undefined) updated.summary = data.summary;
      if (data.hasExperience !== undefined) updated.hasExperience = data.hasExperience;
      if (data.portfolioHero !== undefined) updated.portfolioHero = data.portfolioHero;
      if (data.selectedTemplate !== undefined) updated.selectedTemplate = data.selectedTemplate;
      
      storage.saveUserData(updated);
      return updated;
    });
    setTimeout(() => setIsSaving(false), 500);
  };

  const clearUserData = () => {
    storage.clearUserData();
    setUserData({});
    setSectionVisibility(storage.getSectionVisibility());
    setSectionOrder(storage.getSectionOrder());
    setCurrentStep(0);
  };

  const updateSectionVisibility = (visibility: Partial<SectionVisibility>) => {
    setSectionVisibility((prev) => {
      const updated = { ...prev, ...visibility };
      storage.saveSectionVisibility(updated);
      return updated;
    });
  };

  const updateSectionOrder = (order: SectionOrder) => {
    setSectionOrder(order);
    storage.saveSectionOrder(order);
  };

  return (
    <BuilderContext.Provider
      value={{
        userData,
        updateUserData,
        clearUserData,
        sectionVisibility,
        updateSectionVisibility,
        sectionOrder,
        updateSectionOrder,
        currentStep,
        setCurrentStep,
        isSaving,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within BuilderProvider");
  }
  return context;
}

import type { UserData, SectionVisibility, SectionOrder } from "@shared/schema";

const STORAGE_KEY = "resume_builder_data";
const VISIBILITY_KEY = "resume_builder_visibility";
const ORDER_KEY = "resume_builder_order";

export const storage = {
  // User data operations
  getUserData(): UserData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading user data from localStorage:", error);
      return null;
    }
  },

  saveUserData(data: Partial<UserData>): void {
    try {
      const existing = this.getUserData() || {};
      const updated = { ...existing, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  },

  clearUserData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(VISIBILITY_KEY);
      localStorage.removeItem(ORDER_KEY);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },

  // Section visibility operations
  getSectionVisibility(): SectionVisibility {
    try {
      const data = localStorage.getItem(VISIBILITY_KEY);
      return data ? JSON.parse(data) : {
        summary: true,
        skills: true,
        education: true,
        projects: true,
        experience: true,
        achievements: true,
        hobbies: true,
      };
    } catch (error) {
      console.error("Error reading visibility data:", error);
      return {
        summary: true,
        skills: true,
        education: true,
        projects: true,
        experience: true,
        achievements: true,
        hobbies: true,
      };
    }
  },

  saveSectionVisibility(visibility: SectionVisibility): void {
    try {
      localStorage.setItem(VISIBILITY_KEY, JSON.stringify(visibility));
    } catch (error) {
      console.error("Error saving visibility data:", error);
    }
  },

  // Section order operations
  getSectionOrder(): SectionOrder {
    try {
      const data = localStorage.getItem(ORDER_KEY);
      return data ? JSON.parse(data) : [
        "summary",
        "skills",
        "education",
        "projects",
        "experience",
        "achievements",
        "hobbies",
      ];
    } catch (error) {
      console.error("Error reading order data:", error);
      return [
        "summary",
        "skills",
        "education",
        "projects",
        "experience",
        "achievements",
        "hobbies",
      ];
    }
  },

  saveSectionOrder(order: SectionOrder): void {
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    } catch (error) {
      console.error("Error saving order data:", error);
    }
  },

  // Image utilities
  async imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  async resizeImage(file: File, maxWidth: number = 800, maxHeight: number = 800): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};

import type { UserData } from "@shared/schema";

export const exportUserData = (userData: Partial<UserData>): string => {
  // Create exportable data with all images
  const exportData = {
    version: "1.0",
    exportDate: new Date().toISOString(),
    data: userData,
  };
  return JSON.stringify(exportData, null, 2);
};

export const importUserData = (jsonString: string): Partial<UserData> | null => {
  try {
    const parsed = JSON.parse(jsonString);
    // Validate basic structure
    if (parsed.data && typeof parsed.data === "object") {
      return parsed.data;
    }
    // If it's just the data object without wrapper
    if (parsed.fullName) {
      return parsed;
    }
    return null;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
};

export const downloadFile = (content: string, filename: string) => {
  const element = document.createElement("a");
  element.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

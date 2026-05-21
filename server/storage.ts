// This application uses client-side localStorage only
// No server-side storage is required per SRS requirements
// This file is kept minimal for potential future extensions

export interface IStorage {
  // Placeholder interface - no server storage needed
}

export class MemStorage implements IStorage {
  constructor() {
    // No server-side data storage
  }
}

export const storage = new MemStorage();

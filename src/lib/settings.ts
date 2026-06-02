import fs from 'fs';
import path from 'path';

export interface Category {
  id: string;
  name: string;
}

export interface SiteSettings {
  whatsappNumber: string;
  categories: Category[];
  featuredProducts: string[];
  latestProductsIds: string[];
}

const settingsFilePath = path.join(process.cwd(), 'src', 'data', 'settings.json');

const defaultSettings: SiteSettings = {
  whatsappNumber: "+90 552 546 75 04",
  categories: [
    { id: "mac", name: "Mac" },
    { id: "ipad", name: "iPad" },
    { id: "iphone", name: "iPhone" },
    { id: "watch", name: "Watch" },
    { id: "airpods", name: "AirPods" },
    { id: "dyson", name: "Dyson" },
    { id: "aksesuarlar", name: "Aksesuarlar" }
  ],
  featuredProducts: [],
  latestProductsIds: []
};

export function getSettings(): SiteSettings {
  try {
    if (!fs.existsSync(settingsFilePath)) {
      return defaultSettings;
    }
    const fileContents = fs.readFileSync(settingsFilePath, 'utf8');
    const parsed = JSON.parse(fileContents);
    return { ...defaultSettings, ...parsed };
  } catch (error) {
    console.error("Error reading settings:", error);
    return defaultSettings;
  }
}

export function updateSettings(newSettings: Partial<SiteSettings>): SiteSettings {
  const current = getSettings();
  const updated = { ...current, ...newSettings };
  try {
    fs.writeFileSync(settingsFilePath, JSON.stringify(updated, null, 2), 'utf8');
  } catch (error) {
    console.error("Error saving settings:", error);
  }
  return updated;
}

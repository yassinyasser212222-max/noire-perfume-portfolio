import { PortfolioProject, StudioContactConfig } from '../types/portfolio';

const STORAGE_KEY_CUSTOM_IMAGES = 'noire_custom_project_images_v1';
const STORAGE_KEY_CONTACT_CONFIG = 'noire_contact_config_v1';

export const DEFAULT_CONTACT_CONFIG: StudioContactConfig = {
  instagramHandle: 'yassinn_yasser_1',
  whatsappNumber: '201060073838',
  email: 'yassinyasser212222@gmail.com',
  location: 'Paris · Milan · New York',
};

/**
 * Returns the effective image source for a given project.
 * If user uploaded a custom image, it takes precedence over the default.
 */
export function getEffectiveImage(
  project: PortfolioProject,
  customImages: Record<string, string>
): string | null {
  if (customImages[project.id]) {
    return customImages[project.id];
  }
  return project.defaultImage;
}

/**
 * Determines whether a project is currently showing a placeholder.
 */
export function isShowingPlaceholder(
  project: PortfolioProject,
  customImages: Record<string, string>
): boolean {
  return !getEffectiveImage(project, customImages);
}

/**
 * Safely loads custom images map from localStorage.
 */
export function loadCustomImages(): Record<string, string> {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_CUSTOM_IMAGES);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Saves custom images to localStorage.
 */
export function saveCustomImages(images: Record<string, string>): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY_CUSTOM_IMAGES, JSON.stringify(images));
    return true;
  } catch (err) {
    console.warn('Failed to persist custom image to localStorage (quota or disabled):', err);
    return false;
  }
}

/**
 * Clears custom images from localStorage.
 */
export function clearAllCustomImages(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem(STORAGE_KEY_CUSTOM_IMAGES);
  }
}

/**
 * Formats Instagram URL from handle.
 */
export function formatInstagramUrl(handle: string): string {
  const clean = handle.trim().replace(/^@/, '');
  return clean ? `https://instagram.com/${clean}` : 'https://instagram.com';
}

/**
 * Formats WhatsApp URL from phone number.
 */
export function formatWhatsAppUrl(phone: string, message?: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  const base = digits ? `https://wa.me/${digits}` : 'https://wa.me';
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

/**
 * Validates whether an image file is an acceptable image type.
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];
  return validTypes.includes(file.type);
}

/**
 * Utility Functions for The Hotpot Website
 */

// Format price in Nigerian Naira
export const formatPrice = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG')}`;
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as +234 XXX XXX XXXX
  if (cleaned.startsWith('234')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  
  return phone;
};

// Create WhatsApp link with message
export const createWhatsAppLink = (number: string, message: string): string => {
  const cleanNumber = number.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};

// Generate order message for WhatsApp
export const generateOrderMessage = (items: Array<{ name: string; quantity: number; price: string }>): string => {
  let message = "Hello! I'd like to place an order from The Hotpot:\n\n";
  
  items.forEach((item) => {
    message += `• ${item.quantity}x ${item.name} - ${item.price}\n`;
  });
  
  message += "\nPlease confirm availability and delivery time. Thank you!";
  
  return message;
};

// Check if restaurant is open
export const isRestaurantOpen = (): { open: boolean; message: string } => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();
  
  // Closed on Sunday
  if (day === 0) {
    return { open: false, message: 'We are closed on Sundays' };
  }
  
  // Saturday hours: 10AM - 11PM
  if (day === 6) {
    if (hour >= 10 && hour < 23) {
      return { open: true, message: 'We are open!' };
    }
    return { open: false, message: 'Currently closed. Open 10AM - 11PM' };
  }
  
  // Weekday hours: 10AM - 10PM
  if (hour >= 10 && hour < 22) {
    return { open: true, message: 'We are open!' };
  }
  
  return { open: false, message: 'Currently closed. Open 10AM - 10PM' };
};

// Smooth scroll to section
export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// Calculate delivery fee (example logic)
export const calculateDeliveryFee = (orderTotal: number, area: string): number => {
  // Free delivery over ₦10,000
  if (orderTotal >= 10000) return 0;
  
  // Basic delivery fees by area
  const fees: Record<string, number> = {
    'mainland': 1500,
    'island': 2000,
    'lekki': 2500,
    'ajah': 3000,
  };
  
  return fees[area.toLowerCase()] || 2000;
};

// Validate phone number format
export const validatePhoneNumber = (phone: string): boolean => {
  // Nigerian phone number pattern
  const pattern = /^(\+?234|0)[789]\d{9}$/;
  return pattern.test(phone.replace(/\s/g, ''));
};

// Generate slug from text
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

// Format date for order confirmation
export const formatOrderDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Debounce function for search/filters
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Calculate order total
export const calculateOrderTotal = (items: Array<{ price: string; quantity: number }>): number => {
  return items.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + (price * item.quantity);
  }, 0);
};

export default {
  formatPrice,
  formatPhoneNumber,
  createWhatsAppLink,
  generateOrderMessage,
  isRestaurantOpen,
  scrollToSection,
  calculateDeliveryFee,
  validatePhoneNumber,
  generateSlug,
  copyToClipboard,
  formatOrderDate,
  debounce,
  calculateOrderTotal,
};

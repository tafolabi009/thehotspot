export interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  icon?: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
}

export interface PaymentDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface BusinessHours {
  day: string;
  hours: string;
  isOpen: boolean;
}

export type AnimationVariant = {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string | number[];
    };
  };
};

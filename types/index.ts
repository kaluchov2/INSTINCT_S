export interface Experience {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

export interface ReservationFormData {
  name: string;
  email: string;
  experience: string;
  preferredDate: string;
  message?: string;
}

// Database-backed types for reservation system
export interface Activity {
  id: string;
  experience_id: string;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  reserved_count: number;
  status: 'active' | 'cancelled' | 'completed';
  price_usd: number;
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  activity_id: string;
  customer_name: string;
  customer_email: string;
  phone?: string;
  participants: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  total_amount: number;
  additional_info?: string;
  confirmation_code: string;
  created_at: string;
  updated_at: string;
  activity?: Activity;
}

export interface BookingFormData {
  activityId: string;
  customerName: string;
  customerEmail: string;
  phone?: string;
  participants: number;
  additionalInfo?: string;
}

export interface ServiceItem {
  id: number;
  name: string;
  description?: string;
  price: number;
}


export interface Contact {
  name: string;
  email: string;
  phone: string;
}

export interface Service {
  name: string;
  price: string;
}

export interface Booking {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  booking_date: string;
  booking_time: string;
  services: Service[];
}

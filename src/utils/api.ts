// AdminPage
import type { Booking, ServiceItem } from "../types/types"; 

export const fetchBookings = async (): Promise<{ bookings: Booking[] }> => {
  const token: string | null = localStorage.getItem("token");
  if (!token) {
    throw new Error("You are not authorized to view this page.");
  }

  const response: Response = await fetch("http://localhost:5002/api/bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to fetch bookings.");
  }

  return await response.json();
};

// Booking
export const submitBooking = async (bookingData: any): Promise<void> => {
  console.log("Submitting booking:", bookingData); 

  try {
    const response = await fetch("http://localhost:5002/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      alert(`Error submitting booking: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    alert("Booking successful!");
  } catch (error) {
    console.error("Error submitting booking:", error);
    alert("An error occurred while submitting the booking.");
  }
};

// Login
export const login = async (email: string, password: string): Promise<string> => {
  const loginData = { email, password };

  const response = await fetch("http://localhost:5002/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password.");
  }

  const data = await response.json();
  return data.token; 
};

// Services
export const fetchServices = async (): Promise<ServiceItem[]> => {
  const response = await fetch("http://localhost:5002/api/services"); 

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return await response.json(); 
};



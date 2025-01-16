import { writable } from "svelte/store";
import type { ServiceItem } from "../types/types";

// Create a writable store to hold selected services
export const cartStore = writable<ServiceItem[]>([]);

// Optional: Helper function to calculate total price
export const cartTotal = writable<number>(0);
cartStore.subscribe((services) => {
  const total = services.reduce((sum, service) => sum + service.price, 0);
  cartTotal.set(total);
});

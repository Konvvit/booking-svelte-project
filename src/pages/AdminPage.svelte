<script lang="ts">
  import { onMount } from "svelte";
  import { fetchBookings } from "../utils/api";
  import type { Booking } from "../types/types";
  import BookingTable from "../components/BookingTable.svelte";

  import "../styles/admin.css";

  let bookings: Booking[] = [];
  let errorMessage: string = "";
  let isLoading: boolean = true;

  const loadBookings = async () => {
    try {
      ({ bookings } = await fetchBookings());
    } catch (error: any) {
      errorMessage = error.message || "An error occurred.";
    } finally {
      isLoading = false;
    }
  };

  onMount(loadBookings);
</script>

<h1>Admin Dashboard</h1>

{#if isLoading}
  <p class="loading">Loading bookings...</p>
{:else if errorMessage}
  <p class="error">{errorMessage}</p>
{:else if bookings.length === 0}
  <p class="no-data">No bookings available.</p>
{:else}
  <BookingTable {bookings} />
{/if}

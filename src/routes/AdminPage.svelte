<script lang="ts">
  import { onMount } from "svelte";

  // Define the Booking and Service interfaces to match the backend response structure
  interface Service {
    name: string;
    price: string;
  }

  interface Booking {
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    booking_date: string;
    booking_time: string;
    services: Service[];
  }

  let bookings: Booking[] = [];
  let errorMessage: string = "";
  let isLoading: boolean = true;

  // Fetch bookings from the backend
  const fetchBookings = async (): Promise<void> => {
    console.log("Fetching bookings...");
    try {
      const token: string | null = localStorage.getItem("token");
      if (!token) {
        console.log("No token found in localStorage");
        throw new Error("You are not authorized to view this page.");
      }

      console.log("Token found:", token);

      const response: Response = await fetch(
        "http://localhost:5001/api/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log("Response error message:", errorMessage);
        throw new Error(errorMessage || "Failed to fetch bookings.");
      }

      const data = await response.json();
      console.log("Before update:", bookings.length);
      bookings = data.bookings; // Ensure the array is replaced
      console.log("After update:", bookings.length);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      errorMessage = error.message || "An error occurred.";
    } finally {
      isLoading = false;
      console.log("Fetching complete. Loading:", isLoading);
    }
  };

  onMount(fetchBookings);
</script>

<h1>Admin Dashboard</h1>

{#if isLoading}
  <p class="loading">Loading bookings...</p>
{:else if errorMessage}
  <p class="error">{errorMessage}</p>
{:else if bookings.length === 0}
  <p class="no-data">No bookings available.</p>
{:else}
  <table class="bookings-table">
    <thead>
      <tr>
        <th>Customer Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Date</th>
        <th>Time</th>
        <th>Services</th>
      </tr>
    </thead>
    <tbody>
      {#each bookings as booking}
        <tr>
          <td>{booking.customer_name}</td>
          <td>{booking.customer_phone}</td>
          <td>{booking.customer_email}</td>
          <td>{booking.booking_date}</td>
          <td>{booking.booking_time}</td>
          <td>
            {#each booking.services as service}
              <p>{service.name} - ${service.price}</p>
            {/each}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
  }

  .error {
    color: red;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
  }

  .loading,
  .no-data {
    text-align: center;
    font-size: 18px;
    color: #3d3939;
    margin-top: 20px;
  }

  .bookings-table {
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    border-collapse: collapse;
    text-align: left;
    background-color: #575757; /* Set the entire table to light grey */
  }

  .bookings-table th,
  .bookings-table td {
    padding: 10px;
    border: 1px solid #000000; /* Light grey border */
  }

  .bookings-table th {
    background-color: #575757; /* Lighter grey for header */
    font-weight: bold;
  }

  .bookings-table tr:nth-child(even) {
    background-color: #575757; /* Consistent light grey for even rows */
  }

  .bookings-table td p {
    margin: 5px 0;
  }
</style>

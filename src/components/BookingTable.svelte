<script lang="ts">
  import type { Booking } from "../types/types";

  export let bookings: Booking[] = [];
</script>

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

<style>
  .bookings-table {
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    border-collapse: collapse;
    text-align: left;
    background-color: #575757;
  }
  .bookings-table th,
  .bookings-table td {
    padding: 10px;
    border: 1px solid #000000;
  }
  .bookings-table th {
    background-color: #575757;
    font-weight: bold;
  }
  .bookings-table tr:nth-child(even) {
    background-color: #575757;
  }
  .bookings-table td p {
    margin: 5px 0;
  }
</style>

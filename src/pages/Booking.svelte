<script lang="ts">
  import { cartStore } from "../stores/cart";
  import { navigate } from "svelte-routing";
  import { submitBooking } from "../utils/api";
  import type { Contact } from "../types/types";
  import ContactForm from "../components/ContactForm.svelte";
  import DateTimePicker from "../components/DateTimePicker.svelte";
  import "../styles/booking.css";

  let contact: Contact = { name: "", email: "", phone: "" };
  let date: string = "";
  let time: string = "";

  // Use $cartStore directly for selected services
  $: selectedServices = $cartStore;

  const handleSubmit = async () => {
    if (!date || !time || !contact.name || !contact.email || !contact.phone) {
      alert("Please fill out all fields, including date and time.");
      return;
    }

    const bookingData = {
      services: selectedServices.map((service) => service.id),
      booking_date: date,
      booking_time: time,
      customer_name: contact.name,
      customer_phone: contact.phone,
      customer_email: contact.email,
    };

    try {
      await submitBooking(bookingData);
      alert("Booking successfully submitted!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred while submitting the booking.");
    }
  };
</script>

<h1>Booking</h1>

<ContactForm bind:contact />
<DateTimePicker bind:date bind:time />

<h2>Selected Services</h2>
<ul>
  {#each $cartStore as service}
    <li>{service.name} - ${service.price}</li>
  {/each}
</ul>

<button on:click={handleSubmit}>Confirm Booking</button>

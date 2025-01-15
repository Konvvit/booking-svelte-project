<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { submitBooking } from "../utils/api";
  import type { ServiceItem, Contact } from "../types/types";
  import ContactForm from "../components/ContactForm.svelte";
  import DateTimePicker from "../components/DateTimePicker.svelte";
  import "../styles/booking.css";

  let selectedServices: ServiceItem[] = [];
  let contact: Contact = { name: "", email: "", phone: "" };
  let date: string = "";
  let time: string = "";

  onMount(() => {
    const state = history.state;
    if (state?.selectedServices) {
      selectedServices = state.selectedServices;
      console.log("Received Services:", selectedServices);
    } else {
      console.error(
        "No selected services received. Redirecting to Services page."
      );
      alert("Please select services first.");
      navigate("/services");
    }
  });

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

    await submitBooking(bookingData);
    navigate("/");
  };
</script>

<h1>Booking</h1>

<ContactForm bind:contact />
<DateTimePicker bind:date bind:time />

<h2>Selected Services</h2>
<ul>
  {#each selectedServices as service}
    <li>{service.name} - ${service.price}</li>
  {/each}
</ul>

<button on:click={handleSubmit}>Confirm Booking</button>

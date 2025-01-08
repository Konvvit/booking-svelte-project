<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  interface ServiceItem {
    id: number;
    name: string;
    price: number;
  }

  interface Contact {
    name: string;
    email: string;
    phone: string;
  }

  let selectedServices: ServiceItem[] = [];
  let contact: Contact = { name: "", email: "", phone: "" };
  let date: string = "";
  let time: string = "";

  // Fetch selected services passed via state
  onMount(() => {
    const state = history.state; // Access state from navigation
    if (state?.selectedServices) {
      selectedServices = state.selectedServices;
      console.log("Received Services:", selectedServices); // Debug log
    } else {
      console.error(
        "No selected services received. Redirecting to Services page."
      );
      alert("Please select services first.");
      navigate("/services"); // Redirect to Services page if no services are selected
    }
  });

  const submitBooking = async (): Promise<void> => {
    if (!date || !time || !contact.name || !contact.email || !contact.phone) {
      alert("Please fill out all fields, including date and time.");
      return;
    }

    // Prepare booking data
    const bookingData = {
      services: selectedServices.map((service) => service.id),
      booking_date: date,
      booking_time: time,
      customer_name: contact.name,
      customer_phone: contact.phone,
      customer_email: contact.email,
    };

    console.log("Submitting booking:", bookingData); // Debug log

    try {
      const response = await fetch("http://localhost:5001/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert("Booking successful!");
        navigate("/"); // Redirect to home or confirmation page after success
      } else {
        const errorMessage = await response.text();
        alert(`Error submitting booking: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred while submitting the booking.");
    }
  };
</script>

<h1>Booking</h1>

<!-- Contact Form -->
<h2>Contact Information</h2>
<div class="contact-form">
  <label for="name">Name</label>
  <input
    id="name"
    type="text"
    bind:value={contact.name}
    placeholder="Enter your name"
    required
  />

  <label for="email">Email</label>
  <input
    id="email"
    type="email"
    bind:value={contact.email}
    placeholder="Enter your email"
    required
  />

  <label for="phone">Phone</label>
  <input
    id="phone"
    type="tel"
    bind:value={contact.phone}
    placeholder="Enter your phone"
    required
  />
</div>

<!-- Date and Time Picker -->
<h2>Select Date & Time</h2>
<div class="datetime-picker">
  <label for="date">Date</label>
  <input id="date" type="date" bind:value={date} required />

  <label for="time">Time</label>
  <input id="time" type="time" bind:value={time} required />
</div>

<!-- Selected Services -->
<h2>Selected Services</h2>
<ul>
  {#each selectedServices as service}
    <li>{service.name} - ${service.price}</li>
  {/each}
</ul>

<button on:click={submitBooking}>Confirm Booking</button>

<style>
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  .contact-form,
  .datetime-picker {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .contact-form label,
  .datetime-picker label {
    font-weight: bold;
  }

  .contact-form input,
  .datetime-picker input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 5px 0;
  }
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import type { ServiceItem } from "../types/Types";
  import ServiceCard from "../components/ServiceCard.svelte";

  let services: ServiceItem[] = []; // Initialize with an empty array
  let selectedServices: ServiceItem[] = [];

  // Fetch services from the backend
  const fetchServices = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:5001/api/services"); // Adjust URL if needed
      if (!response.ok) throw new Error("Failed to fetch services");
      services = await response.json(); // Parse JSON response
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Add a service to the cart
  const addService = (service: ServiceItem): void => {
    if (!selectedServices.find((s) => s.id === service.id)) {
      selectedServices = [...selectedServices, service];
    }
  };

  // Proceed to the date and time selection page
  const proceedToDateTime = (): void => {
    console.log("Selected Services:", selectedServices); // Debug log
    navigate("/datetime", { state: { selectedServices } }); // Pass data to the next page
  };

  onMount(fetchServices); // Fetch services when the component mounts
</script>

<h1>Choose Services</h1>

<div class="content-container">
  <!-- Services List -->
  <div class="services-list">
    {#if services.length > 0}
      {#each services as service (service.id)}
        <ServiceCard {service} {addService} />
      {/each}
    {:else}
      <p>Loading services...</p>
    {/if}
  </div>

  <!-- Cart Summary -->
  <div class="cart">
    <h2>Cart</h2>
    <ul>
      {#each selectedServices as service (service.id)}
        <li>{service.name} - ${service.price}</li>
      {/each}
    </ul>
    <p>Total: ${selectedServices.reduce((total, s) => total + s.price, 0)}</p>
  </div>
</div>

<!-- Continue Button -->
<button class="continue-button" on:click={proceedToDateTime}>Continue</button>

<style>
  .content-container {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  .services-list {
    flex: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .cart {
    flex: 1;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
  }

  .cart ul {
    list-style: none;
    padding: 0;
  }

  .cart ul li {
    margin-bottom: 10px;
  }

  .continue-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .continue-button:hover {
    background-color: #0056b3;
  }
</style>

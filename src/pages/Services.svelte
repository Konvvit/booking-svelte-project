<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import type { ServiceItem } from "../types/types";
  import { fetchServices } from "../utils/api";
  import ServiceCard from "../components/ServiceCard.svelte";
  import "../styles/services.css";

  let services: ServiceItem[] = [];
  let selectedServices: ServiceItem[] = [];

  // Fetch services on component mount
  const loadServices = async () => {
    try {
      services = await fetchServices();
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
    console.log("Selected Services:", selectedServices);
    navigate("/datetime", { state: { selectedServices } });
  };

  onMount(loadServices);
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

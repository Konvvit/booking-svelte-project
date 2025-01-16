<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { cartStore } from "../stores/cart";
  import type { ServiceItem } from "../types/types";
  import { fetchServices } from "../utils/api";
  import ServiceCard from "../components/ServiceCard.svelte";
  import { fade } from "svelte/transition";
  import "../styles/services.css";

  let services: ServiceItem[] = [];

  // Fetch services on component mount
  const loadServices = async () => {
    try {
      services = await fetchServices();
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const proceedToDateTime = () => {
    navigate("/datetime");
  };

  onMount(loadServices);
</script>

<h1>Choose Services</h1>

<div class="services-list">
  {#if services.length > 0}
    {#each services as service (service.id)}
      <div in:fade={{ duration: 300 }}>
        <ServiceCard {service} />
      </div>
    {/each}
  {:else}
    <p>Loading services...</p>
  {/if}
</div>

<div class="cart">
  <h2>Cart</h2>
  <ul>
    {#each $cartStore as service (service.id)}
      <li in:fade={{ duration: 200 }}>
        {service.name} - ${service.price}
      </li>
    {/each}
  </ul>
  <p>
    Total: ${$cartStore.reduce((total, service) => total + service.price, 0)}
  </p>
</div>

<button class="continue-button" on:click={proceedToDateTime}>Continue</button>

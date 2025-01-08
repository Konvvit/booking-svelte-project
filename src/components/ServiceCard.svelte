<script lang="ts">
  import type { ServiceItem } from "../types/types";

  export let service: ServiceItem;
  export let addService: (service: ServiceItem) => void;
</script>

<div class="service-card">
  <h2>{service.name}</h2>
  <p>{service.description}</p>
  <p>Price: ${service.price}</p>
  <button on:click={() => addService(service)}>Add to Cart</button>
</div>

<style>
  .service-card {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 20px;
  }
</style>

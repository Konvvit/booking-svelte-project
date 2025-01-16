<script lang="ts">
  import { cartStore } from "../stores/cart";
  import type { ServiceItem } from "../types/types";

  export let service: ServiceItem;

  const addService = () => {
    cartStore.update((services) => {
      if (!services.find((s) => s.id === service.id)) {
        return [...services, service];
      }
      return services;
    });
  };
</script>

<div class="service-card">
  <h2>{service.name}</h2>
  <p>{service.description}</p>
  <p>Price: ${service.price}</p>
  <button on:click={addService}>Add to Cart</button>
</div>

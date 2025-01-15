<script lang="ts">
  import { navigate } from "svelte-routing";
  import "../styles/landing.css";
</script>

<div class="landing-page">
  <h1>Welcome to Our Booking System</h1>
  <div class="cards">
    <button class="card" on:click={() => navigate("/login")} type="button">
      <h2>Login</h2>
      <p>Access your account to manage bookings.</p>
    </button>
    <button class="card" on:click={() => navigate("/services")} type="button">
      <h2>Services</h2>
      <p>Explore and book our services.</p>
    </button>
  </div>
</div>

<script lang="ts">
  import { navigate } from "svelte-routing";
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

<style>
  .landing-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
  }

  .cards {
    display: flex;
    gap: 20px;
    margin-top: 30px;
  }

  .card {
    width: 200px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    background-color: #f9f9f9;
    transition:
      transform 0.2s ease,
      background-color 0.2s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    background-color: #f1f1f1;
  }

  .card h2 {
    margin: 0 0 10px;
    font-size: 1.5rem;
  }

  .card p {
    margin: 0;
    color: #666;
  }
</style>

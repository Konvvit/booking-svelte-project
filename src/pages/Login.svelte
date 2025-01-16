<script lang="ts">
  import { navigate } from "svelte-routing";
  import { login } from "../utils/api";

  let email: string = "";
  let password: string = "";

  const handleLogin = async (): Promise<void> => {
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      alert("Login successful!");
      navigate("/admin");
    } catch (error: any) {
      alert(error.message || "An error occurred. Please try again.");
    }
  };
</script>

<h1>Login</h1>
<div class="login-form">
  <input type="email" bind:value={email} placeholder="Email" required />
  <input
    type="password"
    bind:value={password}
    placeholder="Password"
    required
  />
  <button on:click={handleLogin}>Login</button>
</div>

<style>
  @import "../styles/login.css"; /* Import the external CSS file */
</style>

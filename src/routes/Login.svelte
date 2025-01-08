<script lang="ts">
  import { navigate } from "svelte-routing";

  let email: string = "";
  let password: string = "";

  const handleLogin = async (): Promise<void> => {
    const loginData = { email, password };
    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful!");
        localStorage.setItem("token", data.token); // Store JWT token for authentication
        navigate("/admin"); // Navigate to the admin page
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
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
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    margin: 50px auto;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>

<script lang="ts">
  export let contact: { name: string; email: string; phone: string };
</script>

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

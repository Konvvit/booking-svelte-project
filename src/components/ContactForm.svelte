<script lang="ts">
  // Define the type for the contact object
  interface Contact {
    name: string;
    email: string;
    phone: string;
  }

  // Props for contact and the updateContact callback
  export let contact: Contact;
  export let updateContact: (contact: Contact) => void;
</script>

<div class="contact-form">
  <input type="text" bind:value={contact.name} placeholder="Name" />
  <input type="email" bind:value={contact.email} placeholder="Email" />
  <input type="tel" bind:value={contact.phone} placeholder="Phone" />
  <button on:click={() => updateContact(contact)}>Save</button>
</div>

<style>
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>

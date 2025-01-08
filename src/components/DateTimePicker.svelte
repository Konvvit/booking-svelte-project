<script lang="ts">
  // Bind values from the parent
  export let date: string = "";
  export let time: string = "";
</script>

<div class="datetime-picker">
  <h1>Select Date & Time</h1>

  <label for="date">Date</label>
  <input id="date" type="date" bind:value={date} required />

  <label for="time">Time</label>
  <input id="time" type="time" bind:value={time} required />
</div>

<style>
  .datetime-picker {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    margin: 0 auto;
  }

  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
</style>

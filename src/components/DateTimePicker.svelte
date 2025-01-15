<script lang="ts">
  export let date: string;
  export let time: string;
</script>

<h2>Select Date & Time</h2>
<div class="datetime-picker">
  <label for="date">Date</label>
  <input id="date" type="date" bind:value={date} required />

  <label for="time">Time</label>
  <input id="time" type="time" bind:value={time} required />
</div>

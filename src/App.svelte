<script>
  import { Router, Route } from "svelte-routing";
  import LandingPage from "./routes/LandingPage.svelte";
  import LoginPage from "./routes/Login.svelte";
  import Services from "./routes/Services.svelte";
  import DateTime from "./routes/Booking.svelte";
  import AdminPage from "./routes/AdminPage.svelte";
</script>

<Router>
  <Route path="/" component={LandingPage} />
  <Route path="/login" component={LoginPage} />
  <Route path="/services" component={Services} />
  <Route path="/datetime" component={DateTime} />
  <Route path="/admin" component={AdminPage} />
  <!-- Add the route for DateTime -->
</Router>

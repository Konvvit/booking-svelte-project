<script>
  import { Router, Route } from "svelte-routing";
  import LandingPage from "./pages/LandingPage.svelte";
  import LoginPage from "./pages/Login.svelte";
  import Services from "./pages/Services.svelte";
  import DateTime from "./pages/Booking.svelte";
  import AdminPage from "./pages/AdminPage.svelte";
</script>

<Router>
  <Route path="/" component={LandingPage} />
  <Route path="/login" component={LoginPage} />
  <Route path="/services" component={Services} />
  <Route path="/datetime" component={DateTime} />
  <Route path="/admin" component={AdminPage} />
  <!-- Add the route for DateTime -->
</Router>

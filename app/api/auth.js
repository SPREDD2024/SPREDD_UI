import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  // Auth0 configuration options
  secret: "128b2dbee1e9d06e9d8349da7e7e228e133c1d683177c2def55fa8a5dfcf0c3d",
  issuerBaseURL: "https://dev-dot2wxh66wa3ag7r.us.auth0.com",
  baseURL: "http://localhost:3000",
  clientID: "uqiicGbt5oIpQzNYluy9ICzIq1svqYhT",
  clientSecret:
    "pQ6fgd9orz_qa97_HcOSgGyhEs7kKYRzpx2TdVhYPYxgUH-GK_JAcszS-1EDHTYP",
  routes: {
    // Define the login route
    login: "/api/auth/login",
  },
});

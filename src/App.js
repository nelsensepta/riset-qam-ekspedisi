import "./App.css";
import Todo from "./components";
import { useState } from "react";
// import Button from "@mui/material/Button";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LoginButton from "./components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";

function App() {
  // const authLink = setContext((_, { headers }) => {
  //   // get the authentication token from local cookie if it exists
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ? `Bearer ${token}` : "",
  //     },
  //   };
  // });
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });
  const [token, setToken] = useState("");
  const { isLoading, error, getIdTokenClaims } = useAuth0();
  getIdTokenClaims().then((res) => {
    // console.log(res);
    if (res) {
      setToken(res.__raw);
    }
  });
  console.log(token);
  return (
    <ApolloProvider client={client}>
      <main>
        <h1>Auth0 Login</h1>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
            <LoginButton />
            <LogoutButton />
            <Profile />
          </>
        )}
      </main>
    </ApolloProvider>
  );
}

export default App;

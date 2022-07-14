import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
// import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import CekOngkir from "./pages/CekOngkir";
import CekResi from "./pages/CekResi";

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
  // const client = new ApolloClient({
  //   uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  //   cache: new InMemoryCache(),
  // });
  // const [token, setToken] = useState("");
  // const { isLoading, error, getIdTokenClaims, user } = useAuth0();
  // useEffect(() => {}, []);
  // getIdTokenClaims().then((res) => {
  //   // console.log(res);
  //   if (res) {
  //     setToken(res.__raw);
  //   }
  // });
  // console.log(token);

  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="home">
        <Route index element={<ProtectedRoute component={Home} />} />
        <Route
          path="cek-ongkir"
          element={<ProtectedRoute component={CekOngkir} />}
        />
        <Route
          path="cek-resi"
          element={<ProtectedRoute component={CekResi} />}
        />
      </Route>
    </Routes>
  );
}

export default App;

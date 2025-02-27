import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const client = new ApolloClient({
  uri: "https://travel-booking-system-backend.vercel.app/graphql", // ✅ Correct backend URL
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

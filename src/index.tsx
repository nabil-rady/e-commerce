import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient.ts";
import ApolloClientContext from "./ApolloClientContext.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ApolloClientContext.Provider value={client}>
        <App />
      </ApolloClientContext.Provider>
    </ApolloProvider>
  </React.StrictMode>
);

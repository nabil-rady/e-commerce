import React from "react";
import { ApolloClient } from "@apollo/client";

const ApolloClientContext = React.createContext<ApolloClient<object> | null>(
  null
);

export const ApolloClientProvider: React.FC<{
  client: ApolloClient<object>;
  children: React.ReactNode;
}> = ({ client, children }) => (
  <ApolloClientContext.Provider value={client}>
    {children}
  </ApolloClientContext.Provider>
);

export default ApolloClientContext;

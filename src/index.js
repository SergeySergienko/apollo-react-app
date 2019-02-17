import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import App from "./App";

const defaultState = {
  isEditMode: false
};

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage
}).then(() => {
  const client = new ApolloClient({
    cache,
    uri: "https://api-euwest.graphcms.com/v1/cjrxo7f6o22ld01gtcjp4w85x/master",
    clientState: {
      defaults: defaultState,
      resolvers: {}
    }
  });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById("root")
  );
});

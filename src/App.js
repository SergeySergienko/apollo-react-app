import React, { Component, Fragment } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Post from "./Posts/Post";
import Posts from "./Posts/Posts";

const client = new ApolloClient({
  uri: "https://api-euwest.graphcms.com/v1/cjrxo7f6o22ld01gtcjp4w85x/master"
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Post from "./Posts/Post";
import NewPost from "./Posts/NewPost";
import Posts from "./Posts/Posts";
import gql from "graphql-tag";

// ------------------------------
// const POSTS_QUERY = gql`
//   query allPosts {
//     posts {
//       id
//       title
//       body
//     }
//   }
// `;
// const STATE_QUERY = gql`
//   {
//     isEditMode @client
//   }
// `;
// client.writeData({ data: { isEditMode: "hello" } });
// client
//   .query({
//     query: STATE_QUERY
//   })
//   .then(res => console.log(res));
// ------------------------------

export default class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/post/new">New Post</Link>
          </div>
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route exact path="/post/new" component={NewPost} />
            <Route path="/post/:id" component={Post} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

export default class Posts extends Component {
  render() {
    return (
      <ul>
        <Query query={POSTS_QUERY}>
          {({ loading, data }) => {
            return loading ? (
              <h2>Loading...</h2>
            ) : (
              data.posts.map(({ id, title }) => (
                <li key={id}>
                  <Link to={`/post/${id}`}>
                    <h4>{title}</h4>
                  </Link>
                </li>
              ))
            );
          }}
        </Query>
      </ul>
    );
  }
}

const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;

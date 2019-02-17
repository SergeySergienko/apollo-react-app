import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

export default class Posts extends Component {
  render() {
    return (
      <ol>
        <Query query={POSTS_QUERY}>
          {({ loading, data, fetchMore }) => {
            return loading ? (
              <h2>Loading...</h2>
            ) : (
              <Fragment>
                {data.posts.map(({ id, title }) => (
                  <li key={id}>
                    <Link to={`/post/${id}`}>
                      <h4>{title}</h4>
                    </Link>
                  </li>
                ))}
                <button
                  onClick={() =>
                    fetchMore({
                      variables: {
                        skip: data.posts.length
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        return Object.assign({}, prev, {
                          posts: [...prev.posts, ...fetchMoreResult.posts]
                        });
                      }
                    })
                  }
                >
                  Load More
                </button>
              </Fragment>
            );
          }}
        </Query>
      </ol>
    );
  }
}

const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
    posts(orderBy: createdAt_DESC, first: 2, skip: $skip) {
      id
      title
      body
    }
  }
`;

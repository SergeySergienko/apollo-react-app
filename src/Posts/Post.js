import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import UpdatePost from "./UpdatePost";

export default class Post extends Component {
  render() {
    return (
      <Query query={POST_QUERY} variables={{ id: this.props.match.params.id }}>
        {({ loading, data }) => {
          return loading ? (
            <h2>Loading...</h2>
          ) : (
            <Fragment>
              <section>
                <h2>{data.post.title}</h2>
                <h4>{data.post.body}</h4>
                <span>
                  {new Date(data.post.createdAt).toLocaleTimeString()}
                </span>
              </section>
              <section>
                <h2>Edit Post</h2>
                <UpdatePost post={data.post} />
              </section>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
      createdAt
    }
  }
`;

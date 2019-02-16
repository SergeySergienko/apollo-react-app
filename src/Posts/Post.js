import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import UpdatePost from "./UpdatePost";
import EditMode from "./EditMode";

export default class Post extends Component {
  render() {
    return (
      <Query query={POST_QUERY} variables={{ id: this.props.match.params.id }}>
        {({ loading, data }) => {
          const { post, isEditMode } = data;
          return loading ? (
            <h2>Loading...</h2>
          ) : (
            <Fragment>
              <EditMode isEditMode={isEditMode} />
              {isEditMode ? (
                <section>
                  <h2>Edit Post</h2>
                  <UpdatePost post={post} />
                </section>
              ) : (
                <section>
                  <h2>{post.title}</h2>
                  <h4>{post.body}</h4>
                  <span>{new Date(post.createdAt).toLocaleTimeString()}</span>
                </section>
              )}
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
    isEditMode @client
  }
`;

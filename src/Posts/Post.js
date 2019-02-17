import React, { Component, Fragment } from "react";
import { Query, Mutation } from "react-apollo";
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
                  <Mutation
                    mutation={UPDATE_POST}
                    variables={{
                      id: post.id,
                      check: !post.check
                    }}
                    optimisticResponse={{
                      __typename: "Mutation",
                      updatePost: {
                        __typename: "Post",
                        check: !post.check
                      }
                    }}
                    update={(cache, { data: { updatePost } }) => {
                      const data = cache.readQuery({
                        query: POST_QUERY,
                        variables: {
                          id: post.id
                        }
                      });
                      data.post.check = updatePost.check;
                      cache.writeQuery({
                        query: POST_QUERY,
                        data: {
                          ...data,
                          post: data.post
                        }
                      });
                    }}
                  >
                    {updatePost => (
                      <input
                        type="checkbox"
                        checked={post.check}
                        onChange={updatePost}
                        style={{ height: "50px", width: "50px" }}
                      />
                    )}
                  </Mutation>
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
      check
    }
    isEditMode @client
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($check: Boolean, $id: ID!) {
    updatePost(where: { id: $id }, data: { check: $check }) {
      check
    }
  }
`;

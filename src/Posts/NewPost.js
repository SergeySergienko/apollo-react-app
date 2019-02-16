import React, { Component, Fragment } from "react";
import PostForm from "./PostForm";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const render1 = () => (
  <Fragment>
    <h2>New Post</h2>
    <Mutation mutation={NEW_POST}>
      {createPost => <PostForm onSubmit={createPost} />}
    </Mutation>
  </Fragment>
);
export default class NewPost extends Component {
  render = render1;
}

const NEW_POST = gql`
  mutation addPost($title: String!, $body: String!) {
    createPost(data: { status: PUBLISHED, title: $title, body: $body }) {
      title
      body
      id
    }
  }
`;

import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import PostForm from "./PostForm";

export default class NewPost extends Component {
  state = { title: "", body: "" };
  handleInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ ...formData });
  };

  reset = () => this.setState({ title: "", body: "" });

  render() {
    const { title, body } = this.state;
    return (
      <Fragment>
        <h2>New Post</h2>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
          {createPost => (
            <form
              onSubmit={e => {
                e.preventDefault();
                createPost()
                  .then(this.reset)
                  .catch(err => console.log(err));
              }}
            >
              <input
                type="text"
                onChange={this.handleInput}
                name="title"
                value={title}
                placeholder="Title"
              />
              <textarea
                type="text"
                onChange={this.handleInput}
                name="body"
                value={body}
                placeholder="Body"
              />
              <button>Submit</button>
            </form>
          )}
        </Mutation>
        {/* <PostForm /> */}
      </Fragment>
    );
  }
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

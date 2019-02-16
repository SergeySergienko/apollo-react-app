import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    post: PropTypes.object
  };
  static defaultProps = {
    post: {},
    onSuccess: () => null
  };
  state = {
    title: this.props.post.title || "",
    body: this.props.post.body || "",
    id: this.props.post.id || ""
  };

  handleInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ ...formData });
  };

  reset = () => {
    this.props.onSuccess();
  };

  render() {
    const { title, body, id } = this.state;
    const { onSubmit } = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit({ variables: { title, body, id } })
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
    );
  }
}

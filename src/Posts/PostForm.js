import React, { Component } from "react";

export default class PostForm extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Title" />
        <textarea type="text" placeholder="Body" />
        <button>Submit</button>
      </form>
    );
  }
}

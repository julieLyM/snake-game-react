import React, { Component } from "react";

export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    this.ageInput = null;
  }

  componentDidMount() {
    this.textInput.focus();
  }

  setTextInput = textInput => (this.textInput = textInput);

  handleChange() {
    this.ageInput.focus();
  }

  render() {
    return (
      <div>
        <form>
          Nom
          <input type="text" />
          Prenom
          <input type="text" ref={this.setTextInput} />
          Sexe{" "}
          <select onChange={this.handleChange.bind(this)}>
            <option>H</option>
            <option>F</option>
          </select>
          Age <input ref={el => (this.ageInput = el)} />
        </form>
      </div>
    );
  }
}

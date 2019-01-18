import React from "react";

export default class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      color: "red"
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const { name, color } = this.state;

    if (name !== "") {
      this.props.onAdd(name, color);
      this.setState({
        name: "",
        color: "red"
      });
    }
  }

  onNameChange(e) {
    console.log("name change", e);
    this.setState({ name: e.target.value });
  }

  onColorChange(e) {
    console.log("color change", e);
    this.setState({ color: e.target.getAttribute("data-color") });
  }

  render() {
    const { colorList } = this.props;
    const { color } = this.state;
    const radios = colorList.map((c, index) => {
      c.checked = color === c.name ? true : false;
      const checkedClass = c.checked ? "checked" : "";
      return (
        <input
          type="radio"
          onChange={e => this.onColorChange(e)}
          className={`colorSelector__inputRadio ${c.name} ${checkedClass}`}
          name="selectedColor"
          data-color={c.name}
          key={c.id}
        />
      );
    });

    return (
      <form onSubmit={(e)=>this.onSubmit(e)}>
        <input
          className="form__inputText--lg form__inputText--addItem"
          type="text"
          name="name"
          value={this.state.name}
          onChange={e => this.onNameChange(e)}
          placeholder="Add New Item"
        />
        <div className="colorSelector">{radios}</div>
        <input
          className="form__inputSubmit--inside"
          type="submit"
          value="Add"
        />
      </form>
    );
  }
}

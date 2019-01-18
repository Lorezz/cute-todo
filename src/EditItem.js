import React from "react";

export default class EditItemForm extends React.Component {
  constructor(props) {
    super(props);
    const { val, color } = this.props;
    this.state = {
      newName: val,
      newColor: color
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editMode === false) {
      const { val, color } = nextProps;
      this.setState({
        newName: val,
        newColor: color
      });
    }
  }
  onValueChange(e) {
    const newName = e.target.value;
    this.setState({ newName });
  }
  onColorChange(e) {
    const newColor = e.target.getAttribute("data-color");
    this.setState({ newColor });
  }
  onSubmit(e) {
    e.preventDefault();

    const { newName, newColor } = this.state;
    const name = newName;
    const color = newColor;
    const { id } = this.props;

    if (name !== "") {
      this.props.notifyEdits(name, color, id);
    }
  }

  render() {
    const editClass = this.props.editMode ? "is--show" : "";
    const { colorList } = this.props;
    const { newName, newColor } = this.state;
    return (
      <form
        className={`list__form ${editClass}`}
        onSubmit={e => this.onSubmit(e)}
      >
        <input
          className="form__inputText--lg form__inputText--addItem"
          type="text"
          ref="editInput"
          onChange={e => this.onValueChange(e)}
          value={newName}
        />
        <div className="colorSelector">
          {colorList.map((color, index) => {
            const checkedClass = color.name === newColor ? "checked" : "";
            return (
              <input
                type="radio"
                onChange={e => this.onColorChange(e)}
                className={`colorSelector__inputRadio ${
                  color.name
                } ${checkedClass}`}
                name="selectedColor"
                data-color={color.name}
                key={color.id}
              />
            );
          })}
        </div>
        <input
          className="form__inputSubmit--inside"
          type="submit"
          value="Save"
        />
      </form>
    );
  }
}

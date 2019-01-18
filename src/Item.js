import React from "react";
import EditItemForm from "./EditItem";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      checked: false,
      editSwitch: false
    };
  }

  handleClick() {
    let clicked = this.state.clicked ? false : true;
    this.setState({ clicked });
  }

  handleChange(e) {
    const { id } = this.props;
    let checked = e.target.checked;
    this.props.onCheckedCheck(checked, id);
    this.setState({ checked });
  }

  onEditSwitch() {
    let editSwitch = true;
    const { id } = this.props;
    this.setState({ editSwitch });
    this.props.editFlag(editSwitch, id);
  }

  render() {
    const colorClass = this.props.color ? this.props.color : "";
    const checkedClass = this.state.checked ? "disabled" : "";
    const { edit, name, color, editColorList, onEdit, id } = this.props;

    return (
      <li className={`list__item ${colorClass} ${checkedClass}`} data-id={id}>
        <div className="list__checkbox">
          <input type="checkbox" onChange={e => this.handleChange(e)} />
        </div>

        <div className="list__name">
          <p className="list__text" onClick={e => this.onEditSwitch(e)}>
            {name}
          </p>
          <EditItemForm
            editMode={edit}
            val={name}
            color={color}
            colorList={editColorList}
            notifyEdits={onEdit}
            id={id}
          />
        </div>
      </li>
    );
  }
}

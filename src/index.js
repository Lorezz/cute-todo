import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import Header from "./Header";
import Item from "./Item";
import AddItemForm from "./AddItem";
import { ITEMS, COLORS } from "./constants.js";

import uuid4 from "uuid4";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: ITEMS,
      colors: COLORS,
      itemId: 0
    };
  }

  componentDidMount() {
    window.addEventListener("click", e => this.clickOutside(e));
  }

  onItemAdd(name, color) {
    let { items, itemId } = this.state;
    console.log("onItemAdd", name, color);
    itemId = uuid4();
    items = [
      ...items,
      {
        name,
        color,
        checked: false,
        edit: false,
        id: "" + itemId
      }
    ];
    console.log("ID", itemId);
    this.setState({ items, itemId });
  }

  onItemEdit(name, color, id) {
    console.log("EDIT item ID", name, color, id);
    let { items } = this.state;
    const index = items.findIndex(i => i.id === id);
    items[index] = { ...items[index], name, color, edit: false };
    this.setState({ items });
  }

  onItemDelete(index) {
    let { items } = this.state;
    items.splice(index, 1);
    this.setState({ items });
  }

  onCheckedChecker(checked, id) {
    let { items } = this.state;
    const index = items.findIndex(i => i.id === id);
    items[index].edit = false;
    items[index].checked = checked;

    const checkedNum = items.reduce((count, obj) => {
      if (obj.checked === true) {
        count = count + 1;
      }
      return count;
    }, 0);
    const countChecked = checkedNum < 0 ? false : true;
    this.setState({ items, countChecked, checkedNum });
  }

  onMultiDelete() {
    let { items } = this.state;
    items = items.filter(i => i.checked !== true);
    this.setState({
      items,
      countChecked: false,
      checkedNum: 1
    });
  }

  onEditCheck(flag, id) {
    console.log("EDIT");
    let { items } = this.state;
    const index = items.findIndex(i => i.id === id);

    items[index].edit = flag;

    const counter = items.reduce((count, obj) => {
      if (obj.edit === true) {
        count += 1;
      }
      return count;
    }, 0);

    if (counter > 1) {
      items.forEach((obj, index) => {
        obj.edit = false;
      });
      items[index].edit = true;
    }

    this.setState({items});
  }

  clickOutside(e) {
    console.log("click outside");
    let { items } = this.state;
    if (!document.querySelector("[data-area]").contains(e.target)) {
      items = items.map(i => {
        i.edit = false;
        return i;
      });
      this.setState({ items });
    }
  }

  render() {
    const { checkedNum, countChecked, items, colors } = this.state;
    return (
      <div className="container">
        <Header
          checkedItemsFlag={countChecked}
          number={checkedNum}
          handleDeleteItems={this.onMultiDelete.bind(this)}
        />
        <ul className="list" data-area>
          {items.map((item, index) => {
            return (
              <Item
                name={item.name}
                color={item.color}
                checked={item.checked}
                edit={item.edit}
                key={item.id}
                id={item.id}
                onPassDelete={() => this.onItemDelete(index)}
                onCheckedCheck={this.onCheckedChecker.bind(this)}
                editFlag={this.onEditCheck.bind(this)}
                editColorList={colors}
                onEdit={this.onItemEdit.bind(this)}
              />
            );
          })}
        </ul>
        <AddItemForm onAdd={this.onItemAdd.bind(this)} colorList={colors} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

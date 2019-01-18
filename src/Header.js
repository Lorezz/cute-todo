import React from "react";

export default class Header extends React.Component {
  handleClick(e) {
    e.preventDefault();
    this.props.handleDeleteItems();
  }

  render() {
    const { number, checkedItemsFlag } = this.props;
    const showLinkClass = checkedItemsFlag ? "is--visible" : "is--hidden";
    return (
      <header>
        <h1 className="clearfix">
          {"React Todo List 🐶"}
          <button
            className={`float--right text--xs spacer--top--xs text--reg  form__inputSubmit ${showLinkClass}`}
            onClick={e => this.handleClick(e)}
          >
            Clear Completed Items ({number})
          </button>
        </h1>
      </header>
    );
  }
}

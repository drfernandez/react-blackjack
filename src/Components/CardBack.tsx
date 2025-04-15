import React, { JSX } from "react";

export default class CardBack extends React.Component {
  render(): JSX.Element {
    return (
      <div className="drop-shadow-lg drop-shadow-black w-16 h-24 bg-stone-50 border shadow-xl rounded-lg flex flex-col bg-[url(/assets/cardback-blue.png)] bg-cover bg-center">
      </div>
    );
  }
}

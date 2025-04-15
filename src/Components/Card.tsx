import React, { JSX } from "react";

/**
 * interface for storing Card props
 * @member face the value of the card ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
 * @member suit the suit of the card ["♠", "♣", "♥", "♦"]
 * @member children used in case this class prop provides children JSX
 */
interface CardProps {
  face: string;
  suit: string;
  [key: string]: any;
}

export default class Card extends React.Component<CardProps> {
  public face= "";
  public suit= "";
  constructor(props: CardProps) {
    super(props);
      this.face = props.face;
      this.suit = props.suit;
  }


  render(): JSX.Element {
    const c: string =
      this.suit == "♦" || this.suit == "♥"
        ? "flex justify-center text-4xl text-red-800"
        : "flex justify-center text-4xl text-black-800";

    return (
      <div className="drop-shadow-lg drop-shadow-black w-16 h-24 bg-stone-50 border shadow-xl rounded-lg flex flex-col">
        <p className="flex justify-start text-md text-slate-800 ml-1">
          {this.face}
        </p>
        <h1 className={c}>{this.suit}</h1>
      </div>
    );
  }
}

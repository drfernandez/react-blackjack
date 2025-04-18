import React, { JSX } from "react";
import Hand from "./Hand";
import Card from "./Card";

interface PlayerProps {
  hand: Hand;
}

interface PlayerState {
  hand: Hand;
}

export default class Player extends React.Component<PlayerProps, PlayerState> {
  constructor(props: PlayerProps) {
    super(props);
    this.hand = props.hand;
  }

  hand = new Hand({});

  hit(c: Card): void {
    this.hand.list.push(c);
    this.hand.calculateValue();
  }

  render(): JSX.Element {
    return <>{this.hand.render()}</>;
  }
}

import React, { JSX } from "react";
import Card from "./Card";
import CardBack from "./CardBack";

export const suitSymbols: string[] = ["♠", "♣", "♥", "♦"];
export const faceSymbols: string[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

interface DeckProps {
  visible?: boolean;
}

export default class Deck extends React.Component<DeckProps> {
  constructor(props: DeckProps) {
    super(props);
    (this.list = [] as Card[]), this.resetDeck();
  }

  public list = [] as Card[];

  private initializeList() {
    this.list = [];
    for (let s in suitSymbols) {
      for (let f in faceSymbols) {
        this.list.push(
          new Card({ suit: suitSymbols[s], face: faceSymbols[f] })
        );
      }
    }
  }

  private shuffle(): void {
    for (let i = 0; i < this.list.length; ++i) {
      let ind1: number = Math.floor(Math.random() * this.list.length);
      let ind2: number = Math.floor(Math.random() * this.list.length);
      [this.list[ind1], this.list[ind2]] = [this.list[ind2], this.list[ind1]];
    }
  }

  resetDeck(): void {
    this.initializeList();
    this.shuffle();
  }

  drawCard(): Card | undefined {
    let isListEmpty: boolean = this.list.length == 0;
    if (isListEmpty) {
      this.resetDeck();
    }
    const card: Card | undefined = this.list.pop();
    return card;
  }

  render(): JSX.Element {
    return (
      <div className="flex flex-wrap flex-row">
        {
          this.props.visible ?
          this.list.map((c: Card, i: number) => {
            return <Card key={i} suit={c.suit} face={c.face} />;
          }) :
          <CardBack />
        }
      </div>
    );
  }
}

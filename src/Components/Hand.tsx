import React, { JSX } from "react";
import Card from "./Card";
import CardBack from "./CardBack";

interface HandProps {
  isDealer?: boolean;
}

export default class Hand extends React.Component<HandProps> {
  constructor(props: HandProps) {
    super(props);
    this.value = 0;
    this.list = [] as Card[];
    this.isDealer = props.isDealer as boolean;
  }

  public value = 0;
  public list = [] as Card[];
  public isDealer = false;

  handSize(): number {
    return this.list.length;
  }

  addCard(card: Card | undefined): void {
    if (card != undefined) {
      const newList = this.list;
      newList.push(card);
    }
  }

  clearHand(): void {
    this.list = [] as Card[];
    this.value = 0;
  }

  calculateValue(): number {
    if (this.list == undefined || this.list.length == 0) {
      return 0;
    }
    
    this.value = 0;
    let aceCount: number = 0;
    for (let i = 0; i < this.list.length; ++i) {
      const card = this.list[i];
      switch (card.face) {
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "10":
          this.value += Number(card.face);
          break;
        case "J":
        case "Q":
        case "K":
          this.value += 10;
          break;
        case "A":
          aceCount++;
          this.value += 11;
          break;
        default:
          break;
      }

      if(i == 0 && this.isDealer) {
        return this.value;
      }
    }

    for (let i = 0; i < aceCount; ++i) {
      if (this.value > 21) {
        aceCount--;
        this.value -= 10;
      }
    }

    return this.value;
  }

  validateHand(): string {
    const hasBust: boolean = this.isBust();
    const hasBlackjack: boolean = this.isBlackjack();

    let result: string = "";
    if (hasBlackjack) {
      result = "Blackjack";
    } else if (hasBust) {
      result = "Bust";
    } else {
      result = this.calculateValue().toString();
    }
    return result;
  }

  isBlackjack(): boolean {
    return this.value == 21 && this.list.length == 2;
  }

  isBust(): boolean {
    return this.value > 21;
  }

  isDealerHand(): boolean {
    return this.isDealer;
  }

  render(): JSX.Element {
    return (
      <div className="flex flex-wrap flex-row">
        {this.list.map((c: Card, index: number) => {
          if(this.isDealer && index > 0) {
            return <CardBack key={index}/>
          }
          return <Card key={index} face={c.face} suit={c.suit} />;
        })}
      </div>
    );
  }
}

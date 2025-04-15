import Button from "./Button";
import Message from "./Message";
import React from "react";

interface BettingInterfaceProps {
  wallet?: number;
  isBetting?: boolean;
}

interface BettingInterfaceState {
  wallet: number;
  betAmount: number;
}

export default class BettingInterface extends React.Component<
  BettingInterfaceProps,
  BettingInterfaceState
> {
  constructor(props: BettingInterfaceProps) {
    super(props);
    this.wallet = props.wallet as number;
    this.betAmount = 0;
  }

  public wallet = 0;
  public betAmount = 0;

  handleOnBet = (currBetAmount: number): void => {
    const prevWalletAmount: number = this.wallet;
    const prevBetAmount: number = this.betAmount;
    if (prevBetAmount + currBetAmount > prevWalletAmount) {
      return;
    }
    this.betAmount = prevBetAmount + currBetAmount;
    this.forceUpdate();
  };

  handleOnResetBet = (): void => {
    this.betAmount = 0;
    this.forceUpdate();
  };

  handleGameResult = (winner: string): void => {
    switch (winner) {
      case "Player":
        this.wallet += this.betAmount * 2;
        break;
      case "Tie":
        this.wallet += this.betAmount * 1;
        break;
      default:
        break;
    }

    this.betAmount = 0;
    this.forceUpdate();
  };

  handleRemoveFromWallet = (): void => {
    if (this.betAmount <= this.wallet) {
      this.wallet -= this.betAmount;
    }
  };

  render() {
    return (
      <div className="h-50">
        <Message>Bet Amount: {this.betAmount}</Message>
        <Message>Wallet Amount: {this.wallet}</Message>
        <div className="pt-5 pb-5 mb-5" hidden={this.props.isBetting}>
          <Button onClick={() => this.handleOnBet(5)} children="Add $5" />
          <Button onClick={() => this.handleOnBet(10)} children="Add $10" />
          <Button onClick={() => this.handleOnResetBet()} children="Reset" />
        </div>
      </div>
    );
  }
}

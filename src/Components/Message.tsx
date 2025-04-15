interface MessageProps {
    onClick?: any;
    children?: any;
  }
  
  export default function Message(props: MessageProps) {return (
      <h1 className="text-center text-3xl text-white drop-shadow-lg text-shadow-lg text-shadow-black"
        onClick={props.onClick}>
        {props.children}
      </h1>
    );
  }
  
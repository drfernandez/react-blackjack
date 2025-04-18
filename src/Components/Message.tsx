interface MessageProps {
  children?: any;
}

export default function Message(props: MessageProps) {
  return (
    <h1 className="text-center text-3xl text-white drop-shadow-lg text-shadow-lg text-shadow-black">
      {props.children}
    </h1>
  );
}

interface ButtonProps {
  onClick?: any;
  children?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      className="
        border-4 
        border-yellow-500 
        rounded-3xl 
        drop-shadow-lg 
        drop-shadow-black 
        py-2.5 
        px-5 
        me-2 
        mb-2 
        text-sm 
        font-medium 
        text-gray-900 
        focus:outline-none 
        hover:bg-gray-100 
        hover:text-blue-700 
        focus:z-10 
        focus:ring-4 
        focus:ring-gray-100 
        dark:focus:ring-gray-700 
        dark:bg-gray-800 
        dark:text-gray-400 
        dark:border-gray-600 
        dark:hover:text-white 
        dark:hover:bg-gray-700"
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}

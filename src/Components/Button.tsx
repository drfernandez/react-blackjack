interface ButtonProps {
  // color: string;
  onClick?: any;
  children?: any;
}

export default function Button(props: ButtonProps) {
  // const bgColorVariants = {
  //   blue: `bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`,
  //   red: `bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`,
  //   green: `bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`,
  // };

  // let formatString: string = 
      // `text-white
      // ${bgColorVariants[props.color as keyof typeof bgColorVariants]}
      // focus:ring-4
      // font-medium
      // rounded-lg
      // text-sm
      // px-5
      // py-2.5
      // me-2
      // mb-2focus:outline-none`;

  let formatString = 'border-4 border-yellow-500 rounded-3xl drop-shadow-lg drop-shadow-black py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700';
  return (
    <button type="button" className={formatString} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

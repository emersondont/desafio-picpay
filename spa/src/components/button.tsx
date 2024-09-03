
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  
  return (
    <button
      className="w-full bg-primary text-white text-lg font-bold p-2 rounded-md hover:bg-primaryHover duration-200 ease-out"
      {...props}
    >
      {props.children}
    </button>
  )
}
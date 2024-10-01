
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

export default function Button(props: ButtonProps) {

  return (
    <button
      disabled={props.loading}
      className="w-full bg-primary text-white text-lg font-bold p-2 rounded-md hover:bg-primaryHover duration-200 ease-out flex gap-2 justify-center items-center disabled:hover:bg-primary disabled:opacity-50"
      {...props}
    >
      <span>{props.children}</span>
      {props.loading && <div className="animate-spin h-4 w-4 rounded-full border-2 border-white border-t-transparent" />}
    </button>
  )
}
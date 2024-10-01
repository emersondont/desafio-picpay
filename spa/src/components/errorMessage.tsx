

type ErrorMessageProps = {
  children: React.ReactNode;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  return (
    <p className="border border-strokeDanger bg-bgDanger text-strokeDanger px-1 rounded-md w-full text-center">
      {props.children}
    </p>
  )
}
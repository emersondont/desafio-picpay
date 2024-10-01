import { useEffect, useRef } from "react";

type TransferConfirmationProps = {
  showConfirmation: boolean
  setShowConfirmation: (show: boolean) => void
}

export default function TransferConfirmation(props: TransferConfirmationProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.showConfirmation) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [props.showConfirmation]);

  return (
    <dialog ref={ref} onClick={() => props.setShowConfirmation(false)} className="backdrop:bg-primary bg-primary z-20 text-primary">
      <svg
        width="115px"
        height="115px"
        viewBox="0 0 133 133"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="check-group"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <circle
            id="filled-circle"
            fill="white"
            cx="66.5"
            cy="66.5"
            r="54.5"
          />
          <circle
            id="white-circle"
            fill="currentColor"
            cx="66.5"
            cy="66.5"
            r="55.5"
          />
          <polyline
            id="check"
            stroke="currentColor"
            strokeWidth="5.5"
            points="41 70 56 85 92 49"
          />
        </g>
      </svg>
    </dialog>
  )
}
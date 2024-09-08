import { FilterType } from "@/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";

type FilterLayoutProps = {
  children: React.ReactNode
  value: FilterType;
  setSelect: Dispatch<SetStateAction<FilterType>>
  selected?: boolean
  options?: { value: string, label: string }[];
}

export default function FilterLayout(props: FilterLayoutProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  const colorsMap = {
    selected: 'border-primary bg-bg3',
    unselected: 'bg-bg2 border-transparent hover:border-primary hover:bg-bg3'
  }

  const handleClick = () => {
    if (props.options) {
      setOpen(!open);
    }
    else {
      props.setSelect && props.setSelect(props.value)
    }
  }

  const handleOptionClick = (value: string) => {
    props.setSelect && props.setSelect(props.value)
    setOpen(!open);
  }

  return (
    <>
      <button className={`px-3 py-1 rounded-full border cursor-pointer duration-200 ease-out flex gap-1 items-center
    ${props.selected ? colorsMap["selected"] : colorsMap["unselected"]}
    `}
        onClick={handleClick}
      >
        {props.children}
        {
          props.options && (
            <IoIosArrowDown size={14} />
          )
        }
      </button>
      <dialog
        ref={ref}
        className="backdrop:bg-black backdrop:bg-opacity-50 p-3 rounded-lg "
      >
        <button
          onClick={() => setOpen(false)}
          className="rounded-md bg-transparent border border-transparent hover:bg-bg2 hover:border-tx2 duration-200 ease-out"
        >
          <IoIosClose size={24} />
        </button>
        {
          props.options && (
            <div className="flex gap-1">
              {
                props.options.map(option => (
                  <button
                    onClick={() => handleOptionClick(option.value)}
                    key={option.value}
                    className="px-3 py-1 rounded-full border border-transparent bg-bg2 hover:bg-bg3 hover:border-primary cursor-pointer duration-200 ease-out"
                  >
                    {option.label}
                  </button>
                ))
              }
            </div>
          )
        }
      </dialog>
    </>
  )
}
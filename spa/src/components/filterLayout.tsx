import { FilterLabel, FilterType } from "@/types";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";

type FilterLayoutProps = {
  filter: FilterLabel
  selecteds: { type: FilterType, optionKey: string }[]
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
    if (props.filter.options) {
      setOpen(!open);
    }
    else {
      props.filter.applyThisFilter && props.filter.applyThisFilter()
    }
  }

  const handleOptionClick = (optionIndex: number) => {
    props.filter.options && props.filter.options[optionIndex].applyThisFilter()
    setOpen(!open);
  }

  const isFilterSelected = props.selecteds.some(selected => selected.type === props.filter.type);
  const isOptionSelected = (optionKey: string) => props.selecteds.some(selected => selected.optionKey === optionKey);

  return (
    <>
      <button className={`px-3 py-1 rounded-full border cursor-pointer duration-200 ease-out flex gap-1 items-center
    ${isFilterSelected ? colorsMap["selected"] : colorsMap["unselected"]}
    `}
        onClick={handleClick}
      >
        {props.filter.label}
        {
          props.filter.options && (
            <IoIosArrowDown size={14} />
          )
        }
      </button>
      <dialog
        ref={ref}
        className="backdrop:bg-black backdrop:bg-opacity-50 rounded-lg"
        onClick={() => setOpen(false)}
      >
        <div onClick={e => e.stopPropagation()} className="p-3">
          <button
            onClick={() => setOpen(false)}
            className="rounded-md bg-transparent border border-transparent hover:bg-bg2 hover:border-tx2 duration-200 ease-out"
          >
            <IoIosClose size={24} />
          </button>
          {
            props.filter.options && (
              <div className="flex gap-1">
                {
                  props.filter.options.map((option, index) => (
                    <button
                      onClick={() => handleOptionClick(index)}
                      key={option.key}
                      className={`px-3 py-1 rounded-full border cursor-pointer duration-200 ease-out
                      ${isOptionSelected(option.key) ? colorsMap["selected"] : colorsMap["unselected"]}
                      `}
                    >
                      {option.label}
                    </button>
                  ))
                }
              </div>
            )
          }
        </div>
      </dialog>
    </>
  )
}
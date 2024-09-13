import { UseFormRegisterReturn } from "react-hook-form";

type InputOptionsProps = {
  register: UseFormRegisterReturn;
  options?: { value: string, label: string }[];
}

export default function InputOptions(props: InputOptionsProps) {
  return (
    <div className="flex gap-2">
      {
        props.options?.map(option => (
          <div key={option.value} className="flex items-center gap-1">
            <input type="radio" id={option.value} {...props.register} value={option.value} />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))
      }
    </div>
  )
}
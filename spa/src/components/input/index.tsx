'use client'
import React, { useEffect, useState } from "react"
import { UseFormRegisterReturn, Controller, Control } from "react-hook-form";
import InputOptions from "./inputOptions";
import TogglePasswordButton from "./togglePasswordButton";
import InputMoney from "./inputMoney";

type InputProps = {
  label: string;
  control: Control<any>
  register: UseFormRegisterReturn;
  type: InputType;
  options?: { value: string, label: string }[];
  setFocus: () => void;
}

export type InputType = "text" | "email" | "password" | "radio" | "money"

export default function Input(props: InputProps) {
  const [type, setType] = useState<InputType>(props.type)

  const bgMap = {
    default: 'bg-bg2',
    success: 'bg-bg3',
    error: 'bg-bgDanger'
  }

  const borderMap = {
    default: 'border-tx2',
    success: 'border-primary',
    error: 'border-strokeDanger'
  }

  const labelMap = {
    inputEmpty: 'text-base top-1/2 -translate-y-1/2 peer-focus:text-sm peer-focus:font-bold peer-focus:top-0 peer-focus:translate-y-0',
    inputFilled: 'text-sm font-bold top-0 translate-y-0'
  }

  const InputElements: Record<InputType, React.ReactElement | undefined> = {
    ["radio"]: <InputOptions register={props.register} options={props.options} />,
    ["money"]: <InputMoney register={props.register} />,
    ["text"]: undefined,
    ["email"]: undefined,
    ["password"]: undefined,
  }

  const InputElement = (): React.ReactElement => {
    return InputElements[props.type] ?? (
      <input
        {...props.register}
        type={type}
        className="peer border-none outline-none bg-transparent z-10 w-full caret-primary"
      />
    )
  }

  return (
    <Controller
      control={props.control}
      name={props.register.name}
      render={({ field: { value }, fieldState: { invalid, isTouched } }) => {
        const inputState = props.type != "money" ? isTouched ? (invalid ? 'error' : 'success') : 'default' : 'success'
        const labelState = props.type != "money" ? value  ? 'inputFilled' : 'inputEmpty' : 'inputFilled'
        
        return (
          <div className={`${bgMap[inputState]} ${borderMap[inputState]} focus-within:bg-bg3 focus-within:border-primary border-b px-3 pt-5 pb-1 relative flex rounded-t-md w-full justify-between items-center`}>
            <InputElement />
            <label htmlFor="text" className={`absolute  transition-all duration-200 ease-out ${labelMap[labelState]}`}>
              {props.label}
            </label>

            {props.type === 'password' && (<TogglePasswordButton type={type} setType={setType} />)}
          </div>
        )
      }}
    />
  )
}
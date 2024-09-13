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
}

export type InputType = "text" | "email" | "password" | "radio" | "money"

export type InputState = 'default' | 'success' | 'error'

export default function Input(props: InputProps) {
  const [state, setState] = useState<InputState>('default')
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

  const handleBlur = (value: string) => {
    if (value === '' || value === undefined) {
      setState('default')
    }
  }

  const InputElements: Record<InputType, React.ReactElement | undefined> = {
    ["radio"]: <InputOptions register={props.register} options={props.options} />,
    ["money"]: <InputMoney register={props.register} handleBlur={handleBlur} setState={setState} />,
    ["text"]: undefined,
    ["email"]: undefined,
    ["password"]: undefined,
  }

  const InputElement = (value: any): React.ReactElement => {
    return InputElements[props.type] ?? (
      <input
        className="border-none outline-none bg-transparent peer z-10 w-full caret-primary"
        {...props.register}
        type={type}
        onFocus={() => setState('success')}
        onBlur={() => handleBlur(value)}
      />
    )
  }

  return (
    <Controller
      control={props.control}
      name={props.register.name}
      render={({ field: { value }, fieldState: { error } }) => {
        useEffect(() => {
          if (error) { setState('error'); }
        }, [error]);
        return (
          <div className={`${bgMap[state]} bg-bg2 border-b ${borderMap[state]} px-3 pt-5 pb-1 relative flex rounded-t-md w-full justify-between items-center`}>
            <InputElement value={value}/>

            <label
              htmlFor="text"
              className={`absolute ${value === '' || value === undefined ? labelMap['inputEmpty'] : labelMap['inputFilled']}  transition-all duration-200 ease-out`}
            >
              {props.label}
            </label>

            {props.type === 'password' && (<TogglePasswordButton type={type} setType={setType} />)}
          </div>
        )
      }}
    />
  )
}
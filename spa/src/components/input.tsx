'use client'
import { useEffect, useState } from "react"
import { UseFormRegisterReturn, Controller, Control } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";

type InputProps = {
  label: string;
  control: Control<any>
  register: UseFormRegisterReturn;
  type: "text" | "email" | "password" | "radio";
  options?: { value: string, label: string }[];
}

type InputState = 'default' | 'success' | 'error'

export default function Input(props: InputProps) {
  const [state, setState] = useState<InputState>('default')
  const [type, setType] = useState<"text" | "email" | "password" | "radio">(props.type)

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
            {
              props.type === 'radio' ? (
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

              ) :
                <input
                  className="border-none outline-none bg-transparent peer z-10 w-full caret-primary"
                  {...props.register}
                  type={type}
                  onFocus={() => setState('success')}
                  onBlur={() => handleBlur(value)}
                />
            }

            <label
              htmlFor="text"
              className={`absolute ${value === '' || value === undefined ? labelMap['inputEmpty'] : labelMap['inputFilled']}  transition-all duration-200 ease-out`}
            >
              {props.label}
            </label>

            {props.type === 'password' && (
              <button
                type="button"
                className="cursor-pointer hover:text-primary duration-200 ease-out"
                onClick={() => setType(type === 'text' ? 'password' : 'text')}
              >
                {type === 'text' ? <LuEye size={18} /> : <LuEyeOff size={18} />}
              </button>
            )}
          </div>
        )
      }}
    />
  )
}
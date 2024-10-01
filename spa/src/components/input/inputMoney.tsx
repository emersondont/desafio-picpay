import { UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";

type InputMoneyProps = {
  register: UseFormRegisterReturn;
}

export default function InputMoney(props: InputMoneyProps) {
  const [value, setValue] = useState<string>('0,00')

  const handleValue = (value: string) => {
    if (!value) return setValue('0,00')

    value = value.replace(/\D/g, '');

    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-br', options).format(
      parseFloat(value) / 100
    )

    setValue(result)
  }

  return (
    <div className="flex justify-end gap-2 text-xl font-bold w-full">
      <span className="text-end">R$</span>
      <input
        {...props.register}
        type="text"
        inputMode="numeric"
        min={0.01}
        placeholder="R$ 0,00"
        value={value}
        onChange={(e) => handleValue(e.target.value)}
        className="peer border-none outline-none bg-transparent z-10 caret-primary w-1/2"
      />
    </div>
  )
}
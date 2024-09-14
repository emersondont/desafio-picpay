'use client'
import Input from "@/components/input"
import { transferSchema, TransferSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useRouter } from 'next/navigation'
import Button from "@/components/button"
import { transfer } from "../actions"
import { useUserData } from "@/hooks/useUserData"

type TransferProps = {

}

export default function Transfer(props: TransferProps) {
  const { register, control, reset, handleSubmit, setError, setFocus, formState: { errors } } = useForm<TransferSchema>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      value: 0.00
    }
  })
  const router = useRouter()
  const { userDataQuery, setQueryUserData, unshiftTransfers } = useUserData()

  const handleRegister: SubmitHandler<TransferSchema> = async (data) => {
    try {
      const res = await transfer(data)
      if (res) {
        const { data: userData } = userDataQuery
        if (userData) {
          setQueryUserData({...userData, balance: res.updatedBalance})
        }
        unshiftTransfers({
          id: res.id,
          value: res.value,
          payer: res.payer,
          payee: res.payee,
          timestamp: res.timestamp
        })

        reset()
      }
    } catch (error) {
      console.log("error:", error)
    }
  };

  const onError: SubmitErrorHandler<TransferSchema> = (data) => {
    console.log("erro:", data)
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <main className="text-tx w-full h-svh flex flex-col items-center">
      <div className="max-w-sm h-full w-full py-8 px-3 flex flex-col gap-6 overflow-y-auto items-center">
        <div className="flex w-full items-center gap-2">
          <button onClick={handleGoBack} className="rounded-md bg-transparent border border-transparent hover:bg-bg2 hover:border-tx2 duration-200 ease-out">
            <MdOutlineArrowBackIos size={24} />
          </button>
          <h1 className="font-bold text-2xl">Área de pagamento</h1>
        </div>

        <form onSubmit={handleSubmit(handleRegister, onError)}
          className="flex flex-col gap-2 w-full"
        >
          <h2 className="font-bold text-xl w-full">Para quem você quer pagar?</h2>
          <Input
            label="CPF/CNPJ ou E-mail"
            type="text"
            register={register("payeeDocumentOrEmail")}
            setFocus={() => setFocus("payeeDocumentOrEmail")}
            control={control}
          />
          <h2 className="font-bold text-xl w-full mt-1">Quanto você quer pagar?</h2>
          <Input
            label="Valor"
            type="money"
            register={register("value")}
            setFocus={() => setFocus("value")}
            control={control}
          />

          <Button type="submit">Pagar</Button>
        </form>

      </div>
    </main>
  )
}
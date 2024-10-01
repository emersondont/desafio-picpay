import formatedMoney from "@/utils/formatedMoney"
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

type TransferProps = {
  transfer: Transfer
  userEmail: string
}

export default function Transfer(props: TransferProps) {
  const date = new Date(props.transfer.timestamp)
  const payer = props.transfer.payer.email === props.userEmail
  
  return (
    <div className="flex items-start gap-3 w-full">
      {
        payer
          ?
          <div className="p-2 rounded-full bg-bgDanger">
            <GiPayMoney size={32} className="text-strokeDanger" />
          </div>
          :
          <div className="p-2 rounded-full bg-bg3">
            <GiReceiveMoney size={32} className="text-green-500" />
          </div>
      }
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between w-full">
          {
            payer
              ?
              <p className="font-bold">Transação enviada</p>
              :
              <p className="font-bold">Transação recebida</p>
          }
          <p className="font-bold">
            {formatedMoney(
              payer
                ?
                props.transfer.value * -1
                :
                props.transfer.value
            )}
          </p>
        </div>
        {
          payer
            ?
            <p>PARA: {props.transfer.payee.fullName}</p>
            :
            <p>DE: {props.transfer.payer.fullName}</p>
        }

        <p>{date.toLocaleTimeString().substring(0, 5)}</p>
      </div>
    </div>
  )
}
import { useUserData } from "@/hooks/useUserData"
import splitTransferByDays from "@/utils/splitTransferByDays"
import Transfer from "./transfer"

type TransferListProps = {
  userEmail: string
}

export default function TransferList(props: TransferListProps) {
  const { transfersQuery } = useUserData()

  const { data: transfers } = transfersQuery

  if (!transfers) {
    return <p>Erro ao carregar transferências</p>
  }

  if (transfers.length === 0) {
    return <p>Nenhuma transferência encontrada</p>
  }

  const transferByDays = splitTransferByDays(transfers)
  return (
    <div className="flex flex-col gap-4 w-full overflow-y-auto h-full">
      {
        transferByDays?.map(({ day, transfers }) => (
          <div key={day} className="flex flex-col gap-3 items-start w-full">
            <div className="px-3 py-1 rounded-full bg-bg2">
              <p className="font-bold">{day}</p>
            </div>
            {
              transfers.map(transfer => (
                <Transfer key={transfer.id} transfer={transfer} userEmail={props.userEmail} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
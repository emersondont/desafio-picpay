'use client'
import Button from "@/components/button";
import Transfer from "@/components/transfer";
import { useUserData } from "@/hooks/useUserData";
import formatedMoney from "@/utils/formatedMoney";
import splitTransferByDays from "@/utils/splitTransferByDays";
import { split } from "postcss/lib/list";

export default function Home() {
  const { userDataQuery, transfersQuery } = useUserData()

  const { data: userData, isLoading } = userDataQuery
  const { data: transfers } = transfersQuery

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (!userData) {
    return <p>Erro ao carregar dados do usuário</p>
  }

  if (!transfers) {
    return <p>Erro ao carregar transferências</p>
  }

  const transferByDays = splitTransferByDays(transfers)

  return (
    <main className="text-tx w-full max-h-svh flex flex-col items-center">
      <div className="rounded-full bg-bg2 fixed p-2 right-4 top-4">
        <p className="font-bold text-xl w-7 text-center">{userData.fullName.substring(0, 2)}</p>
      </div>

      <div className="max-w-xl w-full py-8 px-3 flex flex-col gap-4 justify-between overflow-y-auto">

        <div>
          <p>Saldo Disponível</p>
          <h1 className="font-bold text-3xl">{formatedMoney(userData.balance)}</h1>
        </div>

        <div className="flex flex-col gap-4 w-full overflow-y-scroll">
          {
            transferByDays?.map(({ day, transfers }) => (
              <div key={day} className="flex flex-col gap-3 items-start w-full">
                <div className="px-3 py-1 rounded-full bg-bg2">
                  <p className="font-bold">{day}</p>
                </div>
                {
                  transfers.map(transfer => (
                    <Transfer key={transfer.id} transfer={transfer} userEmail={userData.email} />
                  ))
                }
              </div>
            ))
          }
        </div>

        <Button>
          Nova Transferência
        </Button>
      </div>
    </main>
  );
}

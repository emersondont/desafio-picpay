'use client'
import Button from "@/components/button";
import Filters from "@/components/filters";
import TransferList from "@/components/transfersList";
import { useUserData } from "@/hooks/useUserData";
import formatedMoney from "@/utils/formatedMoney";

export default function Home() {
  const { userDataQuery } = useUserData()

  const { data: userData, isLoading } = userDataQuery

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (!userData) {
    return <p>Erro ao carregar dados do usuário</p>
  }
  

  return (
    <main className="text-tx w-full h-svh flex flex-col items-center">
      <div className="rounded-full bg-bg2 fixed p-2 right-4 top-4">
        <p className="font-bold text-xl w-7 text-center">{userData.fullName.substring(0, 2)}</p>
      </div>

      <div className="max-w-xl h-full w-full py-8 px-3 flex flex-col gap-4 justify-between overflow-y-auto">

        <div>
          <p>Saldo Disponível</p>
          <h1 className="font-bold text-3xl mb-4">{formatedMoney(userData.balance)}</h1>

          <Filters />
        </div>

        <TransferList userEmail={userData.email} />

        <Button>
          Nova Transferência
        </Button>
      </div>
    </main>
  );
}

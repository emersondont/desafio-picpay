'use client'
import Button from "@/components/button";
import Filters from "@/components/filters";
import TransferList from "@/components/transfersList";
import UserAvatar from "@/components/userAvatar";
import { useUserData } from "@/hooks/useUserData";
import formatedMoney from "@/utils/formatedMoney";
import Link from "next/link";

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
      <UserAvatar userData={userData} />

      <div className="max-w-xl h-full w-full py-8 px-3 flex flex-col gap-4 justify-between overflow-y-auto">
        <div>
          <p>Saldo Disponível</p>
          <h1 className="font-bold text-3xl mb-4">{formatedMoney(userData.balance)}</h1>

          <Filters />
        </div>

        <TransferList userEmail={userData.email} />

        {
          userData.userType !== 'MERCHANT' && (
            <Link href="/transfer">
              <Button>
                Nova Transferência
              </Button>
            </Link>
          )
        }

      </div>
    </main>
  );
}

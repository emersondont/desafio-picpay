'use client'
import { useUserData } from "@/hooks/useUserData";

export default function Home() {
  const { userDataQuery } = useUserData()

  const { data, isLoading } = userDataQuery

  if(isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <main className="p-8 text-tx">
      <p>ola {data?.fullName}</p>
    </main>
  );
}

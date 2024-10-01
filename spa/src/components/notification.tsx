import { useUserData } from "@/hooks/useUserData"
import formatedMoney from "@/utils/formatedMoney";
import { useEffect, useState } from "react";
import { useSubscription } from "react-stomp-hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notification() {
  const { userDataQuery, transfersQuery, setQueryUserData, unshiftTransfers } = useUserData()
  const { data: userData } = userDataQuery
  const [lastNotification, setLastNotification] = useState<TransferResponseDto | undefined>(undefined);

  useSubscription(`/user/${userData?.email}/topic/notifications`, (message) => setLastNotification(JSON.parse(message.body)));

  const notify = (message: string) => toast.success(`${message}`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "light"
  });

  useEffect(() => {
    if (lastNotification) {
      notify("Você recebeu uma transferência de " + formatedMoney(lastNotification.value) + " de " + lastNotification.payer.fullName)

      setTimeout(() => {
        if (userData) {
          setQueryUserData({ ...userData, balance: userData.balance + lastNotification.value })
        }
        unshiftTransfers({
          id: lastNotification.id,
          value: lastNotification.value,
          payer: lastNotification.payer,
          payee: lastNotification.payee,
          timestamp: lastNotification.timestamp
        })
      }, 1000);
    }
  }, [lastNotification])

  return (
    <ToastContainer />
  )
}
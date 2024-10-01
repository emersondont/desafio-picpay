import { useUserData } from "@/hooks/useUserData"
import { useEffect, useState } from "react";
import { useSubscription } from "react-stomp-hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type notificationsProps = {

}

export default function Notification(props: notificationsProps) {
  const { userDataQuery, transfersQuery } = useUserData()
  const { data: userData, refetch: refetchData } = userDataQuery
  const { refetch: refetchTransfers } = transfersQuery
  const [lastMessage, setLastMessage] = useState("");

  useSubscription(`/user/${userData?.email}/topic/notifications`, (message) => setLastMessage(message.body));

  const notify = () => toast.success(`${lastMessage}`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "light"
  });

  useEffect(() => {
    if (lastMessage) {
      setTimeout(() => {
        notify()
      }, 1000);

      //por enquanto deixar assim
      setTimeout(() => {
        refetchTransfers();
        refetchData();
      }, 1000);
    }
  }, [lastMessage])

  return (
    <ToastContainer />
  )
}
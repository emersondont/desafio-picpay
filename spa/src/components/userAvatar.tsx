import { logout } from "@/app/actions";
import { useEffect, useRef, useState } from "react";
import { CiUser, CiMail, CiLogout } from "react-icons/ci";

type UserAvatarProps = {
  userData: UserDataResponseDto
}

export default function UserAvatar({ userData }: UserAvatarProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  }

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full bg-bg2 fixed p-2 right-4 top-4 border border-transparent hover:border-tx2 duration-200 ease-out"
      >

        <p className="font-bold text-xl w-7 text-center">{userData.fullName.substring(0, 2)}</p>
      </button>
      <dialog
        onClick={() => setOpen(false)}
        ref={ref}
        className="backdrop:bg-black backdrop:bg-opacity-50 rounded-lg mr-4 mt-16"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="p-3 flex flex-col gap-1"
        >
          <div className="flex items-center gap-1 p-1">
            <CiUser size={22} className="text-tx2" />
            <p>{userData.fullName}</p>
          </div>
          <div className="flex items-center gap-1 p-1">
            <CiMail size={22} className="text-tx2" />
            <p>{userData.email}</p>
          </div>
          <div className="w-full h-px bg-tx2"/>
          <button onClick={handleLogout} className="flex items-center gap-1 p-1 rounded hover:bg-black hover:bg-opacity-10 duration-200 ease-out">
            <CiLogout size={22} className="text-tx2" />
            <p>Sair</p>
          </button>
        </div>
      </dialog>
    </>
  )
}
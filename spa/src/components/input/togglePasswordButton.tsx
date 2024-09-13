import { LuEye, LuEyeOff } from "react-icons/lu";
import { InputType } from ".";

type TogglePasswordButtonProps = {
  type: InputType;
  setType: (type: InputType) => void;
}

export default function TogglePasswordButton({ type, setType }: TogglePasswordButtonProps) {
  return (
    <button
      type="button"
      className="cursor-pointer hover:text-primary duration-200 ease-out"
      onClick={() => setType(type === 'text' ? 'password' : 'text')}
    >
      {type === 'text' ? <LuEye size={18} /> : <LuEyeOff size={18} />}
    </button>
  )
}
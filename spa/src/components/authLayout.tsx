import { FieldValues, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

type AuthLayoutProps<T extends FieldValues> = {
  title: string;
  children: React.ReactNode;
};

export default function AuthLayout<T extends FieldValues>(props: AuthLayoutProps<T>) {

  return (
    <main className="bg-primary h-svh w-full flex justify-center items-center p-6 overflow-hidden">
      <div className="bg-bg rounded-xl p-6 flex flex-col items-center gap-6 max-w-80 w-full">
        <h1 className="font-bold text-2xl">{props.title}</h1>
        {props.children}
      </div>
    </main>
  );
}
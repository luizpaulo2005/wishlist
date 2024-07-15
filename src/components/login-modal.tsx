import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginModal = () => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="rounded-xl py-5 px-6 bg-zinc-900 space-y-2 flex flex-col gap-2">
        <p className="font-semibold text-xl text-center">
          Faça login para poder criar sua lista de desejos
        </p>
        <button
          onClick={() => signIn("google")}
          className="self-center flex items-center gap-2 bg-zinc-800 text-zinc-200 rounded-lg transition-colors p-2 hover:bg-zinc-700"
        >
          <Image
            src="/google-icon.png"
            alt="Google Logo"
            width={20}
            height={20}
          />
          Fazer Login com o Google
        </button>
      </div>
    </div>
  );
};

export { LoginModal };

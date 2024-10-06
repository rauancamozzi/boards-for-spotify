import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-4 px-32 bottom-0 w-full border-t-2 border-stone-800 flex flex-row items-center justify-between">
      <p className="text-white">&copy; 2024 Rauan Camozzi</p>
      <div className="flex flex-row item-center gap-4">
        <GithubLogo className="text-white" size={24} weight="fill" />
        <LinkedinLogo className="text-white" size={24} weight="fill" />
      </div>
    </footer>
  )
}

import { Header } from "@/components/Header";
import { CardList } from "@/components/CardList";
import { CardPlayer } from "@/components/CardPlayer";

export default function Home() { 
  return (
    <main className="min-h-screen min-w-full bg-theme-transition flex justify-center max-md:flex-col md:justify-center md:items-center lg:p-24 max-md:p-[15px] max-sm:p-[5px] md:p-10 bg-light-main dark:bg-dark-main gap-[32px]">
      <Header />
      <CardList />
      <CardPlayer />
    </main>
  )
}

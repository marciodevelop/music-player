
import { Header } from "@/components/Header";
import { CardList } from "@/components/CardList";
import { CardPlayer } from "@/components/CardPlayer";

export default function Home() { 
  return (
    <main className="min-h-screen min-w-full bg-theme-transition flex max-md:flex-col md:items-center justify-center lg:p-24 max-sm:p-[15px] md:p-24 bg-light-main dark:bg-dark-main gap-[32px]">
      <Header />
      <CardList />
      <CardPlayer />
    </main>
  )
}

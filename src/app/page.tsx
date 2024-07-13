import HeroesList from "@/components/HeroesList";

export default function Home() {
  return (
    <main id="main" className="max-w-screen-lg w-full m-auto md:p-10">
      <h1 className="text-center text-3xl text-white">List of Characters</h1>
      <HeroesList />
    </main>
  );
}

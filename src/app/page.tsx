import HeroesList from "@/components/HeroesList";

// Functional component representing the Home page
export default function Home() {
  return (
    // Main container for the Home page content
    <main id="main" className="max-w-screen-lg w-full m-auto md:p-10">
      {/* Page title */}
      <h1 className="text-center text-3xl text-white">List of Characters</h1>
      {/* Component to render the list of heroes */}
      <HeroesList />
    </main>
  );
}

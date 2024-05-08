import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

export default function Home() {


  return (
    <main className="flex flex-col items-center min-h-screen p-5 bg-black text-white">
      <Header/>
      <h1 className="m-4 p-5 text-5xl">Jammming</h1>
      <div>
        {/*  */}
      </div>
      <SearchBar/>

    </main>
  );
}
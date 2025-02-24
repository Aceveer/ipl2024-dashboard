import Footer from "../components/footer";
import Header from "../components/header";
import StatsTable from "./statsTable";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 container mx-auto p-4">
        <StatsTable/>
      </div>
      <Footer />
    </div>
  );
}

"use client"

import Header from "./components/header";
import Footer from "./components/footer";
import PointsTable from "./components/pointsTable";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 container mx-auto p-4">
        <PointsTable />
      </div>

      <Footer />
    </div>
  );
}

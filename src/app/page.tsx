"use client";

import MainLayout from "@/components/layout/MainLayout";
import TimelineWidget from "@/components/timeline/TimelineWidget";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
       <div className="relative z-10">
        <Navbar />
      </div>
      <div className="flex-1">
        <MainLayout />
      </div>
      
      {/* Timeline positioned below MainLayout */}
      <div className="w-full h-[298px] p-4">
        <TimelineWidget />
      </div>
    </div>
  );
}

// components/layout/MainLayout.tsx
import Navbar from "./Navbar"
import VideoPlayer from "../video/VideoPlayer";
import IncidentList from "../incidents/IncidentList";

export default function MainLayout() {
  return (
    <div className="flex flex-col bg-black text-white">
      <main className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
          {/* Left Column: Video Player */}
          <div className="lg:col-span-2 h-full">
            <VideoPlayer />
          </div>
          <IncidentList />
        </div>
      </main>
    </div>
  );
}
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Camera {
  id: number;
  name: string;
  location: string;
  thumbnailUrl: string;
}


export default function VideoPlayer() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Set initial time
    setCurrentTime(new Date().toLocaleString());
    
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    const fetchCameras = async () => {
      try {
        const res = await fetch('/api/cameras');
        const data = await res.json();
        setCameras(data);
        if (data.length > 0) {
          setSelectedCamera(data[0]); // Select the first camera by default
        }
      } catch (error) {
        console.error("Failed to fetch cameras:", error);
      }
    };
    fetchCameras();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[450px] bg-black rounded-lg overflow-hidden border border-white/10">
      {/* Main Video */}
      <div className="w-full h-full">
        <Image
          src={selectedCamera?.thumbnailUrl || '/thumbnails/gun3.jpg'}
          alt={selectedCamera ? selectedCamera.name : 'Main camera feed'}
          fill
          className="object-cover opacity-90"
        />
        {currentTime && (
          <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded">
            <span>{currentTime}</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded">
          <span>&#9679; {selectedCamera ? selectedCamera.name : 'No Camera Selected'}</span>
        </div>
      </div>

      {/* Horizontal Camera Thumbnails */}
      <div className="absolute bottom-4 right-4 flex gap-3 max-w-[80%] overflow-x-auto p-3 bg-black/50 rounded">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            className="relative flex-shrink-0 overflow-hidden cursor-pointer"
            style={{
              width: '120px',
              height: '83.6px',
              borderRadius: '3.2px',
              opacity: 1,
              border: selectedCamera?.id === camera.id ? '2px solid #facc15' : '2px solid transparent'
            }}
            onClick={() => setSelectedCamera(camera)}
          >
            <Image
              src={camera.thumbnailUrl}
              alt={camera.name}
              fill
              className="object-cover"
              style={{ opacity: 1 }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-1.5 py-1 truncate text-center">
              {camera.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

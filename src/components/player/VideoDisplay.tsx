// components/player/VideoDisplay.tsx
export default function VideoDisplay({ videoSrc }: { videoSrc: string }) {
    return (
      <div className="bg-black rounded-lg overflow-hidden mb-4">
        <video src={videoSrc} controls className="w-full max-h-[300px]" />
      </div>
    )
  }
  
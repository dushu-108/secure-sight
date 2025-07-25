// components/player/ThumbnailStrip.tsx
export default function ThumbnailStrip({ thumbnails }: { thumbnails: string[] }) {
    return (
      <div className="flex gap-2">
        {thumbnails.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Camera ${idx}`}
            className="w-20 h-20 object-cover rounded"
          />
        ))}
      </div>
    )
  }
  
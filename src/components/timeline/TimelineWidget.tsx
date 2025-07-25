"use client"

import React, { useState, useEffect } from "react"
import ControlBar from "./ControlBar"
import { AlertCircle, Camera, Video, User, Zap, AlertTriangle, ShieldOff } from "lucide-react"

type TimelineEvent = {
  id: number
  time: Date
  type: "motion" | "alert" | "recording"
  cameraId: number
}

// Map incident types to icons and colors
const getThreatConfig = (type: string) => {
  // Define the type for our config map
  type ThreatConfig = {
    icon: React.ReactNode;
    color: string;
  };

  // Map of all possible threat types to their config
  const configMap: Record<string, ThreatConfig> = {
    // Gun threats
    'gun': {
      icon: <Zap className="w-4 h-4 text-white" />,
      color: "bg-red-600"
    },
    'weapon': {
      icon: <Zap className="w-4 h-4 text-white" />,
      color: "bg-red-600"
    },
    
    // Unauthorized access
    'unauthorised': {
      icon: <ShieldOff className="w-4 h-4 text-white" />,
      color: "bg-amber-500"
    },
    'unauthorized': {
      icon: <ShieldOff className="w-4 h-4 text-white" />,
      color: "bg-amber-500"
    },
    'access': {
      icon: <ShieldOff className="w-4 h-4 text-white" />,
      color: "bg-amber-500"
    },
    
    // Face recognition
    'face': {
      icon: <User className="w-4 h-4 text-white" />,
      color: "bg-green-500"
    },
    'recognized': {
      icon: <User className="w-4 h-4 text-white" />,
      color: "bg-green-500"
    },
    
    // Motion detection
    'motion': {
      icon: <Video className="w-4 h-4 text-white" />,
      color: "bg-blue-500"
    },
    
    // General alerts
    'alert': {
      icon: <AlertCircle className="w-4 h-4 text-white" />,
      color: "bg-yellow-500"
    },
    'intrusion': {
      icon: <AlertTriangle className="w-4 h-4 text-white" />,
      color: "bg-orange-500"
    },
    'breach': {
      icon: <AlertTriangle className="w-4 h-4 text-white" />,
      color: "bg-orange-500"
    }
  };

  // Default config for unknown types
  const defaultConfig = {
    icon: <AlertTriangle className="w-4 h-4 text-white" />,
    color: "bg-gray-500"
  };

  // If type is undefined or null, return default
  if (!type) return defaultConfig;
  
  // Convert type to lowercase for case-insensitive matching
  const normalizedType = type.toLowerCase();
  
  // Try to find a direct match first
  const directMatch = configMap[normalizedType];
  if (directMatch) return directMatch;
  
  // If no direct match, try to find a partial match
  const partialMatch = Object.entries(configMap).find(([key]) => 
    normalizedType.includes(key) || key.includes(normalizedType)
  );
  
  // Return the matched config or the default
  return partialMatch ? partialMatch[1] : defaultConfig;
};

export default function TimelineWidget() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [zoom, setZoom] = useState(1)
  const [events, setEvents] = useState<TimelineEvent[]>([])

  // Fetch real incident data from API
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        console.log('Fetching incidents...');
        const response = await fetch('/api/incidents');
        if (!response.ok) {
          throw new Error('Failed to fetch incidents');
        }
        const incidents = await response.json();
        console.log('Raw incidents from API:', incidents);
        
        // Map incidents to timeline events
        const timelineEvents = incidents.map((incident: any) => {
          // Use the full incident type for matching
          const eventType = incident.type?.toLowerCase() || 'motion';
          
          console.log(`Processing incident:`, {
            id: incident.id,
            type: incident.type,
            cameraId: incident.cameraId,
            mappedType: eventType
          });
          
          return {
            id: incident.id,
            time: new Date(incident.tsStart),
            type: eventType, // Keep the original type for matching
            cameraId: incident.cameraId, // Use the original cameraId
          };
        });
        
        setEvents(timelineEvents);
      } catch (error) {
        console.error('Error fetching timeline events:', error);
        // Fallback to mock data if API fails
        const mockEvents: TimelineEvent[] = [
          { id: 1, time: new Date(Date.now() - 3600000), type: 'motion', cameraId: 1 },
          { id: 2, time: new Date(Date.now() - 1800000), type: 'alert', cameraId: 2 },
          { id: 3, time: new Date(Date.now() - 900000), type: 'recording', cameraId: 1 },
          { id: 4, time: new Date(), type: 'motion', cameraId: 3 },
        ];
        setEvents(mockEvents);
      }
    };

    fetchIncidents();
  }, []);

  const hourWidth = 4 * zoom // 1 hour = 4rem × zoom
  const hours = Array.from({ length: 25 }, (_, i) => i)

  // Get unique camera IDs from events and sort them
  const cameraIds = Array.from(new Set(events.map((e) => e.cameraId))).sort((a, b) => a - b);
  
  // Map camera IDs to display values (1, 2, 3)
  const getDisplayCameraId = (cameraId: number) => {
    // If cameraId is 4,5,6, map to 1,2,3 respectively
    if (cameraId >= 4 && cameraId <= 6) {
      return cameraId - 3;
    }
    // Otherwise, use the ID as is (for backward compatibility)
    return cameraId;
  };
  
  // Debug: Log all events with their camera IDs and types
  useEffect(() => {
    if (events.length > 0) {
      console.log('All timeline events:', events.map(e => ({
        id: e.id, 
        cameraId: e.cameraId,
        displayCameraId: getDisplayCameraId(e.cameraId),
        type: e.type,
        time: e.time.toISOString()
      })));
    }
  }, [events]);

  return (
    <div className="bg-black rounded-lg overflow-hidden border border-gray-800">
      <ControlBar
        currentTime={currentTime}
        onZoomIn={() => setZoom((z) => Math.min(z + 0.1, 2))}
        onZoomOut={() => setZoom((z) => Math.max(z - 0.1, 0.5))}
        onPlay={() => {}}
        onPause={() => {}}
        isPlaying={false}
      />

      <div className="px-4 py-2 overflow-x-auto">
        <div className="relative w-max">
          {/* Hour Labels */}
          <div className="flex text-xs text-gray-500 mb-2 pl-32">
            {hours.map((h) => (
              <div
                key={h}
                style={{ width: `${hourWidth}rem` }}
                className="text-center"
              >
                {String(h).padStart(2, "0")}:00
              </div>
            ))}
          </div>

          {/* Camera Rows */}
          {cameraIds.map((cameraId) => {
            const camEvents = events.filter((e) => e.cameraId === cameraId)
            return (
              <div
                key={cameraId}
                className="flex items-center mb-3"
              >
                {/* Camera Label */}
                <div className="w-32 text-white text-sm pr-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Camera {getDisplayCameraId(cameraId)}
                </div>

                {/* Timeline */}
                <div className="relative flex-1 flex border border-gray-700 h-10 rounded-md bg-gray-900">
                  {camEvents.length === 0 && (
                    <div className="w-full flex items-center justify-center text-gray-500 text-sm">
                      No events for this camera
                    </div>
                  )}
                  {camEvents.map((event) => {
                    console.log('Rendering event:', event);
                    const eventTime = event.time;
                    const hour = eventTime.getHours() + (eventTime.getMinutes() / 60);
                    const left = hour * hourWidth;

                    return (
                      <div 
                        key={event.id}
                        className="absolute flex flex-col items-center"
                        style={{
                          left: `${left}rem`,
                          top: "0.25rem",
                          transform: 'translateX(-50%)',
                          zIndex: 10,
                        }}
                      >
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${getThreatConfig(event.type).color} mb-1`}
                          title={`${event.type} at ${event.time.toLocaleTimeString()}`}
                        >
                          {getThreatConfig(event.type).icon}
                        </div>
                        <div className="text-xs text-white bg-black/70 px-1.5 py-0.5 rounded whitespace-nowrap">
                          {event.type}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Current Time Marker */}
          <div
            className="absolute top-0 h-full w-0.5 bg-yellow-400 z-10"
            style={{
              left: `${(currentTime.getHours() + currentTime.getMinutes() / 60) * hourWidth
                }rem`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
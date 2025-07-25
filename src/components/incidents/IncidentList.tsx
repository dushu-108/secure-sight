"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Siren } from "lucide-react";
import IncidentCard from "./IncidentCard"

export type Incident = {
  id: number
  type: string
  tsStart: string
  tsEnd: string
  thumbnailUrl: string
  resolved: boolean
  camera: {
    name: string,
    location: string
  }
}

export default function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        // Get all incidents from the API
        const res = await fetch("/api/incidents?cache=" + new Date().getTime(), {
          next: { revalidate: 0 } // Ensure we're not getting cached data
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched incidents:", data); // Log the actual data
        setIncidents(data);
        
        // Log any resolved incidents for debugging
        const resolved = data.filter((i: Incident) => i.resolved);
        if (resolved.length > 0) {
          console.log("Resolved incidents:", resolved);
        }
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
      } finally {
        setIsLoading(false);
      }  
    };

    fetchIncidents();
  }, []);

  const handleResolve = async (id: number) => {
    try {
      await fetch(`/api/incidents/${id}/resolve`, { method: "PATCH" })
      setIncidents(prev => prev.map(incident => 
        incident.id === id ? { ...incident, resolved: true } : incident
      ))
    } catch (error) {
      console.error("Failed to resolve incident:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const resolvedCount = incidents.filter(i => i.resolved).length;

  // Filter and sort incidents based on the selected filter
  const filteredIncidents = [...incidents]
    .filter(incident => {
      return true; // 'all' filter
    })
    .sort((a, b) => new Date(b.tsStart).getTime() - new Date(a.tsStart).getTime());

  return (
    <div className="relative w-full" style={{ height: '450px' }}>
      <Card className="absolute inset-0 bg-transparent border border-white/10 shadow-none flex flex-col overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg border border-gray-800">
          <div className="flex items-center space-x-2">
            <Siren className="h-5 w-5 text-red-500" />
            <span className="text-white font-medium">
              {incidents.filter(i => !i.resolved).length} Unresolved
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>{resolvedCount} Resolved</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-hide">
        <div className="space-y-2">
          {filteredIncidents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 h-full">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No incidents found</p>
            </div>
          ) : (
            <>
              {filteredIncidents.map((incident) => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                  onResolve={handleResolve}
                />
              ))}
            </>
          )}
          </div>
        </div>
      </Card>
    </div>
  )
}

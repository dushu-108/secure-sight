// components/incidents/IncidentCard.tsx
import { Button } from "@/components/ui/button"
import { Incident } from "./IncidentList"

import { Siren, ShieldAlert, UserCheck } from 'lucide-react';

export default function IncidentCard({
  incident,
  onResolve,
}: {
  incident: Incident
  onResolve: (id: number) => void
}) {
  const { id, type, tsStart, tsEnd, thumbnailUrl, resolved, camera } = incident

  const incidentIcons: { [key: string]: React.ReactNode } = {
    "Gun Threat": <Siren className="h-4 w-4 text-red-500" />,
    "Unauthorised Access": <ShieldAlert className="h-4 w-4 text-yellow-500" />,
    "Face Recognised": <UserCheck className="h-4 w-4 text-blue-500" />,
  };

  return (
    <div className={`flex items-center justify-between p-2 rounded-lg ${resolved ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-3">
        <img src={thumbnailUrl} alt={type} className="w-24 h-16 object-cover rounded-md" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {incidentIcons[type] || <Siren className="h-4 w-4" />}
            <p className="font-semibold text-white">{type}</p>
          </div>
          <p className="text-sm text-muted-foreground">{camera.location}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(tsStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(tsEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on {new Date(tsStart).toLocaleDateString()}
          </p>
        </div>
      </div>
      {!resolved && (
        <Button variant="link" size="sm" onClick={() => onResolve(id)} className="text-yellow-400 font-semibold self-start">
          Resolve
        </Button>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { EventHeader } from "@/app/events/components/event-header"
import { EventListTabs } from "@/app/events/components/event-list-tabs"
import { EventDetailView } from "@/app/events/components/event-detail-view"

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <EventHeader />
      <main className="flex-1 overflow-y-auto">
        <EventListTabs onEventClick={handleEventClick} />
      </main>

      <EventDetailView event={selectedEvent} show={selectedEvent !== null} onHide={() => setSelectedEvent(null)} />
    </div>
  )
}

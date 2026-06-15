import { Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrackerPage() {
  const trackedSessions = [
    { id: 1, task: "Writing Landing Page Copy", client: "Wavespace", duration: "02:45:10", date: "Today" },
    { id: 2, task: "SEO Research", client: "TechFlow", duration: "01:20:00", date: "Yesterday" },
    { id: 3, task: "Revisions - Email Sequence", client: "GrowthLabs", duration: "00:45:30", date: "Oct 20" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-[#09090b] mb-4">Time Tracker</h1>
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-semibold text-[#09090b]">Tracker</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mb-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full">
            <input 
              type="text" 
              placeholder="What are you working on?" 
              className="w-full text-lg border-none focus:ring-0 outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-6">
            <span className="text-3xl font-mono tracking-wider font-semibold text-gray-900">00:00:00</span>
            <div className="flex gap-2">
              <Button className="rounded-full w-12 h-12 p-0 bg-indigo-600 hover:bg-indigo-700">
                <Play className="h-5 w-5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-700">Recent Sessions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {trackedSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">{session.task}</p>
                <p className="text-sm text-gray-500">{session.client}</p>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-sm text-gray-500">{session.date}</span>
                <span className="font-mono font-medium">{session.duration}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-indigo-600 bg-transparent shadow-none hover:bg-indigo-50">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

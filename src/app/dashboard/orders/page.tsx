import { 
  CheckSquare, 
  List, 
  LayoutGrid, 
  Calendar, 
  User, 
  MoreVertical, 
  Plus, 
  Search, 
  Filter, 
  MessageSquare, 
  Paperclip,
  Pin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getOrders } from "@/app/actions/orders";

type TaskStatus = 'To do' | 'In Progress' | 'In Reviewed' | 'Completed';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'High' | 'Low';
  comments: number;
  attachments: number;
  avatars: string[];
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Travel planner website design",
    description: "Create page where there is...",
    status: "To do",
    priority: "High",
    comments: 3,
    attachments: 12,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces"
    ]
  },
  {
    id: "2",
    title: "Full Website design for SaaS...",
    description: "Create page where there is...",
    status: "To do",
    priority: "Low",
    comments: 3,
    attachments: 12,
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=64&h=64&fit=crop&crop=faces"
    ]
  },
  {
    id: "3",
    title: "Travel planner website design",
    description: "Create page where there is...",
    status: "In Progress",
    priority: "High",
    comments: 3,
    attachments: 12,
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces",
    ]
  },
  {
    id: "4",
    title: "Full Website design for SaaS...",
    description: "Create page where there is...",
    status: "In Reviewed",
    priority: "High",
    comments: 3,
    attachments: 12,
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces"
    ]
  },
  {
    id: "5",
    title: "Travel planner website design",
    description: "Create page where there is...",
    status: "Completed",
    priority: "High",
    comments: 3,
    attachments: 12,
    avatars: [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=64&h=64&fit=crop&crop=faces",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces"
    ]
  }
];

const COLUMNS: { title: TaskStatus; color: string }[] = [
  { title: "To do", color: "bg-indigo-600" },
  { title: "In Progress", color: "bg-orange-500" },
  { title: "In Reviewed", color: "bg-yellow-400" },
  { title: "Completed", color: "bg-emerald-500" },
];

export default async function MyTasksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q.toLowerCase() : '';
  const orders = await getOrders();
  
  // Map orders to tasks for the Kanban view
  const mappedTasks = orders.map((order: any) => {
    let kanbanStatus: TaskStatus = 'To do';
    if (order.status === 'in_progress' || order.status === 'In Progress') kanbanStatus = 'In Progress';
    if (order.status === 'review' || order.status === 'In Reviewed') kanbanStatus = 'In Reviewed';
    if (order.status === 'completed' || order.status === 'Completed') kanbanStatus = 'Completed';

    return {
      id: order.id,
      title: order.type || 'Content Package',
      description: `Client: ${order.clients?.company_name} (${order.clients?.first_name} ${order.clients?.last_name})`,
      status: kanbanStatus,
      priority: order.priority === 'High' ? 'High' as const : 'Low' as const,
      comments: 0,
      attachments: 0,
      avatars: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces"
      ]
    };
  });

  const allTasks = [...mappedTasks, ...mockTasks];
  const displayTasks = allTasks.filter(task => 
    task.title.toLowerCase().includes(query) || 
    task.description.toLowerCase().includes(query)
  );
  
  return (
    <div className="flex flex-col h-full w-full max-w-[1400px] mx-auto">
      {/* Header Area */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A] mb-1">My Tasks</h1>
            <p className="text-sm text-gray-500">Manage your orders and deliverables</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="text-gray-600 border-gray-200">
              Share Tasks
            </Button>
            <Link href="/dashboard/clients/new">
              <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                <Plus className="w-4 h-4 mr-2" />
                New Client
              </Button>
            </Link>
            <Link href="/dashboard/orders/new">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </Button>
            </Link>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 pb-2">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 pb-2">
            <CheckSquare className="w-4 h-4" /> Overview
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 pb-2">
            <List className="w-4 h-4" /> Lists
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 pb-2">
            <LayoutGrid className="w-4 h-4" /> Board
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 pb-2">
            <Calendar className="w-4 h-4" /> Calendar
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 pb-2 ml-4">
            <User className="w-4 h-4" /> Task assigned to me
          </button>
        </div>

        {/* Filters Bar */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white border-gray-200 text-gray-600 font-medium h-9">
              <LayoutGrid className="w-4 h-4 mr-2 text-gray-400" />
              Group: Status
            </Button>
            <Button variant="outline" size="sm" className="bg-white border-gray-200 text-gray-600 font-medium h-9">
              <List className="w-4 h-4 mr-2 text-gray-400" />
              Columns
            </Button>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Task..."
                className="h-9 w-64 rounded-md border border-gray-200 bg-white pl-9 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <select className="h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-600 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option>All Project</option>
            </select>
            <Button variant="outline" size="icon" className="h-9 w-9 bg-white border-gray-200 text-gray-500">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-4 flex-1">
        {COLUMNS.map((column) => {
          const columnTasks = displayTasks.filter(t => t.status === column.title);
          
          return (
            <div key={column.title} className="flex flex-col min-w-[320px] w-[320px] shrink-0 bg-[#F1F5F9] rounded-xl p-4 border border-gray-200/60">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full ring-2 ring-offset-2 ring-offset-[#F1F5F9]", column.color.replace('bg-', 'ring-'), column.color)} />
                  <h3 className="font-semibold text-[#0F172A]">{column.title}</h3>
                  <span className="flex items-center justify-center bg-gray-200 text-gray-600 text-xs font-semibold rounded-full w-5 h-5 ml-1">
                    {columnTasks.length}
                  </span>
                </div>
                <div className="flex gap-1 text-gray-400">
                  <Plus className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                  <MoreVertical className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                </div>
              </div>

              {/* Column Cards */}
              <div className="flex flex-col gap-3 overflow-y-auto pr-1">
                {columnTasks.map((task) => (
                  <div key={task.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-grab">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-1.5" />
                        Not Started
                      </span>
                      {task.priority === 'High' ? (
                        <span className="flex items-center text-xs font-semibold text-purple-600">
                          <Pin className="w-3 h-3 mr-1" /> High
                        </span>
                      ) : (
                        <span className="flex items-center text-xs font-semibold text-yellow-600">
                          <Pin className="w-3 h-3 mr-1" /> Low
                        </span>
                      )}
                    </div>
                    
                    <h4 className="font-bold text-[#0F172A] mb-1 leading-snug">{task.title}</h4>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-1">{task.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex -space-x-2 overflow-hidden">
                        {task.avatars.map((avatar, i) => (
                          <img 
                            key={i} 
                            src={avatar} 
                            alt="Assignee" 
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-gray-400 text-xs font-medium">
                        <span className="flex items-center gap-1"><Paperclip className="w-3.5 h-3.5" /> {task.comments}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {task.attachments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

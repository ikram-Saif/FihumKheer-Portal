import { Card, Badge } from "flowbite-react";
import { LuUsers, LuTrendingUp, LuHeart, LuLayoutDashboard, LuActivity, LuArrowUpRight, LuCalendar } from 'react-icons/lu';
import { useVolunteersStore } from "../store/volunteersStor";
import { useProjectStore } from "../store/projectsStor";
import { useEffect } from "react";

/**
 * Dashboard Component
 * An ultra-premium, analytics-focused landing page showcasing modern SaaS aesthetics
 * Features: Glassmorphism, subtle glowing background spheres, animated entry, refined typography
 */
function Dashboard() {
  const { volunteers, fetchAllVolunteers } = useVolunteersStore();
  const { projects, fetchAllProjects } = useProjectStore();

  useEffect(() => {
    fetchAllVolunteers();
    fetchAllProjects();
  }, [fetchAllVolunteers, fetchAllProjects]);

  const stats = [
    {
      label: "Total Visitors",
      value: "2.4k",
      change: "+12.5%",
      icon: LuTrendingUp,
      color: "blue",
      description: "Organic traffic this month"
    },
    {
      label: "Active Donors",
      value: "142",
      change: "+8.2%",
      icon: LuHeart,
      color: "rose",
      description: "Total monthly contributors"
    },
    {
      label: "Initiatives",
      value: projects?.length || "24",
      change: "+2 new",
      icon: LuLayoutDashboard,
      color: "violet",
      description: "Ongoing humanitarian projects"
    },
    {
      label: "Volunteers",
      value: volunteers?.length || "120",
      change: "+4.1%",
      icon: LuUsers,
      color: "emerald",
      description: "Verified community members"
    }
  ];

  const recentActivity = [
    { type: "project", text: "New initiative 'Winter Relief' approved", time: "2 hours ago", status: "success" },
    { type: "volunteer", text: "Ahmed Ali joined the volunteer team", time: "5 hours ago", status: "info" },
    { type: "donation", text: "Target reached for 'Clean Water' project", time: "1 day ago", status: "warning" },
    { type: "sector", text: "Education sector updated requirements", time: "2 days ago", status: "default" },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] p-3 md:p-6 lg:p-6 overflow-hidden z-0">
      {/* Decorative Animated Glowing Background Orbs */}
      <div className="absolute top-0 -left-20 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob -z-10 dark:bg-blue-600/10"></div>
      <div className="absolute top-0 -right-20 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000 -z-10 dark:bg-fuchsia-600/10"></div>
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000 -z-10 dark:bg-teal-600/10"></div>

      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight drop-shadow-sm">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-purple-400">Analytics</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            Real-time overview of your initiative's global impact
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="relative overflow-hidden p-5 rounded-[1.5rem] bg-white/70 dark:bg-gray-900/60 backdrop-blur-3xl border border-white/40 dark:border-gray-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgb(0,0,0,0.06)] hover:border-gray-200/50 dark:hover:border-gray-700/50 transition-all duration-500 group"
            >
              <div className="absolute -bottom-6 -right-6 p-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 pointer-events-none">
                <stat.icon size={120} />
              </div>
              <div className="flex flex-col gap-4 relative z-10">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-${stat.color}-500/10 dark:bg-${stat.color}-500/20 text-${stat.color}-600 dark:text-${stat.color}-400 ring-1 ring-${stat.color}-500/20 dark:ring-${stat.color}-500/30 group-hover:bg-${stat.color}-500 group-hover:text-white transition-colors duration-500 shadow-sm`}>
                  <stat.icon size={22} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</span>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</h2>
                    <Badge color="success" className={`bg-${stat.color}-50 dark:bg-${stat.color}-500/10 text-${stat.color}-700 dark:text-${stat.color}-400 font-bold border border-${stat.color}-200/50 dark:border-transparent px-2 py-0.5 rounded-md flex items-center gap-1 text-[9px]`}>
                      <LuArrowUpRight size={12} strokeWidth={3} /> {stat.change}
                    </Badge>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500/80 dark:text-gray-400/80 font-medium leading-snug">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Donation Traffic Chart Box */}
          <div className="p-5 md:p-6 rounded-[1.5rem] bg-white/70 dark:bg-gray-900/60 backdrop-blur-3xl border border-white/40 dark:border-gray-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:border-gray-200/50 dark:hover:border-gray-700/50 transition-all duration-500">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">
                Donation Traffic
              </h3>
              <span className="text-[9px] md:text-[10px] px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold rounded-md uppercase tracking-wider">
                Monthly Trend
              </span>
            </div>
            
            <div className="relative h-32 flex items-end justify-between gap-1.5 sm:gap-2 mt-2">
              {[
                { month: 'Jan', value: 45 },
                { month: 'Feb', value: 30 },
                { month: 'Mar', value: 65 },
                { month: 'Apr', value: 40 },
                { month: 'May', value: 85 },
                { month: 'Jun', value: 75 },
                { month: 'Jul', value: 100 }
              ].map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar cursor-pointer">
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-md relative overflow-hidden transition-all duration-300" style={{ height: '100px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-indigo-400 rounded-md transition-all duration-500 opacity-90 group-hover/bar:opacity-100 group-hover/bar:from-blue-500 group-hover/bar:to-indigo-300"
                      style={{ height: `${data.value}%` }}
                    ></div>
                    <div className="absolute opacity-0 group-hover/bar:opacity-100 -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-black px-2 py-1 rounded shadow-xl transition-all duration-200 pointer-events-none z-10 whitespace-nowrap transform scale-95 group-hover/bar:scale-100">
                      {data.value}k
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-900 dark:bg-white rotate-45"></div>
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest transition-colors group-hover/bar:text-blue-600 dark:group-hover/bar:text-blue-400">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visitor Traffic Chart Box */}
          <div className="p-5 md:p-6 rounded-[1.5rem] bg-white/70 dark:bg-gray-900/60 backdrop-blur-3xl border border-white/40 dark:border-gray-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:border-gray-200/50 dark:hover:border-gray-700/50 transition-all duration-500">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">
                Visitor Traffic
              </h3>
              <span className="text-[9px] md:text-[10px] px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold rounded-md uppercase tracking-wider">
                Monthly Trend
              </span>
            </div>
            
            <div className="relative h-32 flex items-end justify-between gap-1.5 sm:gap-2 mt-2">
              {[
                { month: 'Jan', value: 1.2 },
                { month: 'Feb', value: 1.8 },
                { month: 'Mar', value: 1.5 },
                { month: 'Apr', value: 2.1 },
                { month: 'May', value: 2.4 },
                { month: 'Jun', value: 2.0 },
                { month: 'Jul', value: 2.8 }
              ].map((data, i) => (
                <div key={`vis-${i}`} className="flex-1 flex flex-col items-center gap-2 group/bar cursor-pointer">
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-md relative overflow-hidden transition-all duration-300" style={{ height: '100px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-md transition-all duration-500 opacity-90 group-hover/bar:opacity-100 group-hover/bar:from-emerald-500 group-hover/bar:to-teal-300"
                      style={{ height: `${(data.value / 3) * 100}%` }}
                    ></div>
                    <div className="absolute opacity-0 group-hover/bar:opacity-100 -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-black px-2 py-1 rounded shadow-xl transition-all duration-200 pointer-events-none z-10 whitespace-nowrap transform scale-95 group-hover/bar:scale-100">
                      {data.value}k
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-900 dark:bg-white rotate-45"></div>
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest transition-colors group-hover/bar:text-emerald-600 dark:group-hover/bar:text-emerald-400">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recent Activity Section */}
          <div className="lg:col-span-2 p-6 rounded-[1.5rem] bg-white/70 dark:bg-gray-900/60 backdrop-blur-3xl border border-white/40 dark:border-gray-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400"><LuActivity size={18} /></div>
                Recent Activity
              </h3>
              <button className="px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors ring-1 ring-gray-200 dark:ring-gray-700">
                View All Logs
              </button>
            </div>

            <div className="relative before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-gradient-to-b before:from-gray-200 before:via-gray-200 before:to-transparent dark:before:from-gray-700 dark:before:via-gray-700">
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 group">
                    <div className="relative mt-1 flex shrink-0 items-center justify-center w-[30px] h-[30px] rounded-full bg-white dark:bg-gray-900 ring-4 ring-white dark:ring-gray-900 z-10 transition-transform duration-300 group-hover:scale-110">
                      <div className={`w-2.5 h-2.5 rounded-full bg-${activity.status === 'success' ? 'emerald' : activity.status === 'info' ? 'blue' : activity.status === 'warning' ? 'amber' : 'gray'}-500 shadow-[0_0_8px_rgba(var(--tw-colors-${activity.status === 'success' ? 'emerald' : activity.status === 'info' ? 'blue' : activity.status === 'warning' ? 'amber' : 'gray'}-500),0.6)]`}></div>
                    </div>
                    
                    <div className="flex-1 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800/60 ring-1 ring-gray-100 dark:ring-gray-700/50 hover:ring-gray-200 dark:hover:ring-gray-600 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <p className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 leading-tight">
                          {activity.text}
                        </p>
                        <div className="flex shrink-0 items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          <LuCalendar size={11} className="opacity-70" /> {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Partners Stat Box */}
          <div className="relative p-6 rounded-[1.5rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 overflow-hidden shadow-2xl shadow-purple-500/20 group hover:shadow-purple-500/30 transition-shadow duration-500 flex flex-col justify-between h-full min-h-[220px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:translate-x-1/3 transition-transform duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 group-hover:-translate-x-1/4 transition-transform duration-1000"></div>
            
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md shadow-inner border border-white/20 text-white">
                  <LuUsers size={24} />
                </div>
                <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black tracking-widest text-[9px] uppercase rounded-full shadow-sm">
                  Global Network
                </span>
              </div>
            </div>

            <div className="relative z-10 pt-4 mt-auto">
              <h4 className="text-purple-100 text-[11px] font-bold uppercase tracking-widest mb-1.5 opacity-90">Active Partners</h4>
              <div className="flex flex-row items-baseline gap-2.5 mb-4">
                <span className="text-4xl font-black text-white shrink-0 drop-shadow-sm">48</span>
                <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/30 flex items-center gap-1 backdrop-blur-sm self-center">
                  <LuArrowUpRight size={12} /> +5 added
                </span>
              </div>
              
              {/* Partner Badges */}
              <div className="flex flex-wrap gap-1.5">
                {['UNICEF', 'Red Crescent', 'WHO', 'Save the Children', '+44 more'].map(partner => (
                  <span key={partner} className="px-2 py-1 text-[9px] font-bold text-white bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all rounded-md backdrop-blur-md drop-shadow-sm cursor-default">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
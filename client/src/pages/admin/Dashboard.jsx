// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router-dom';
// import { getDashboardStats, getCandidates } from '../../services/api';
// import {
//   Users,
//   Clock,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   Search,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   TrendingUp,
// } from 'lucide-react';

// const statusConfig = {
//   Pending: { color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', dot: 'bg-amber-400' },
//   'Interview Scheduled': { color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: 'bg-blue-400' },
//   Selected: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400' },
//   Rejected: { color: 'bg-red-500/10 text-red-400 border-red-500/20', dot: 'bg-red-400' },
// };

// const Dashboard = () => {
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   // Dashboard stats
//   const { data: stats } = useQuery({
//     queryKey: ['dashboardStats'],
//     queryFn: () => getDashboardStats().then(res => res.data),
//   });

//   // Candidates list
//   const { data: candidatesData, isLoading } = useQuery({
//     queryKey: ['candidates', page, search, statusFilter],
//     queryFn: () => getCandidates({ page, limit, search, status: statusFilter }).then(res => res.data),
//   });

//   const statCards = [
//     { label: 'Total Applications', value: stats?.total || 0, icon: Users },
//     { label: 'Pending Review', value: stats?.pending || 0, icon: Clock },
//     { label: 'Interviews Scheduled', value: stats?.interviewScheduled || 0, icon: Calendar },
//     { label: 'Selected Candidates', value: stats?.selected || 0, icon: CheckCircle },
//     { label: 'Rejected Candidates', value: stats?.rejected || 0, icon: XCircle },
//   ];

//   const formatDate = (dateStr) => {
//     return new Date(dateStr).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   };

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-xl font-bold tracking-tight text-white">Dashboard</h1>
//           <p className="text-slate-500 text-xs mt-0.5">Overview of recruitment activities</p>
//         </div>
//         <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-900">
//           <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
//           <span className="text-slate-200 text-xs font-semibold uppercase tracking-wider">{stats?.total || 0} Total</span>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
//         {statCards.map((card, i) => (
//           <div
//             key={i}
//             className="relative overflow-hidden rounded-lg bg-slate-900 border border-slate-900 p-5 
//               hover:border-slate-800 transition-smooth group"
//           >
//             <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 
//               flex items-center justify-center mb-3 text-slate-300 transition-smooth">
//               <card.icon className="w-4 h-4" />
//             </div>
//             <p className="text-2xl font-bold tracking-tight text-white">{card.value}</p>
//             <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1">{card.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* Candidates Table */}
//       <div className="bg-slate-900 border border-slate-900 rounded-lg overflow-hidden">
//         {/* Table Header */}
//         <div className="p-5 border-b border-slate-950 bg-slate-950/20">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-250">All Candidates</h2>
//             <div className="flex items-center gap-3 w-full sm:w-auto">
//               {/* Search */}
//               <div className="relative flex-1 sm:flex-initial">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//                 <input
//                   type="text"
//                   placeholder="Search candidates..."
//                   value={search}
//                   onChange={(e) => { setSearch(e.target.value); setPage(1); }}
//                   className="w-full sm:w-60 pl-10 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-slate-500 transition-smooth text-sm"
//                 />
//               </div>
//               {/* Status Filter */}
//               <div className="relative">
//                 <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
//                   className="pl-10 pr-8 py-2 rounded-lg bg-slate-950 border border-slate-800 
//                     text-white text-sm focus:border-slate-500 transition-smooth cursor-pointer"
//                 >
//                   <option value="">All Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Interview Scheduled">Interview Scheduled</option>
//                   <option value="Selected">Selected</option>
//                   <option value="Rejected">Rejected</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-slate-950 bg-slate-950/10">
//                 <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Candidate</th>
//                 <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Position</th>
//                 <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
//                 <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
//                 <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Applied</th>
//                 <th className="text-center px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 Array.from({ length: 5 }).map((_, i) => (
//                   <tr key={i} className="border-b border-slate-950/50">
//                     {Array.from({ length: 6 }).map((_, j) => (
//                       <td key={j} className="px-5 py-4">
//                         <div className="h-4 bg-slate-950 rounded animate-pulse" />
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               ) : candidatesData?.candidates?.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="text-center py-16 text-slate-500">
//                     <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
//                     <p className="font-semibold text-sm uppercase tracking-wider">No candidates found</p>
//                     <p className="text-xs mt-1 text-slate-600">Submitted profiles will appear here</p>
//                   </td>
//                 </tr>
//               ) : (
//                 candidatesData?.candidates?.map((candidate) => (
//                   <tr key={candidate._id} className="border-b border-slate-950/40 hover:bg-slate-950/20 transition-smooth">
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 
//                           flex items-center justify-center shrink-0">
//                           <span className="text-slate-300 font-bold text-xs uppercase">
//                             {candidate.fullName?.charAt(0)}
//                           </span>
//                         </div>
//                         <div>
//                           <p className="text-white font-semibold text-sm leading-normal">{candidate.fullName}</p>
//                           <p className="text-slate-500 text-xs leading-normal">{candidate.email}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span className="text-slate-300 text-sm">{candidate.position}</span>
//                     </td>
//                     <td className="px-5 py-4 hidden md:table-cell">
//                       <span className="text-slate-400 text-sm">{candidate.phone}</span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border uppercase tracking-wider
//                         ${statusConfig[candidate.status]?.color}`}>
//                         <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[candidate.status]?.dot}`} />
//                         {candidate.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 hidden lg:table-cell">
//                       <span className="text-slate-400 text-sm">{formatDate(candidate.createdAt)}</span>
//                     </td>
//                     <td className="px-5 py-4 text-center">
//                       <Link
//                         to={`/admin/candidates/${candidate._id}`}
//                         className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-smooth text-xs font-semibold uppercase tracking-wider"
//                       >
//                         <Eye className="w-3.5 h-3.5" />
//                         View
//                       </Link>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {candidatesData?.totalPages > 1 && (
//           <div className="flex items-center justify-between px-5 py-4 border-t border-slate-950 bg-slate-950/10">
//             <p className="text-slate-500 text-xs font-medium">
//               Page {candidatesData.currentPage} of {candidatesData.totalPages} • {candidatesData.total} candidates
//             </p>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setPage(p => Math.max(1, p - 1))}
//                 disabled={page === 1}
//                 className="p-2 rounded bg-slate-955 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 
//                   transition-smooth disabled:opacity-30 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//               {Array.from({ length: Math.min(5, candidatesData.totalPages) }, (_, i) => {
//                 const pageNum = i + 1;
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => setPage(pageNum)}
//                     className={`w-8 h-8 rounded text-xs font-semibold transition-smooth
//                       ${page === pageNum
//                         ? 'bg-slate-100 text-slate-950'
//                         : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800'
//                       }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
//               <button
//                 onClick={() => setPage(p => Math.min(candidatesData.totalPages, p + 1))}
//                 disabled={page === candidatesData.totalPages}
//                 className="p-2 rounded bg-slate-955 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 
//                   transition-smooth disabled:opacity-30 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getDashboardStats, getCandidates } from '../../services/api';
import {
  Users,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  TrendingUp,
} from 'lucide-react';

const statusConfig = {
  Pending: { color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  'Interview Scheduled': { color: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  Selected: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  Rejected: { color: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
};

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: stats } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => getDashboardStats().then(res => res.data),
  });

  const { data: candidatesData, isLoading } = useQuery({
    queryKey: ['candidates', page, search, statusFilter],
    queryFn: () => getCandidates({ page, limit, search, status: statusFilter }).then(res => res.data),
  });

  const statCards = [
    { label: 'Total Applications', value: stats?.total || 0, icon: Users, color: 'text-gray-700' },
    { label: 'Pending Review', value: stats?.pending || 0, icon: Clock, color: 'text-amber-600' },
    { label: 'Interviews Scheduled', value: stats?.interviewScheduled || 0, icon: Calendar, color: 'text-blue-600' },
    { label: 'Selected Candidates', value: stats?.selected || 0, icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Rejected Candidates', value: stats?.rejected || 0, icon: XCircle, color: 'text-red-600' },
  ];

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-400 text-xs mt-0.5">Recruitment overview</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-sm">
          <TrendingUp className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-gray-700 text-xs font-medium">{stats?.total || 0} Total</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-white/80 rounded-xl border border-gray-200/60 p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center mb-2">
              <card.icon className={`w-3.5 h-3.5 ${card.color}`} />
            </div>
            <p className="text-xl font-bold text-gray-800">{card.value}</p>
            <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wide mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Candidates Table */}
      <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">All Candidates</h2>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full sm:w-48 pl-8 pr-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all text-xs"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                  className="pl-8 pr-6 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-xs focus:border-gray-400 focus:ring-1 focus:ring-gray-400 cursor-pointer"
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/30">
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Applied</th>
                <th className="text-center px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-3 bg-gray-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : candidatesData?.candidates?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="font-medium text-xs">No candidates found</p>
                    <p className="text-[10px] mt-0.5">Submitted profiles will appear here</p>
                  </td>
                </tr>
              ) : (
                candidatesData?.candidates?.map((candidate) => (
                  <tr key={candidate._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                          <span className="text-gray-600 font-semibold text-[10px] uppercase">
                            {candidate.fullName?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-gray-800 font-medium text-sm leading-tight">{candidate.fullName}</p>
                          <p className="text-gray-400 text-[10px] leading-tight">{candidate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600 text-xs">{candidate.position}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-gray-500 text-xs">{candidate.phone}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-medium border
                        ${statusConfig[candidate.status]?.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[candidate.status]?.dot}`} />
                        {candidate.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-gray-500 text-xs">{formatDate(candidate.createdAt)}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        to={`/admin/candidates/${candidate._id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-gray-100 border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors text-[10px] font-medium"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {candidatesData?.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50/30">
            <p className="text-gray-500 text-[10px] font-medium">
              Page {candidatesData.currentPage} of {candidatesData.totalPages} • {candidatesData.total} candidates
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 
                  transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: Math.min(5, candidatesData.totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-7 h-7 rounded text-[10px] font-medium transition-colors
                      ${page === pageNum
                        ? 'bg-gray-800 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(p => Math.min(candidatesData.totalPages, p + 1))}
                disabled={page === candidatesData.totalPages}
                className="p-1.5 rounded bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 
                  transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
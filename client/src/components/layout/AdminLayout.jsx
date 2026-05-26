// import { useState } from 'react';
// import { Outlet, NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import {
//   LayoutDashboard,
//   LogOut,
//   Menu,
//   X,
//   Briefcase,
//   ChevronRight,
// } from 'lucide-react';

// const AdminLayout = () => {
//   const { admin, logout } = useAuth();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/admin/login');
//   };

//   const navItems = [
//     { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
//   ];

//   return (
//     <div className="flex h-screen bg-slate-950 text-slate-100">
//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-905 border-r border-slate-900 
//           transform transition-transform duration-300 ease-in-out
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
//       >
//         {/* Logo */}
//         <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-900 bg-slate-950/30">
//           <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
//             <Briefcase className="w-4 h-4 text-slate-350" />
//           </div>
//           <div>
//             <h1 className="text-white font-bold text-sm leading-tight tracking-tight">HR Portal</h1>
//             <p className="text-slate-550 text-[10px] uppercase tracking-wider font-semibold">Recruitment System</p>
//           </div>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden ml-auto text-slate-400 hover:text-white"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Nav Links */}
//         <nav className="p-4 space-y-1">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               onClick={() => setSidebarOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-smooth border
//                 ${isActive
//                   ? 'bg-slate-950 text-white border-slate-850 shadow-sm'
//                   : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-950/30'
//                 }`
//               }
//             >
//               <item.icon className="w-4 h-4" />
//               {item.label}
//               <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />
//             </NavLink>
//           ))}
//         </nav>

//         {/* Admin Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-900 bg-slate-950/10">
//           <div className="flex items-center gap-3 px-3 py-2 mb-2">
//             <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
//               <span className="text-slate-200 font-semibold text-xs">
//                 {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
//               </span>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-white text-xs font-semibold truncate leading-normal">{admin?.name || 'Admin'}</p>
//               <p className="text-slate-550 text-[10px] truncate leading-normal">{admin?.email}</p>
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-smooth uppercase tracking-wider"
//           >
//             <LogOut className="w-3.5 h-3.5" />
//             Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Bar */}
//         <header className="h-16 flex items-center justify-between px-6 bg-slate-900/20 border-b border-slate-900 backdrop-blur-sm">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="lg:hidden text-slate-450 hover:text-white"
//           >
//             <Menu className="w-5 h-5" />
//           </button>
//           <div className="hidden lg:block" />
//           <div className="flex items-center gap-4">
//             <span className="text-slate-450 text-xs font-semibold uppercase tracking-wider">
//               Welcome, <span className="text-white">{admin?.name}</span>
//             </span>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto bg-slate-950 p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, LogOut, Menu, X, Briefcase, ChevronRight } from 'lucide-react';

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center gap-2.5 px-5 border-b border-gray-200 bg-white">
          <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
            <Briefcase className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h1 className="text-gray-800 font-bold text-sm tracking-tight">HR Portal</h1>
            <p className="text-gray-400 text-[9px] uppercase tracking-wider font-medium">Recruitment System</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-40" />
            </NavLink>
          ))}
        </nav>

        {/* Admin Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2.5 px-2 py-1.5 mb-2">
            <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
              <span className="text-gray-700 font-semibold text-[10px] uppercase">
                {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 text-xs font-medium truncate">{admin?.name || 'Admin'}</p>
              <p className="text-gray-400 text-[9px] truncate">{admin?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-[10px] font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 flex items-center px-5 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">
              Welcome, <span className="text-gray-700">{admin?.name?.split(' ')[0] || 'Admin'}</span>
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
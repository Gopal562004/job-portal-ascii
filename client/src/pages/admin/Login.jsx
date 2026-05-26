// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { adminLogin } from '../../services/api';
// import toast from 'react-hot-toast';
// import { Briefcase, Mail, Lock, LogIn, Loader2, Eye, EyeOff } from 'lucide-react';

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await adminLogin(formData);
//       login(res.data.token, res.data.admin);
//       toast.success('Login successful!');
//       navigate('/admin/dashboard');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
//       <div className="relative z-10 w-full max-w-md">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 shadow-sm">
//             <Briefcase className="w-6 h-6 text-slate-200" />
//           </div>
//           <h1 className="text-xl font-bold tracking-tight text-white">HR Admin Portal</h1>
//           <p className="text-slate-500 text-xs mt-1">Sign in to manage candidate applications</p>
//         </div>

//         {/* Login Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-slate-900 border border-slate-900 rounded-lg p-8 shadow-sm"
//         >
//           <div className="space-y-5">
//             <div>
//               <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   placeholder="admin@company.com"
//                   required
//                   className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white 
//                     placeholder-slate-500 focus:border-slate-500 transition-smooth text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex justify-between items-center mb-1.5">
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
//                 <Link to="/admin/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300 transition-smooth hover:underline">
//                   Forgot Password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   placeholder="Enter your password"
//                   required
//                   className="w-full pl-11 pr-11 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white 
//                     placeholder-slate-500 focus:border-slate-500 transition-smooth text-sm"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-smooth"
//                 >
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-white text-slate-950 font-semibold 
//                 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed
//                 flex items-center justify-center gap-2 border border-slate-200 shadow-sm"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Signing in...
//                 </>
//               ) : (
//                 <>
//                   <LogIn className="w-4 h-4" />
//                   Sign In
//                 </>
//               )}
//             </button>
//           </div>
//         </form>

//         <p className="text-center text-slate-600 text-xs mt-6 tracking-wide uppercase">
//           Authorized personnel only
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminLogin } from '../../services/api';
import toast from 'react-hot-toast';
import { Briefcase, Mail, Lock, LogIn, Loader2, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await adminLogin(formData);
      login(res.data.token, res.data.admin);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4" style={{ background: '#f3f4f6' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        {/* <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/80 mb-8 -mt-6">
          <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center">
                <Briefcase className="w-3 text-white" />
              </div>
              <span className="font-medium text-xs text-gray-900">hire<span className="text-gray-400">base</span></span>
            </div>
          </div>
        </div> */}

        {/* Logo & Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-5 h-5 text-gray-700" />
          </div>
          <h1 className="text-lg font-bold text-gray-800">HR Admin Portal</h1>
          <p className="text-gray-400 text-xs mt-1">Sign in to manage candidates</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1 uppercase tracking-wide">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@company.com"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 
                    placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wide">Password</label>
                <Link to="/admin/forgot-password" className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-9 pr-9 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 
                    placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium 
                transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400 text-[10px] mt-5 tracking-wide">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
};

export default Login;
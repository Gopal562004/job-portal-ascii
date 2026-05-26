// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { forgotPassword, verifyOTP, resetPassword } from '../../services/api';
// import toast from 'react-hot-toast';
// import { 
//   Briefcase, 
//   Mail, 
//   Lock, 
//   Loader2, 
//   Eye, 
//   EyeOff, 
//   ArrowLeft, 
//   KeyRound, 
//   ShieldAlert, 
//   CheckCircle2 
// } from 'lucide-react';

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
  
//   // Form values
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   // Timer for OTP
//   const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

//   useEffect(() => {
//     if (step !== 2) return;
    
//     const intervalId = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(intervalId);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [step]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Step 1: Send OTP
//   const handleRequestOtp = async (e) => {
//     e.preventDefault();
//     if (!email) return toast.error('Please enter your email address');

//     setLoading(true);
//     try {
//       await forgotPassword({ email });
//       toast.success('OTP sent successfully to your email');
//       setTimeLeft(600); // Reset timer to 10 minutes
//       setStep(2);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Resend OTP helper
//   const handleResendOtp = async () => {
//     if (resendLoading) return;
//     setResendLoading(true);
//     try {
//       await forgotPassword({ email });
//       toast.success('A new OTP has been sent to your email');
//       setTimeLeft(600); // Reset timer
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to resend OTP.');
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     if (!otp) return toast.error('Please enter the 6-digit OTP code');
//     if (otp.length !== 6) return toast.error('OTP must be exactly 6 digits');

//     setLoading(true);
//     try {
//       await verifyOTP({ email, otp });
//       toast.success('OTP verified successfully!');
//       setStep(3);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Invalid or expired OTP.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 3: Reset Password
//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     if (!newPassword || !confirmPassword) return toast.error('Please fill in all fields');
//     if (newPassword.length < 6) return toast.error('Password must be at least 6 characters long');
//     if (newPassword !== confirmPassword) return toast.error('Passwords do not match');

//     setLoading(true);
//     try {
//       await resetPassword({ email, otp, newPassword });
//       toast.success('Password reset successful! Redirecting to login...');
//       setTimeout(() => {
//         navigate('/admin/login');
//       }, 2500);
//       setStep(4); // Success view
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to reset password. Please restart the process.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper for password strength indication
//   const getPasswordStrength = () => {
//     if (!newPassword) return null;
//     let score = 0;
//     if (newPassword.length >= 8) score++;
//     if (/[A-Z]/.test(newPassword)) score++;
//     if (/[0-9]/.test(newPassword)) score++;
//     if (/[^A-Za-z0-9]/.test(newPassword)) score++;

//     switch (score) {
//       case 0:
//       case 1:
//         return { label: 'Weak', color: 'bg-red-500' };
//       case 2:
//         return { label: 'Fair', color: 'bg-amber-500' };
//       case 3:
//         return { label: 'Good', color: 'bg-indigo-500' };
//       case 4:
//         return { label: 'Strong', color: 'bg-emerald-500' };
//       default:
//         return { label: 'Weak', color: 'bg-red-500' };
//     }
//   };

//   const passwordStrength = getPasswordStrength();

//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
//       {/* Decorative Blur Elements */}
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse duration-[6s]"></div>
//       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse duration-[8s]"></div>

//       <div className="relative z-10 w-full max-w-md">
        
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 shadow-md transition-all duration-300 hover:scale-105">
//             <Briefcase className="w-6 h-6 text-indigo-400" />
//           </div>
//           <h1 className="text-xl font-bold tracking-tight text-white">HR Admin Portal</h1>
//           <p className="text-slate-500 text-xs mt-1">Forgot Password & OTP Recovery</p>
//         </div>

//         {/* Step 1: Request OTP */}
//         {step === 1 && (
//           <div className="bg-slate-900 border border-slate-800/60 rounded-xl p-8 shadow-xl transition-all duration-500">
//             <div className="flex items-center gap-2 mb-6">
//               <Link to="/admin/login" className="text-slate-400 hover:text-white transition-colors">
//                 <ArrowLeft className="w-5 h-5" />
//               </Link>
//               <h2 className="text-md font-semibold text-white">Reset Password</h2>
//             </div>
            
//             <p className="text-xs text-slate-400 mb-6 leading-relaxed">
//               Enter your registered administrator email address below. We'll send you a 6-digit One-Time Password (OTP) to verify your identity.
//             </p>

//             <form onSubmit={handleRequestOtp} className="space-y-5">
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="admin@company.com"
//                     required
//                     className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white 
//                       placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 text-sm"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold 
//                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
//                   flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-[0.99]"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Sending OTP...
//                   </>
//                 ) : (
//                   <>
//                     <KeyRound className="w-4 h-4" />
//                     Send Verification OTP
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Step 2: Verify OTP */}
//         {step === 2 && (
//           <div className="bg-slate-900 border border-slate-800/60 rounded-xl p-8 shadow-xl transition-all duration-500">
//             <div className="flex items-center gap-2 mb-6">
//               <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white transition-colors">
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//               <h2 className="text-md font-semibold text-white">Enter OTP Verification</h2>
//             </div>
            
//             <p className="text-xs text-slate-400 mb-6 leading-relaxed">
//               We've dispatched a secure 6-digit verification code to <strong className="text-indigo-300">{email}</strong>. It will expire in 10 minutes.
//             </p>

//             <form onSubmit={handleVerifyOtp} className="space-y-5">
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 text-center">6-Digit Verification Code</label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     maxLength={6}
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
//                     placeholder="1 2 3 4 5 6"
//                     required
//                     className="w-full tracking-[0.5em] text-center font-bold text-lg py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white 
//                       placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200"
//                   />
//                 </div>
//               </div>

//               {/* Timer & Resend */}
//               <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
//                 <span>Code expires in: <strong className="text-indigo-400 font-mono">{formatTime(timeLeft)}</strong></span>
//                 {timeLeft === 0 ? (
//                   <button
//                     type="button"
//                     onClick={handleResendOtp}
//                     disabled={resendLoading}
//                     className="text-indigo-400 hover:text-indigo-300 font-semibold underline disabled:opacity-50"
//                   >
//                     {resendLoading ? 'Resending...' : 'Resend OTP'}
//                   </button>
//                 ) : (
//                   <span className="text-slate-600 cursor-not-allowed">Resend OTP</span>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading || timeLeft === 0}
//                 className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold 
//                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
//                   flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-[0.99]"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Verifying OTP...
//                   </>
//                 ) : (
//                   <>
//                     Verify & Proceed
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Step 3: Reset Password */}
//         {step === 3 && (
//           <div className="bg-slate-900 border border-slate-800/60 rounded-xl p-8 shadow-xl transition-all duration-500">
//             <h2 className="text-md font-semibold text-white mb-6">Create New Password</h2>
            
//             <p className="text-xs text-slate-400 mb-6 leading-relaxed">
//               Verify your identity and type your new secure password below. Make sure it is at least 6 characters long and complex enough to keep your account safe.
//             </p>

//             <form onSubmit={handleResetPassword} className="space-y-5">
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">New Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     placeholder="••••••••"
//                     required
//                     className="w-full pl-11 pr-11 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white 
//                       placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 text-sm"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
//                   >
//                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>

//                 {/* Password Strength Indicator */}
//                 {passwordStrength && (
//                   <div className="mt-2.5 flex items-center justify-between gap-2">
//                     <div className="flex-1 h-1 bg-slate-950 rounded-full overflow-hidden flex gap-0.5">
//                       <div className={`h-full flex-1 ${passwordStrength.color}`}></div>
//                       <div className={`h-full flex-1 ${newPassword.length >= 8 ? passwordStrength.color : 'bg-slate-800'}`}></div>
//                       <div className={`h-full flex-1 ${/[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? passwordStrength.color : 'bg-slate-800'}`}></div>
//                     </div>
//                     <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
//                       {passwordStrength.label}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Confirm Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="••••••••"
//                     required
//                     className="w-full pl-11 pr-11 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white 
//                       placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all duration-200 text-sm"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold 
//                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
//                   flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-[0.99]"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Resetting password...
//                   </>
//                 ) : (
//                   <>
//                     Confirm & Update Password
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Step 4: Success View */}
//         {step === 4 && (
//           <div className="bg-slate-900 border border-slate-800/60 rounded-xl p-8 shadow-xl text-center transition-all duration-500">
//             <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 shadow-sm">
//               <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
//             </div>
            
//             <h2 className="text-lg font-bold text-white mb-2">Password Updated!</h2>
//             <p className="text-xs text-slate-400 mb-6 leading-relaxed px-4">
//               Your password has been reset successfully. You will be automatically redirected to the login portal.
//             </p>

//             <Link
//               to="/admin/login"
//               className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Return to Login manually
//             </Link>
//           </div>
//         )}

//         {/* Support note */}
//         <p className="text-center text-slate-600 text-xs mt-6 tracking-wide uppercase">
//           Authorized Admin Personnel Only
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPassword, verifyOTP, resetPassword } from '../../services/api';
import toast from 'react-hot-toast';
import { 
  Briefcase, Mail, Lock, Loader2, Eye, EyeOff, ArrowLeft, KeyRound, CheckCircle2 
} from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (step !== 2) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(intervalId); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [step]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    setLoading(true);
    try {
      await forgotPassword({ email });
      toast.success('OTP sent to your email');
      setTimeLeft(600);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendLoading) return;
    setResendLoading(true);
    try {
      await forgotPassword({ email });
      toast.success('New OTP sent');
      setTimeLeft(600);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return toast.error('Enter valid 6-digit OTP');
    setLoading(true);
    try {
      await verifyOTP({ email, otp });
      toast.success('OTP verified!');
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await resetPassword({ email, otp, newPassword });
      toast.success('Password reset successful!');
      setTimeout(() => navigate('/admin/login'), 2000);
      setStep(4);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4" style={{ background: '#f3f4f6' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/80 mb-8 -mt-6">
          <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center">
                <Briefcase className="w-3 text-white" />
              </div>
              <span className="font-medium text-xs text-gray-900">hire<span className="text-gray-400">base</span></span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mx-auto mb-3">
            <KeyRound className="w-5 h-5 text-gray-700" />
          </div>
          <h1 className="text-lg font-bold text-gray-800">Reset Password</h1>
          <p className="text-gray-400 text-xs mt-1">Recover your admin account</p>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-6">
            <p className="text-xs text-gray-500 mb-5">Enter your registered email to receive a verification code.</p>
            <form onSubmit={handleRequestOtp}>
              <div className="mb-4">
                <label className="block text-[10px] font-medium text-gray-500 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@company.com" required
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-400" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition-all flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending...</> : <>Send OTP</>}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-6">
            <p className="text-xs text-gray-500 mb-4">Enter the 6-digit code sent to <strong className="text-gray-700">{email}</strong></p>
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-3">
                <label className="block text-[10px] font-medium text-gray-500 mb-1 text-center">Verification Code</label>
                <input type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="123456" className="w-full tracking-[0.3em] text-center font-mono text-lg py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 focus:border-gray-400 focus:ring-1 focus:ring-gray-400" />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Expires in: <strong className="text-gray-700">{formatTime(timeLeft)}</strong></span>
                {timeLeft === 0 ? (
                  <button type="button" onClick={handleResendOtp} disabled={resendLoading} className="text-gray-600 hover:text-gray-800 underline">
                    {resendLoading ? 'Sending...' : 'Resend'}
                  </button>
                ) : <span className="text-gray-300">Resend</span>}
              </div>
              <button type="submit" disabled={loading || timeLeft === 0}
                className="w-full py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition-all">
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto" /> : 'Verify & Continue'}
              </button>
            </form>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-6">
            <p className="text-xs text-gray-500 mb-4">Create a new secure password for your account.</p>
            <form onSubmit={handleResetPassword}>
              <div className="mb-3">
                <label className="block text-[10px] font-medium text-gray-500 mb-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input type={showPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required
                    className="w-full pl-9 pr-9 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[10px] font-medium text-gray-500 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                    className="w-full pl-9 pr-9 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition-all">
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto" /> : 'Reset Password'}
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-500" />
            </div>
            <h2 className="text-base font-bold text-gray-800 mb-1">Password Updated!</h2>
            <p className="text-xs text-gray-500 mb-4">Redirecting to login...</p>
            <Link to="/admin/login" className="text-gray-500 hover:text-gray-700 text-xs font-medium">Return to Login</Link>
          </div>
        )}

        <p className="text-center text-gray-400 text-[9px] mt-5">Authorized Admin Personnel Only</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
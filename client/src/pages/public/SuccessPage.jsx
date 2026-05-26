// import { Link } from 'react-router-dom';
// import { CheckCircle, ArrowLeft, Briefcase, Mail, Clock } from 'lucide-react';

// const SuccessPage = () => {
//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
//       <div className="max-w-lg w-full text-center">
//         {/* Success Icon */}
//         <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/30
//           flex items-center justify-center mx-auto mb-8 animate-fade-in-up shadow-sm">
//           <CheckCircle className="w-8 h-8 text-emerald-400" />
//         </div>

//         <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3 animate-fade-in-up delay-100">
//           Application Submitted
//         </h1>

//         <p className="text-slate-400 text-base mb-8 animate-fade-in-up delay-200">
//           Thank you for applying. Your profile has been received and is being processed by our recruiting team.
//         </p>

//         {/* What's Next */}
//         <div className="bg-slate-900 border border-slate-900 rounded-lg p-6 mb-8 text-left animate-fade-in-up delay-300">
//           <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">What happens next?</h3>
//           <div className="space-y-4">
//             <div className="flex items-start gap-3">
//               <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
//                 <Mail className="w-4 h-4 text-slate-400" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-white text-sm font-semibold">HR Review</p>
//                 <p className="text-slate-400 text-xs mt-0.5 leading-relaxed text-justify">Our recruitment specialists will evaluate your educational credentials and work experience against the job criteria.</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
//                 <Clock className="w-4 h-4 text-slate-400" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-white text-sm font-semibold">Interview Scheduling</p>
//                 <p className="text-slate-400 text-xs mt-0.5 leading-relaxed text-justify">If your profile is shortlisted, you will receive an automatic email invitation to schedule a video interview session.</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
//                 <Briefcase className="w-4 h-4 text-slate-400" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-white text-sm font-semibold">Offer Selection</p>
//                 <p className="text-slate-400 text-xs mt-0.5 leading-relaxed text-justify">Following a successful evaluation, an official offer letter and onboarding materials will be sent to your registered email.</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Link
//           to="/"
//           className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 
//             text-slate-300 hover:text-white text-sm font-semibold uppercase tracking-wider transition-smooth animate-fade-in-up delay-400"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back to Application
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Briefcase, Mail, Clock, Sparkles, Users, FileCheck } from 'lucide-react';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-100" style={{ background: '#f3f4f6' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center">
              <Briefcase className="w-3 text-white" />
            </div>
            <span className="font-medium text-xs text-gray-900">hire<span className="text-gray-400">base</span></span>
          </div>
          <Link to="/admin/login" className="text-gray-400 hover:text-gray-700 text-[11px] font-medium">Admin</Link>
        </div>
      </div>

      {/* Success Content */}
      <div className="flex items-center justify-center px-4 py-12 min-h-[calc(100vh-48px)]">
        <div className="max-w-lg w-full">
          {/* Success Card */}
          <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-6 text-center">
            {/* Success Icon */}
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-7 h-7 text-emerald-500" />
            </div>

            <h1 className="text-xl font-bold text-gray-800 mb-2">
              Application Submitted!
            </h1>
            
            <p className="text-gray-500 text-sm mb-6">
              Thank you for applying. Your profile has been received and is being reviewed by our recruiting team.
            </p>

            {/* What's Next - Compact */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left border border-gray-200">
              <h3 className="text-gray-700 font-semibold text-xs mb-3 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> What happens next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-xs font-medium">HR Review</p>
                    <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">Our team will evaluate your experience and qualifications.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-xs font-medium">Interview Invitation</p>
                    <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">Shortlisted candidates receive an email to schedule an interview.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    <FileCheck className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-xs font-medium">Final Offer</p>
                    <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">Successful candidates receive offer letter and onboarding details.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Application
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-center text-gray-400 text-[11px] mt-4">
            You'll receive a confirmation email shortly
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
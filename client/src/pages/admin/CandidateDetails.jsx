// import { useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { getCandidate, scheduleInterview, updateCandidateStatus, deleteCandidate } from '../../services/api';
// import toast from 'react-hot-toast';
// import {
//   ArrowLeft,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   GraduationCap,
//   Users,
//   Briefcase,
//   FileText,
//   MessageSquare,
//   Clock,
//   Video,
//   Link as LinkIcon,
//   CheckCircle,
//   XCircle,
//   Trash2,
//   Loader2,
//   Download,
//   X,
//   Eye,
//   Droplets,
//   Wrench,
//   DollarSign,
//   Building,
//   Timer,
// } from 'lucide-react';

// const statusConfig = {
//   Pending: { color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', dot: 'bg-amber-400' },
//   'Interview Scheduled': { color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: 'bg-blue-400' },
//   Selected: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400' },
//   Rejected: { color: 'bg-red-500/10 text-red-400 border-red-500/20', dot: 'bg-red-400' },
// };

// const CandidateDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const [showInterviewModal, setShowInterviewModal] = useState(false);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [showResumeModal, setShowResumeModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   const [interviewForm, setInterviewForm] = useState({
//     date: '',
//     time: '',
//     mode: 'Google Meet',
//     meetingLink: '',
//     description: '',
//   });
//   const [rejectionReason, setRejectionReason] = useState('');

//   // Fetch candidate
//   const { data: candidate, isLoading } = useQuery({
//     queryKey: ['candidate', id],
//     queryFn: () => getCandidate(id).then(res => res.data),
//   });

//   // Schedule interview mutation
//   const interviewMutation = useMutation({
//     mutationFn: (data) => scheduleInterview(id, data),
//     onSuccess: () => {
//       toast.success('Interview scheduled! Email sent to candidate.');
//       queryClient.invalidateQueries(['candidate', id]);
//       queryClient.invalidateQueries(['dashboardStats']);
//       queryClient.invalidateQueries(['candidates']);
//       setShowInterviewModal(false);
//     },
//     onError: (err) => toast.error(err.response?.data?.message || 'Failed to schedule interview'),
//   });

//   // Status update mutation
//   const statusMutation = useMutation({
//     mutationFn: (data) => updateCandidateStatus(id, data),
//     onSuccess: (_, variables) => {
//       toast.success(`Candidate ${variables.status.toLowerCase()}! Email sent.`);
//       queryClient.invalidateQueries(['candidate', id]);
//       queryClient.invalidateQueries(['dashboardStats']);
//       queryClient.invalidateQueries(['candidates']);
//       setShowRejectModal(false);
//     },
//     onError: (err) => toast.error(err.response?.data?.message || 'Failed to update status'),
//   });

//   // Delete mutation
//   const deleteMutation = useMutation({
//     mutationFn: () => deleteCandidate(id),
//     onSuccess: () => {
//       toast.success('Candidate deleted');
//       queryClient.invalidateQueries(['dashboardStats']);
//       queryClient.invalidateQueries(['candidates']);
//       navigate('/admin/dashboard');
//     },
//     onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete'),
//   });

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-20 bg-slate-950">
//         <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
//       </div>
//     );
//   }

//   if (!candidate) {
//     return (
//       <div className="text-center py-20 bg-slate-950">
//         <p className="text-slate-450 text-sm font-semibold uppercase tracking-wider">Candidate not found</p>
//         <Link to="/admin/dashboard" className="text-slate-300 hover:text-white mt-2 inline-block text-xs font-semibold uppercase tracking-wider border-b border-slate-600 hover:border-white">
//           Back to Dashboard
//         </Link>
//       </div>
//     );
//   }

//   const InfoItem = ({ icon: Icon, label, value }) => (
//     <div className="flex items-start gap-3">
//       <div className="w-7 h-7 rounded bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
//         <Icon className="w-3.5 h-3.5 text-slate-450" />
//       </div>
//       <div>
//         <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">{label}</p>
//         <p className="text-slate-200 text-sm font-semibold mt-0.5">{value || '—'}</p>
//       </div>
//     </div>
//   );

//   const formatDate = (dateStr) => {
//     if (!dateStr) return '—';
//     return new Date(dateStr).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric',
//     });
//   };

//   return (
//     <div className="space-y-6 animate-fade-in bg-slate-955 text-slate-100">
//       {/* Back + Header */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
//         <div className="flex items-center gap-3">
//           <Link
//             to="/admin/dashboard"
//             className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-smooth"
//           >
//             <ArrowLeft className="w-4 h-4" />
//           </Link>
//           <div>
//             <h1 className="text-lg font-bold text-white tracking-tight leading-normal">{candidate.fullName}</h1>
//             <p className="text-slate-500 text-xs font-medium leading-normal">{candidate.position}</p>
//           </div>
//           <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border uppercase tracking-wider ml-1
//             ${statusConfig[candidate.status]?.color}`}>
//             <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[candidate.status]?.dot}`} />
//             {candidate.status}
//           </span>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center gap-2 flex-wrap">
//           {candidate.status !== 'Selected' && candidate.status !== 'Rejected' && (
//             <>
//               <button
//                 onClick={() => setShowInterviewModal(true)}
//                 className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 hover:text-white transition-smooth text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
//               >
//                 <Calendar className="w-3.5 h-3.5" />
//                 Schedule Interview
//               </button>
//               <button
//                 onClick={() => statusMutation.mutate({ status: 'Selected' })}
//                 disabled={statusMutation.isPending}
//                 className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-white text-slate-955 transition-smooth text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
//               >
//                 <CheckCircle className="w-3.5 h-3.5" />
//                 Select
//               </button>
//               <button
//                 onClick={() => setShowRejectModal(true)}
//                 className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-red-950 hover:bg-red-950/20 text-red-400 transition-smooth text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
//               >
//                 <XCircle className="w-3.5 h-3.5" />
//                 Reject
//               </button>
//             </>
//           )}
//           <button
//             onClick={() => setShowDeleteConfirm(true)}
//             className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-red-400 hover:bg-red-950/20 transition-smooth"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Left Column - Details */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Personal Info */}
//           <div className="bg-slate-900 border border-slate-900 rounded-lg p-6">
//             <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
//               <User className="w-4 h-4 text-slate-400" /> Personal Information
//             </h3>
//             <div className="grid sm:grid-cols-2 gap-4">
//               <InfoItem icon={User} label="Full Name" value={candidate.fullName} />
//               <InfoItem icon={Mail} label="Email" value={candidate.email} />
//               <InfoItem icon={Phone} label="Phone" value={candidate.phone} />
//               <InfoItem icon={Briefcase} label="Position" value={candidate.position} />
//               <InfoItem icon={Droplets} label="Blood Group" value={candidate.bloodGroup} />
//               <InfoItem icon={Calendar} label="Date of Birth" value={formatDate(candidate.dateOfBirth)} />
//               <InfoItem icon={User} label="Gender" value={candidate.gender} />
//               <InfoItem icon={Calendar} label="Applied Date" value={formatDate(candidate.createdAt)} />
//             </div>
//           </div>

//           {/* Address */}
//           {candidate.address && (
//             <div className="bg-slate-900 border border-slate-900 rounded-lg p-6">
//               <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
//                 <MapPin className="w-4 h-4 text-slate-400" /> Address
//               </h3>
//               <div className="grid sm:grid-cols-2 gap-4">
//                 <InfoItem icon={MapPin} label="Address Line" value={candidate.address.addressLine} />
//                 <InfoItem icon={MapPin} label="City" value={candidate.address.city} />
//                 <InfoItem icon={MapPin} label="State" value={candidate.address.state} />
//                 <InfoItem icon={MapPin} label="Pincode" value={candidate.address.pincode} />
//               </div>
//             </div>
//           )}

//           {/* Education */}
//           {candidate.education?.length > 0 && (
//             <div className="bg-slate-900 border border-slate-900 rounded-lg p-6">
//               <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
//                 <GraduationCap className="w-4 h-4 text-slate-400" /> Education
//               </h3>
//               <div className="space-y-3">
//                 {candidate.education.map((edu, i) => (
//                   <div key={i} className="p-4 rounded bg-slate-950 border border-slate-900">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <p className="text-white font-semibold text-sm leading-normal">{edu.degree}</p>
//                         <p className="text-slate-400 text-xs mt-0.5 leading-normal">{edu.college}</p>
//                         <p className="text-slate-500 text-[10px] leading-normal">{edu.university}</p>
//                       </div>
//                       <div className="text-right shrink-0">
//                         <p className="text-slate-300 text-xs font-semibold">{edu.percentage}</p>
//                         <p className="text-slate-500 text-[10px] mt-0.5">{edu.year}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Family */}
//           {candidate.familyMembers?.length > 0 && (
//             <div className="bg-slate-900 border border-slate-900 rounded-lg p-6">
//               <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
//                 <Users className="w-4 h-4 text-slate-400" /> Family Background
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-slate-950">
//                       <th className="text-left py-2 px-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Name</th>
//                       <th className="text-left py-2 px-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Relation</th>
//                       <th className="text-left py-2 px-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Occupation</th>
//                       <th className="text-left py-2 px-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Contact</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {candidate.familyMembers.map((member, i) => (
//                       <tr key={i} className="border-b border-slate-950/50 hover:bg-slate-950/10">
//                         <td className="py-2.5 px-3 text-white text-sm font-semibold">{member.name}</td>
//                         <td className="py-2.5 px-3 text-slate-350 text-xs">{member.relation}</td>
//                         <td className="py-2.5 px-3 text-slate-400 text-xs">{member.occupation}</td>
//                         <td className="py-2.5 px-3 text-slate-500 text-xs">{member.contactNumber}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* Description */}
//           {candidate.description && (
//             <div className="bg-slate-900 border border-slate-900 rounded-lg p-6">
//               <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
//                 <MessageSquare className="w-4 h-4 text-slate-400" /> Description / Candidate Statement
//               </h3>
//               <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap text-justify">{candidate.description}</p>
//             </div>
//           )}
//         </div>

//         {/* Right Column - Sidebar */}
//         <div className="space-y-6">
//           {/* Professional Info */}
//           <div className="bg-slate-900 border border-slate-900 rounded-lg p-6">
//             <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
//               <Wrench className="w-4 h-4 text-slate-400" /> Professional Overview
//             </h3>
//             <div className="space-y-4">
//               <InfoItem icon={Wrench} label="Skills" value={candidate.skills} />
//               <InfoItem icon={Clock} label="Experience" value={candidate.experience} />
//               <InfoItem icon={Building} label="Current Company" value={candidate.currentCompany} />
//               <InfoItem icon={DollarSign} label="Expected Salary" value={candidate.expectedSalary} />
//               <InfoItem icon={Timer} label="Notice Period" value={candidate.noticePeriod} />
//             </div>
//           </div>

//           {/* Resume */}
//           <div className="bg-slate-900 border border-slate-900 rounded-lg p-6">
//             <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
//               <FileText className="w-4 h-4 text-slate-400" /> Candidate Resume
//             </h3>
//             {candidate.resumeUrl ? (
//               <div className="space-y-3">
//                 <p className="text-slate-400 text-xs truncate font-medium">{candidate.resumeOriginalName || 'resume.pdf'}</p>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setShowResumeModal(true)}
//                     className="flex-1 px-3 py-1.5 rounded bg-slate-950 border border-slate-850 text-slate-300 hover:text-white hover:bg-slate-900 transition-smooth text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
//                   >
//                     <Eye className="w-3.5 h-3.5" />
//                     Preview
//                   </button>
//                   <a
//                     href={candidate.resumeUrl}
//                     download
//                     className="flex-1 px-3 py-1.5 rounded bg-slate-950 border border-slate-850 text-slate-300 hover:text-white hover:bg-slate-900 transition-smooth text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
//                   >
//                     <Download className="w-3.5 h-3.5" />
//                     Download
//                   </a>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-slate-550 text-xs font-semibold uppercase tracking-wider">No resume uploaded</p>
//             )}
//           </div>

//           {/* Interview Details */}
//           {candidate.interviewDetails && candidate.status === 'Interview Scheduled' && (
//             <div className="bg-slate-900 border border-blue-900/60 rounded-lg p-6">
//               <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
//                 <Video className="w-4 h-4 text-blue-400" /> Scheduled Interview
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2 text-xs font-semibold">
//                   <Calendar className="w-4 h-4 text-blue-400" />
//                   <span className="text-slate-300">{candidate.interviewDetails.date}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs font-semibold">
//                   <Clock className="w-4 h-4 text-blue-400" />
//                   <span className="text-slate-300">{candidate.interviewDetails.time}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs font-semibold">
//                   <Video className="w-4 h-4 text-blue-400" />
//                   <span className="text-slate-300">{candidate.interviewDetails.mode}</span>
//                 </div>
//                 {candidate.interviewDetails.meetingLink && (
//                   <div className="flex items-center gap-2 text-xs font-semibold">
//                     <LinkIcon className="w-4 h-4 text-blue-400" />
//                     <a href={candidate.interviewDetails.meetingLink} target="_blank" rel="noopener noreferrer"
//                       className="text-blue-400 hover:text-blue-300 truncate">{candidate.interviewDetails.meetingLink}</a>
//                   </div>
//                 )}
//                 {candidate.interviewDetails.description && (
//                   <p className="text-slate-400 text-xs mt-2 pt-2 border-t border-slate-950 leading-relaxed text-justify">
//                     {candidate.interviewDetails.description}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Rejection Reason */}
//           {candidate.status === 'Rejected' && candidate.rejectionReason && (
//             <div className="bg-slate-900 border border-red-900/40 rounded-lg p-6">
//               <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
//                 <XCircle className="w-4 h-4 text-red-400" /> Rejection Log
//               </h3>
//               <p className="text-slate-400 text-xs leading-relaxed text-justify">{candidate.rejectionReason}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ===== MODALS ===== */}

//       {/* Interview Schedule Modal */}
//       {showInterviewModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
//           <div className="bg-slate-900 border border-slate-950 rounded-lg w-full max-w-lg p-6 animate-fade-in-up">
//             <div className="flex items-center justify-between mb-6 border-b border-slate-950 pb-3">
//               <h3 className="text-sm font-bold uppercase tracking-wider text-white">Schedule Candidate Interview</h3>
//               <button onClick={() => setShowInterviewModal(false)} className="text-slate-400 hover:text-white transition-smooth">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Date</label>
//                   <input
//                     type="date"
//                     value={interviewForm.date}
//                     onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
//                     className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-slate-500 transition-smooth text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Time</label>
//                   <input
//                     type="time"
//                     value={interviewForm.time}
//                     onChange={(e) => setInterviewForm({ ...interviewForm, time: e.target.value })}
//                     className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-slate-500 transition-smooth text-sm"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Interview Mode</label>
//                 <select
//                   value={interviewForm.mode}
//                   onChange={(e) => setInterviewForm({ ...interviewForm, mode: e.target.value })}
//                   className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-slate-500 transition-smooth text-sm cursor-pointer"
//                 >
//                   <option value="Google Meet">Google Meet</option>
//                   <option value="Zoom">Zoom</option>
//                   <option value="Microsoft Teams">Microsoft Teams</option>
//                   <option value="In-Person">In-Person</option>
//                   <option value="Phone Call">Phone Call</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Meeting Link</label>
//                 <input
//                   type="url"
//                   value={interviewForm.meetingLink}
//                   onChange={(e) => setInterviewForm({ ...interviewForm, meetingLink: e.target.value })}
//                   placeholder="https://meet.google.com/..."
//                   className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-650 focus:border-slate-500 transition-smooth text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Instructions / Notes</label>
//                 <textarea
//                   value={interviewForm.description}
//                   onChange={(e) => setInterviewForm({ ...interviewForm, description: e.target.value })}
//                   rows={3}
//                   placeholder="Provide details or call parameters..."
//                   className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-650 focus:border-slate-500 transition-smooth text-sm resize-none"
//                 />
//               </div>
//               <div className="flex items-center gap-3 pt-3 border-t border-slate-950 mt-4">
//                 <button
//                   onClick={() => setShowInterviewModal(false)}
//                   className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-900 transition-smooth text-xs font-semibold uppercase tracking-wider"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => interviewMutation.mutate(interviewForm)}
//                   disabled={interviewMutation.isPending || !interviewForm.date || !interviewForm.time}
//                   className="flex-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-white text-slate-955 transition-smooth text-xs font-semibold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
//                 >
//                   {interviewMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Calendar className="w-3.5 h-3.5" />}
//                   Schedule
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Reject Modal */}
//       {showRejectModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
//           <div className="bg-slate-900 border border-slate-950 rounded-lg w-full max-w-md p-6 animate-fade-in-up">
//             <div className="flex items-center justify-between mb-4 border-b border-slate-950 pb-3">
//               <h3 className="text-sm font-bold uppercase tracking-wider text-white">Log Candidate Rejection</h3>
//               <button onClick={() => setShowRejectModal(false)} className="text-slate-400 hover:text-white transition-smooth">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//             <p className="text-slate-400 text-xs leading-relaxed mb-4 text-justify">
//               You are about to log candidate rejection for <strong className="text-white">{candidate.fullName}</strong>. An email update will be sent automatically.
//             </p>
//             <div className="mb-4">
//               <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Rejection Reason</label>
//               <textarea
//                 value={rejectionReason}
//                 onChange={(e) => setRejectionReason(e.target.value)}
//                 rows={3}
//                 placeholder="Log reason for candidate file..."
//                 className="w-full px-3.5 py-2.5 rounded-lg bg-slate-955 border border-slate-800 text-white placeholder-slate-650 focus:border-slate-550 transition-smooth text-sm resize-none"
//               />
//             </div>
//             <div className="flex items-center gap-3 pt-3 border-t border-slate-950">
//               <button
//                 onClick={() => setShowRejectModal(false)}
//                 className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-850 text-slate-450 hover:text-white hover:bg-slate-900 transition-smooth text-xs font-semibold uppercase tracking-wider"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => statusMutation.mutate({ status: 'Rejected', rejectionReason })}
//                 disabled={statusMutation.isPending}
//                 className="flex-1 px-3 py-2 rounded-lg bg-red-950 border border-red-900/40 text-red-400 hover:bg-red-900/20 transition-smooth text-xs font-semibold uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-1.5"
//               >
//                 {statusMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
//                 Reject
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirm Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
//           <div className="bg-slate-900 border border-slate-950 rounded-lg w-full max-w-sm p-6 animate-fade-in-up">
//             <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Delete Candidate File</h3>
//             <p className="text-slate-450 text-xs leading-relaxed mb-6 text-justify">
//               This action deletes all history and cannot be undone. Confirm removal of candidate profile.
//             </p>
//             <div className="flex items-center gap-3 pt-3 border-t border-slate-950">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-850 text-slate-450 hover:text-white hover:bg-slate-900 transition-smooth text-xs font-semibold uppercase tracking-wider"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => deleteMutation.mutate()}
//                 disabled={deleteMutation.isPending}
//                 className="flex-1 px-3 py-2 rounded-lg bg-red-950 border border-red-900/40 text-red-400 hover:bg-red-900/20 transition-smooth text-xs font-semibold uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-1.5"
//               >
//                 {deleteMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Resume Modal */}
//       {showResumeModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
//           <div className="bg-slate-900 border border-slate-950 rounded-lg w-full max-w-4xl h-[85vh] flex flex-col animate-fade-in-up">
//             <div className="flex items-center justify-between p-4 border-b border-slate-950 bg-slate-950/20">
//               <h3 className="text-white text-xs font-bold uppercase tracking-wider">{candidate.resumeOriginalName || 'resume.pdf'}</h3>
//               <div className="flex items-center gap-2">
//                 <a
//                   href={candidate.resumeUrl}
//                   download
//                   className="px-3 py-1.5 rounded bg-slate-950 border border-slate-850 text-slate-350 hover:text-white hover:bg-slate-900 transition-smooth text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
//                 >
//                   <Download className="w-3.5 h-3.5" />
//                   Download
//                 </a>
//                 <button onClick={() => setShowResumeModal(false)} className="text-slate-400 hover:text-white transition-smooth">
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1 p-4 bg-slate-950">
//               <iframe
//                 src={candidate.resumeUrl}
//                 className="w-full h-full rounded border border-slate-900"
//                 title="Resume Preview"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CandidateDetails;
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCandidate, scheduleInterview, updateCandidateStatus, deleteCandidate } from '../../services/api';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Users,
  Briefcase,
  FileText,
  MessageSquare,
  Clock,
  Video,
  Link as LinkIcon,
  CheckCircle,
  XCircle,
  Trash2,
  Loader2,
  Download,
  X,
  Eye,
  Droplets,
  Wrench,
  DollarSign,
  Building,
  Timer,
} from 'lucide-react';

const statusConfig = {
  Pending: { color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  'Interview Scheduled': { color: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  Selected: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  Rejected: { color: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
};

const CandidateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [interviewForm, setInterviewForm] = useState({
    date: '',
    time: '',
    mode: 'Google Meet',
    meetingLink: '',
    description: '',
  });
  const [rejectionReason, setRejectionReason] = useState('');

  const { data: candidate, isLoading } = useQuery({
    queryKey: ['candidate', id],
    queryFn: () => getCandidate(id).then(res => res.data),
  });

  const interviewMutation = useMutation({
    mutationFn: (data) => scheduleInterview(id, data),
    onSuccess: () => {
      toast.success('Interview scheduled! Email sent to candidate.');
      queryClient.invalidateQueries(['candidate', id]);
      queryClient.invalidateQueries(['dashboardStats']);
      queryClient.invalidateQueries(['candidates']);
      setShowInterviewModal(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to schedule interview'),
  });

  const statusMutation = useMutation({
    mutationFn: (data) => updateCandidateStatus(id, data),
    onSuccess: (_, variables) => {
      toast.success(`Candidate ${variables.status.toLowerCase()}! Email sent.`);
      queryClient.invalidateQueries(['candidate', id]);
      queryClient.invalidateQueries(['dashboardStats']);
      queryClient.invalidateQueries(['candidates']);
      setShowRejectModal(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update status'),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteCandidate(id),
    onSuccess: () => {
      toast.success('Candidate deleted');
      queryClient.invalidateQueries(['dashboardStats']);
      queryClient.invalidateQueries(['candidates']);
      navigate('/admin/dashboard');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete'),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-sm font-medium">Candidate not found</p>
        <Link to="/admin/dashboard" className="text-gray-400 hover:text-gray-700 mt-2 inline-block text-xs font-medium border-b border-gray-300 hover:border-gray-700">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-2.5">
      <div className="w-6 h-6 rounded bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3 h-3 text-gray-500" />
      </div>
      <div>
        <p className="text-gray-400 text-[9px] uppercase tracking-wider font-medium">{label}</p>
        <p className="text-gray-700 text-xs font-medium mt-0.5">{value || '—'}</p>
      </div>
    </div>
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-5">
      {/* Back + Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/dashboard"
            className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-800 tracking-tight">{candidate.fullName}</h1>
            <p className="text-gray-500 text-xs font-medium">{candidate.position}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-medium border ml-1
            ${statusConfig[candidate.status]?.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[candidate.status]?.dot}`} />
            {candidate.status}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {candidate.status !== 'Selected' && candidate.status !== 'Rejected' && (
            <>
              <button
                onClick={() => setShowInterviewModal(true)}
                className="px-3 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-colors text-[10px] font-medium flex items-center gap-1.5"
              >
                <Calendar className="w-3 h-3" />
                Schedule
              </button>
              <button
                onClick={() => statusMutation.mutate({ status: 'Selected' })}
                disabled={statusMutation.isPending}
                className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors text-[10px] font-medium flex items-center gap-1.5"
              >
                <CheckCircle className="w-3 h-3" />
                Select
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="px-3 py-1 rounded-lg bg-white border border-gray-200 text-red-600 hover:bg-red-50 transition-colors text-[10px] font-medium flex items-center gap-1.5"
              >
                <XCircle className="w-3 h-3" />
                Reject
              </button>
            </>
          )}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Personal Info */}
          <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-5">
            <h3 className="text-gray-800 font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gray-500" /> Personal Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <InfoItem icon={User} label="Full Name" value={candidate.fullName} />
              <InfoItem icon={Mail} label="Email" value={candidate.email} />
              <InfoItem icon={Phone} label="Phone" value={candidate.phone} />
              <InfoItem icon={Briefcase} label="Position" value={candidate.position} />
              <InfoItem icon={Droplets} label="Blood Group" value={candidate.bloodGroup} />
              <InfoItem icon={Calendar} label="Date of Birth" value={formatDate(candidate.dateOfBirth)} />
              <InfoItem icon={User} label="Gender" value={candidate.gender} />
              <InfoItem icon={Calendar} label="Applied Date" value={formatDate(candidate.createdAt)} />
            </div>
          </div>

          {/* Address */}
          {candidate.address && (
            <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-5">
              <h3 className="text-gray-800 font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-500" /> Address
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <InfoItem icon={MapPin} label="Address Line" value={candidate.address.addressLine} />
                <InfoItem icon={MapPin} label="City" value={candidate.address.city} />
                <InfoItem icon={MapPin} label="State" value={candidate.address.state} />
                <InfoItem icon={MapPin} label="Pincode" value={candidate.address.pincode} />
              </div>
            </div>
          )}

          {/* Education */}
          {candidate.education?.length > 0 && (
            <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-5">
              <h3 className="text-gray-800 font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-gray-500" /> Education
              </h3>
              <div className="space-y-2.5">
                {candidate.education.map((edu, i) => (
                  <div key={i} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-800 font-semibold text-xs">{edu.degree}</p>
                        <p className="text-gray-500 text-[10px] mt-0.5">{edu.college}</p>
                        <p className="text-gray-400 text-[9px]">{edu.university}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-gray-700 text-xs font-semibold">{edu.percentage}</p>
                        <p className="text-gray-400 text-[9px] mt-0.5">{edu.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Family */}
          {candidate.familyMembers?.length > 0 && (
            <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-5">
              <h3 className="text-gray-800 font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gray-500" /> Family Background
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-1.5 px-2 text-[9px] text-gray-500 font-medium uppercase">Name</th>
                      <th className="text-left py-1.5 px-2 text-[9px] text-gray-500 font-medium uppercase">Relation</th>
                      <th className="text-left py-1.5 px-2 text-[9px] text-gray-500 font-medium uppercase">Occupation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidate.familyMembers.map((member, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-1.5 px-2 text-gray-700 font-medium">{member.name}</td>
                        <td className="py-1.5 px-2 text-gray-500">{member.relation}</td>
                        <td className="py-1.5 px-2 text-gray-500">{member.occupation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Description */}
          {candidate.description && (
            <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-5">
              <h3 className="text-gray-800 font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-gray-500" /> About Candidate
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-wrap">{candidate.description}</p>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-5">
          {/* Professional Info */}
          <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-5">
            <h3 className="text-gray-800 font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-gray-500" /> Professional Overview
            </h3>
            <div className="space-y-3">
              <InfoItem icon={Wrench} label="Skills" value={candidate.skills} />
              <InfoItem icon={Clock} label="Experience" value={candidate.experience} />
              <InfoItem icon={Building} label="Current Company" value={candidate.currentCompany} />
              <InfoItem icon={DollarSign} label="Expected Salary" value={candidate.expectedSalary} />
              <InfoItem icon={Timer} label="Notice Period" value={candidate.noticePeriod} />
            </div>
          </div>

          {/* Resume */}
          <div className="bg-white/80 rounded-xl border border-gray-200/60 shadow-sm p-5">
            <h3 className="text-gray-800 font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-gray-500" /> Resume
            </h3>
            {candidate.resumeUrl ? (
              <div className="space-y-2.5">
                <p className="text-gray-600 text-xs truncate font-medium">{candidate.resumeOriginalName || 'resume.pdf'}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowResumeModal(true)}
                    className="flex-1 px-2.5 py-1 rounded bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors text-[10px] font-medium flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    Preview
                  </button>
                  <a
                    href={candidate.resumeUrl}
                    download
                    className="flex-1 px-2.5 py-1 rounded bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors text-[10px] font-medium flex items-center justify-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-xs">No resume uploaded</p>
            )}
          </div>

          {/* Interview Details */}
          {candidate.interviewDetails && candidate.status === 'Interview Scheduled' && (
            <div className="bg-blue-50/50 rounded-xl border border-blue-200 shadow-sm p-5">
              <h3 className="text-gray-800 font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-blue-600" /> Scheduled Interview
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-gray-700">{candidate.interviewDetails.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-gray-700">{candidate.interviewDetails.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Video className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-gray-700">{candidate.interviewDetails.mode}</span>
                </div>
                {candidate.interviewDetails.meetingLink && (
                  <div className="flex items-center gap-2 text-xs">
                    <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                    <a href={candidate.interviewDetails.meetingLink} target="_blank" rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 truncate text-xs">{candidate.interviewDetails.meetingLink}</a>
                  </div>
                )}
                {candidate.interviewDetails.description && (
                  <p className="text-gray-600 text-xs mt-2 pt-2 border-t border-blue-200 leading-relaxed">
                    {candidate.interviewDetails.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Rejection Reason */}
          {candidate.status === 'Rejected' && candidate.rejectionReason && (
            <div className="bg-red-50/50 rounded-xl border border-red-200 shadow-sm p-5">
              <h3 className="text-gray-800 font-semibold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-red-600" /> Rejection Log
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">{candidate.rejectionReason}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals remain similar but with light theme styling */}
      {/* Interview Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl border border-gray-200 w-full max-w-lg p-5">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
              <h3 className="text-sm font-bold text-gray-800">Schedule Interview</h3>
              <button onClick={() => setShowInterviewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-0.5">Date</label>
                  <input type="date" value={interviewForm.date} onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-0.5">Time</label>
                  <input type="time" value={interviewForm.time} onChange={(e) => setInterviewForm({ ...interviewForm, time: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 mb-0.5">Mode</label>
                <select value={interviewForm.mode} onChange={(e) => setInterviewForm({ ...interviewForm, mode: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm">
                  <option>Google Meet</option><option>Zoom</option><option>Microsoft Teams</option><option>In-Person</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 mb-0.5">Meeting Link</label>
                <input type="url" value={interviewForm.meetingLink} onChange={(e) => setInterviewForm({ ...interviewForm, meetingLink: e.target.value })}
                  placeholder="https://meet.google.com/..." className="w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 mb-0.5">Instructions</label>
                <textarea rows={2} value={interviewForm.description} onChange={(e) => setInterviewForm({ ...interviewForm, description: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm resize-none" />
              </div>
              <div className="flex items-center gap-3 pt-3">
                <button onClick={() => setShowInterviewModal(false)} className="flex-1 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-600 text-xs font-medium">Cancel</button>
                <button onClick={() => interviewMutation.mutate(interviewForm)} disabled={interviewMutation.isPending || !interviewForm.date || !interviewForm.time}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium flex items-center justify-center gap-1">
                  {interviewMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Calendar className="w-3 h-3" />}
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl border border-gray-200 w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
              <h3 className="text-sm font-bold text-gray-800">Reject Candidate</h3>
              <button onClick={() => setShowRejectModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-gray-600 text-xs mb-4">You are about to reject <strong className="text-gray-800">{candidate.fullName}</strong>. An email will be sent.</p>
            <div className="mb-4">
              <label className="block text-[10px] font-medium text-gray-500 mb-0.5">Rejection Reason</label>
              <textarea rows={3} value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm resize-none" />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowRejectModal(false)} className="flex-1 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-600 text-xs font-medium">Cancel</button>
              <button onClick={() => statusMutation.mutate({ status: 'Rejected', rejectionReason })} disabled={statusMutation.isPending}
                className="flex-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium flex items-center justify-center gap-1">
                {statusMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl border border-gray-200 w-full max-w-sm p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Delete Candidate</h3>
            <p className="text-gray-600 text-xs mb-4">This action cannot be undone. Confirm deletion?</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-600 text-xs font-medium">Cancel</button>
              <button onClick={() => deleteMutation.mutate()} disabled={deleteMutation.isPending}
                className="flex-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium flex items-center justify-center gap-1">
                {deleteMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl border border-gray-200 w-full max-w-4xl h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <h3 className="text-xs font-bold text-gray-800">{candidate.resumeOriginalName || 'resume.pdf'}</h3>
              <div className="flex items-center gap-2">
                <a href={candidate.resumeUrl} download className="px-2.5 py-1 rounded bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-medium flex items-center gap-1">
                  <Download className="w-3 h-3" /> Download
                </a>
                <button onClick={() => setShowResumeModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex-1 p-3 bg-gray-50">
              <iframe src={candidate.resumeUrl} className="w-full h-full rounded border border-gray-200" title="Resume Preview" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateDetails;
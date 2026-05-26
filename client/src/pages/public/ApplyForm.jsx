// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import toast from 'react-hot-toast';
// import { submitApplication } from '../../services/api';
// import {
//   Briefcase,
//   User,
//   MapPin,
//   GraduationCap,
//   Users,
//   Wrench,
//   FileText,
//   MessageSquare,
//   Upload,
//   Plus,
//   Trash2,
//   ArrowLeft,
//   Send,
//   Loader2,
//   CheckCircle,
// } from 'lucide-react';

// const schema = yup.object({
//   fullName: yup.string().required('Full name is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   phone: yup.string().required('Phone number is required'),
//   position: yup.string().required('Position is required'),
// });

// const positions = [
//   'MERN Stack Developer',
//   'Frontend Developer',
//   'Backend Developer',
//   'Full Stack Developer',
//   'UI/UX Designer',
//   'DevOps Engineer',
//   'Data Analyst',
//   'Project Manager',
//   'QA Engineer',
//   'Mobile App Developer',
//   'Other',
// ];

// const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
// const genders = ['Male', 'Female', 'Other'];

// const ApplyForm = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [resumeFile, setResumeFile] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       fullName: '',
//       email: '',
//       phone: '',
//       position: '',
//       bloodGroup: '',
//       dateOfBirth: '',
//       gender: '',
//       address: { addressLine: '', city: '', state: '', pincode: '' },
//       education: [{ degree: '', college: '', university: '', year: '', percentage: '' }],
//       familyMembers: [{ name: '', relation: '', occupation: '', contactNumber: '' }],
//       skills: '',
//       experience: '',
//       currentCompany: '',
//       expectedSalary: '',
//       noticePeriod: '',
//       description: '',
//     },
//   });

//   const {
//     fields: educationFields,
//     append: appendEducation,
//     remove: removeEducation,
//   } = useFieldArray({ control, name: 'education' });

//   const {
//     fields: familyFields,
//     append: appendFamily,
//     remove: removeFamily,
//   } = useFieldArray({ control, name: 'familyMembers' });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const formData = new FormData();

//       // Append simple fields
//       const simpleFields = [
//         'fullName', 'email', 'phone', 'position', 'bloodGroup',
//         'dateOfBirth', 'gender', 'skills', 'experience',
//         'currentCompany', 'expectedSalary', 'noticePeriod', 'description',
//       ];
//       simpleFields.forEach((field) => {
//         if (data[field]) formData.append(field, data[field]);
//       });

//       // Filter out completely empty items from education and familyMembers
//       const cleanEducation = (data.education || []).filter(edu => 
//         edu && Object.values(edu).some(val => val !== null && val !== undefined && String(val).trim() !== '')
//       );
//       const cleanFamilyMembers = (data.familyMembers || []).filter(member => 
//         member && Object.values(member).some(val => val !== null && val !== undefined && String(val).trim() !== '')
//       );

//       // Append nested objects as JSON
//       formData.append('address', JSON.stringify(data.address));
//       formData.append('education', JSON.stringify(cleanEducation));
//       formData.append('familyMembers', JSON.stringify(cleanFamilyMembers));

//       // Append resume
//       if (resumeFile) {
//         formData.append('resume', resumeFile);
//       }

//       await submitApplication(formData);
//       toast.success('Application submitted successfully!');
//       navigate('/success');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to submit application');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const SectionHeader = ({ icon: Icon, title, subtitle }) => (
//     <div className="flex items-center gap-3.5 mb-6">
//       <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
//         <Icon className="w-4 h-4 text-slate-300" />
//       </div>
//       <div>
//         <h3 className="text-white font-semibold text-base leading-tight">{title}</h3>
//         {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
//       </div>
//     </div>
//   );

//   const InputField = ({ label, name, type = 'text', placeholder, required, className = '', ...props }) => (
//     <div className={className}>
//       <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         {...register(name)}
//         className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white
//           placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//         {...props}
//       />
//       {errors[name] && (
//         <p className="text-red-500 text-xs mt-1.5">{errors[name].message}</p>
//       )}
//     </div>
//   );

//   const SelectField = ({ label, name, options, required, className = '' }) => (
//     <div className={className}>
//       <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <select
//         {...register(name)}
//         className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white
//           focus:border-slate-500 transition-smooth text-sm cursor-pointer"
//       >
//         <option value="">Select {label}</option>
//         {options.map((opt) => (
//           <option key={opt} value={opt}>{opt}</option>
//         ))}
//       </select>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100">
//       {/* Top Bar */}
//       <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-900">
//         <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
//               <Briefcase className="w-4 h-4 text-slate-200" />
//             </div>
//             <span className="font-bold text-sm tracking-tight text-white">HR Portal</span>
//           </div>
//           <Link to="/admin/login" className="text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-smooth">
//             HR Admin Login
//           </Link>
//         </div>
//       </div>

//       {/* Form Header */}
//       <div className="relative py-16 px-6 bg-slate-950 border-b border-slate-900">
//         <div className="relative z-10 max-w-4xl mx-auto text-center">
//           <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">Job Application Form</h1>
//           <p className="text-slate-500 text-sm max-w-xl mx-auto">Fill in your details below. Ensure all information is accurate and verified.</p>
//         </div>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto px-6 pb-20 mt-12 relative z-10">
//         <div className="space-y-6">

//           {/* Personal Information */}
//           <div className="bg-slate-900 border border-slate-900 rounded-lg p-6 md:p-8">
//             <SectionHeader icon={User} title="Personal Information" subtitle="Your basic details" />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <InputField label="Full Name" name="fullName" placeholder="Enter your full name" required className="md:col-span-2" />
//               <InputField label="Email Address" name="email" type="email" placeholder="you@example.com" required />
//               <InputField label="Phone Number" name="phone" placeholder="Enter phone number" required />
//               <SelectField label="Position Applied For" name="position" options={positions} required />
//               <SelectField label="Blood Group" name="bloodGroup" options={bloodGroups} />
//               <InputField label="Date of Birth" name="dateOfBirth" type="date" />
//               <SelectField label="Gender" name="gender" options={genders} />
//             </div>
//           </div>

//           {/* Address */}
//           <div className="bg-slate-900 border border-slate-900 rounded-lg p-6 md:p-8">
//             <SectionHeader icon={MapPin} title="Address Information" subtitle="Your current address" />
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="md:col-span-3">
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Address Line</label>
//                 <input
//                   {...register('address.addressLine')}
//                   placeholder="Street, Area, Landmark"
//                   className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">City</label>
//                 <input
//                   {...register('address.city')}
//                   placeholder="Enter city"
//                   className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">State</label>
//                 <input
//                   {...register('address.state')}
//                   placeholder="Enter state"
//                   className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Pincode</label>
//                 <input
//                   {...register('address.pincode')}
//                   placeholder="Enter pincode"
//                   className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Education */}
//           <div className="bg-slate-900 border border-slate-900 rounded-lg p-6 md:p-8">
//             <SectionHeader icon={GraduationCap} title="Educational Qualification" subtitle="Add your education details" />
//             <div className="space-y-4">
//               {educationFields.map((field, index) => (
//                 <div key={field.id} className="p-4 rounded-lg bg-slate-950 border border-slate-900 relative">
//                   {educationFields.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeEducation(index)}
//                       className="absolute top-3 right-3 p-1.5 rounded text-red-500 hover:bg-red-500/10 transition-smooth"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   )}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Degree</label>
//                       <input
//                         {...register(`education.${index}.degree`)}
//                         placeholder="B.Tech, MBA, etc."
//                         className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">College</label>
//                       <input
//                         {...register(`education.${index}.college`)}
//                         placeholder="College name"
//                         className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">University</label>
//                       <input
//                         {...register(`education.${index}.university`)}
//                         placeholder="University name"
//                         className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Year</label>
//                       <input
//                         {...register(`education.${index}.year`)}
//                         placeholder="2024"
//                         className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                       />
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Percentage / CGPA</label>
//                       <input
//                         {...register(`education.${index}.percentage`)}
//                         placeholder="85% or 8.5 CGPA"
//                         className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-655 focus:border-slate-500 transition-smooth text-sm"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() => appendEducation({ degree: '', college: '', university: '', year: '', percentage: '' })}
//                 className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-slate-800 text-slate-400 
//                   hover:border-slate-650 hover:text-white transition-smooth text-xs font-semibold uppercase tracking-wider"
//               >
//                 <Plus className="w-3.5 h-3.5" /> Add Education
//               </button>
//             </div>
//           </div>

//           {/* Family Background */}
//           <div className="bg-slate-900 border border-slate-900 rounded-lg p-6 md:p-8">
//             <SectionHeader icon={Users} title="Family Background" subtitle="Add your family members" />
//             <div className="space-y-4">
//               {familyFields.map((field, index) => (
//                 <div key={field.id} className="p-4 rounded-lg bg-slate-950 border border-slate-900 relative">
//                   {familyFields.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeFamily(index)}
//                       className="absolute top-3 right-3 p-1.5 rounded text-red-500 hover:bg-red-500/10 transition-smooth"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   )}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Name</label>
//                       <input
//                         {...register(`familyMembers.${index}.name`)}
//                         placeholder="Family member name"
//                         className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Relation</label>
//                       <input
//                         {...register(`familyMembers.${index}.relation`)}
//                         placeholder="Father, Mother, etc."
//                         className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Occupation</label>
//                       <input
//                         {...register(`familyMembers.${index}.occupation`)}
//                         placeholder="Occupation"
//                         className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Contact Number</label>
//                       <input
//                         {...register(`familyMembers.${index}.contactNumber`)}
//                         placeholder="Phone number"
//                         className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() => appendFamily({ name: '', relation: '', occupation: '', contactNumber: '' })}
//                 className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-slate-800 text-slate-400 
//                   hover:border-slate-650 hover:text-white transition-smooth text-xs font-semibold uppercase tracking-wider"
//               >
//                 <Plus className="w-3.5 h-3.5" /> Add Family Member
//               </button>
//             </div>
//           </div>

//           {/* Professional Information */}
//           <div className="bg-slate-900 border border-slate-900 rounded-lg p-6 md:p-8">
//             <SectionHeader icon={Wrench} title="Professional Information" subtitle="Your work experience details" />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="md:col-span-2">
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Skills</label>
//                 <input
//                   {...register('skills')}
//                   placeholder="React, Node.js, MongoDB, etc."
//                   className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Experience</label>
//                 <input
//                   {...register('experience')}
//                   placeholder="e.g., 2 years"
//                   className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Current Company</label>
//                 <input
//                   {...register('currentCompany')}
//                   placeholder="Company name"
//                   className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Expected Salary</label>
//                 <input
//                   {...register('expectedSalary')}
//                   placeholder="e.g., ₹5,00,000"
//                   className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Notice Period</label>
//                 <input
//                   {...register('noticePeriod')}
//                   placeholder="e.g., 30 days"
//                   className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Resume Upload */}
//           <div className="bg-slate-900 border border-slate-900 rounded-lg p-6 md:p-8">
//             <SectionHeader icon={FileText} title="Resume Upload" subtitle="Upload your resume (PDF/DOC, max 5MB)" />
//             <div
//               className={`relative border border-dashed rounded-lg p-8 text-center transition-smooth cursor-pointer
//                 ${resumeFile ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800 bg-slate-950 hover:border-slate-700'}`}
//               onClick={() => document.getElementById('resume-input').click()}
//             >
//               <input
//                 id="resume-input"
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 onChange={(e) => setResumeFile(e.target.files[0])}
//                 className="hidden"
//               />
//               {resumeFile ? (
//                 <div className="flex flex-col items-center gap-2">
//                   <CheckCircle className="w-8 h-8 text-emerald-500" />
//                   <p className="text-white font-medium text-sm">{resumeFile.name}</p>
//                   <p className="text-slate-500 text-xs">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                   <button
//                     type="button"
//                     onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
//                     className="text-red-500 text-xs font-semibold hover:text-red-400 transition-smooth mt-1.5 uppercase tracking-wider"
//                   >
//                     Remove file
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center gap-2">
//                   <Upload className="w-8 h-8 text-slate-600" />
//                   <p className="text-slate-300 font-medium text-sm">Click to upload your resume</p>
//                   <p className="text-slate-500 text-xs">PDF, DOC, or DOCX (Max 5MB)</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Description */}
//           <div className="bg-slate-900 border border-slate-900 rounded-lg p-6 md:p-8">
//             <SectionHeader icon={MessageSquare} title="About Yourself" subtitle="Tell us about yourself" />
//             <textarea
//               {...register('description')}
//               rows={5}
//               placeholder="Write a brief introduction about yourself, your experience, and why you'd be a great fit..."
//               className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white 
//                 placeholder-slate-600 focus:border-slate-500 transition-smooth text-sm resize-none"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="group px-8 py-3.5 rounded-lg bg-slate-100 hover:bg-white text-slate-950 font-semibold text-base transition-smooth border border-slate-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Submitting...
//                 </>
//               ) : (
//                 <>
//                   <Send className="w-4 h-4" />
//                   Submit Application
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ApplyForm;
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { submitApplication } from '../../services/api';
import {
  Briefcase,
  User,
  MapPin,
  GraduationCap,
  Users,
  Wrench,
  FileText,
  MessageSquare,
  Upload,
  Plus,
  Trash2,
  Send,
  Loader2,
  CheckCircle,
  ChevronRight,
  Heart,
  Calendar,
  Building,
  DollarSign,
  Clock,
  Mail,
  Phone,
  MapPinned,
  Globe,
  Link2,
  Code,
} from 'lucide-react';

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  position: yup.string().required('Position is required'),
});

const positions = [
  'MERN Stack Developer', 'Frontend Developer', 'Backend Developer',
  'Full Stack Developer', 'UI/UX Designer', 'DevOps Engineer',
  'Data Analyst', 'Project Manager', 'QA Engineer', 'Mobile App Developer', 'Other'
];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const genders = ['Male', 'Female', 'Other'];

const ApplyForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '', email: '', phone: '', position: '', bloodGroup: '', dateOfBirth: '', gender: '',
      address: { addressLine: '', city: '', state: '', pincode: '' },
      education: [{ degree: '', college: '', year: '', percentage: '' }],
      familyMembers: [{ name: '', relation: '', occupation: '' }],
      skills: '', experience: '', currentCompany: '', expectedSalary: '', noticePeriod: '', description: '',
      linkedin: '', github: '', portfolio: '',
    },
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control, name: 'education' });
  const { fields: familyFields, append: appendFamily, remove: removeFamily } = useFieldArray({ control, name: 'familyMembers' });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      const simpleFields = ['fullName', 'email', 'phone', 'position', 'bloodGroup', 'dateOfBirth', 'gender', 'skills', 'experience', 'currentCompany', 'expectedSalary', 'noticePeriod', 'description', 'linkedin', 'github', 'portfolio'];
      simpleFields.forEach(field => data[field] && formData.append(field, data[field]));
      const cleanEducation = (data.education || []).filter(e => e && Object.values(e).some(v => v?.trim()));
      const cleanFamily = (data.familyMembers || []).filter(f => f && Object.values(f).some(v => v?.trim()));
      formData.append('address', JSON.stringify(data.address));
      formData.append('education', JSON.stringify(cleanEducation));
      formData.append('familyMembers', JSON.stringify(cleanFamily));
      if (resumeFile) formData.append('resume', resumeFile);
      await submitApplication(formData);
      toast.success('Application submitted!');
      navigate('/success');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const Section = ({ icon: Icon, title, children }) => (
    <div className="bg-white/80 rounded-xl border border-gray-200/60 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-gray-600" />
        </div>
        <h3 className="text-gray-800 font-semibold text-sm">{title}</h3>
      </div>
      {children}
    </div>
  );

  const Input = ({ label, name, type = 'text', placeholder, required, className = '', icon: Icon }) => (
    <div className={className}>
      <label className="block text-[11px] font-medium text-gray-500 mb-0.5">{label} {required && <span className="text-red-400">*</span>}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />}
        <input type={type} placeholder={placeholder} {...register(name)}
          className={`w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all ${Icon ? 'pl-8' : ''}`} />
      </div>
      {errors[name] && <p className="text-red-400 text-[10px] mt-0.5">{errors[name].message}</p>}
    </div>
  );

  const Select = ({ label, name, options, required, className = '', icon: Icon }) => (
    <div className={className}>
      <label className="block text-[11px] font-medium text-gray-500 mb-0.5">{label} {required && <span className="text-red-400">*</span>}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />}
        <select {...register(name)} className={`w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm appearance-none cursor-pointer ${Icon ? 'pl-8' : ''}`}>
          <option value="">Select</option>
          {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
        <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 rotate-90 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100" style={{ background: '#f3f4f6' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center"><Briefcase className="w-3 text-white" /></div>
            <span className="font-medium text-xs text-gray-900">hire<span className="text-gray-400">base</span></span>
          </div>
          <Link to="/admin/login" className="text-gray-400 hover:text-gray-700 text-[11px] font-medium">Admin</Link>
        </div>
      </div>

      {/* Form - Compact */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold text-gray-800">Job Application</h1>
          <p className="text-gray-500 text-xs mt-0.5">Fill in your details — it's quick</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Personal Info - two columns compact */}
          <Section icon={User} title="Personal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Full name" name="fullName" placeholder="John Doe" required icon={User} className="sm:col-span-2" />
              <Input label="Email" name="email" type="email" placeholder="you@example.com" required icon={Mail} />
              <Input label="Phone" name="phone" placeholder="+91 98765 43210" required icon={Phone} />
              <Select label="Position" name="position" options={positions} required icon={Briefcase} />
              <Select label="Blood group" name="bloodGroup" options={bloodGroups} icon={Heart} />
              <Input label="Date of birth" name="dateOfBirth" type="date" icon={Calendar} />
              <Select label="Gender" name="gender" options={genders} icon={User} />
            </div>
          </Section>

          {/* Address - compact row */}
          <Section icon={MapPin} title="Address">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <div className="sm:col-span-2">
                <Input label="Address line" name="address.addressLine" placeholder="Street, area" icon={MapPinned} />
              </div>
              <Input label="City" name="address.city" placeholder="City" icon={Building} />
              <Input label="State" name="address.state" placeholder="State" icon={MapPin} />
              <Input label="Pincode" name="address.pincode" placeholder="Pincode" />
            </div>
          </Section>

          {/* Education - compact with inline fields */}
          <Section icon={GraduationCap} title="Education">
            <div className="space-y-2">
              {educationFields.map((field, idx) => (
                <div key={field.id} className="relative bg-gray-50/80 rounded-lg p-2 border border-gray-200">
                  {educationFields.length > 1 && (
                    <button type="button" onClick={() => removeEducation(idx)} className="absolute top-1.5 right-1.5 p-1 rounded text-gray-400 hover:text-red-500">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Input label="Degree" name={`education.${idx}.degree`} placeholder="B.Tech" />
                    <Input label="College" name={`education.${idx}.college`} placeholder="College" />
                    <Input label="Year" name={`education.${idx}.year`} placeholder="2024" />
                    <Input label="% / CGPA" name={`education.${idx}.percentage`} placeholder="85%" />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => appendEducation({ degree: '', college: '', year: '', percentage: '' })} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mt-1">
                <Plus className="w-3 h-3" /> Add education
              </button>
            </div>
          </Section>

          {/* Family - compact */}
          <Section icon={Users} title="Family">
            <div className="space-y-2">
              {familyFields.map((field, idx) => (
                <div key={field.id} className="relative bg-gray-50/80 rounded-lg p-2 border border-gray-200">
                  {familyFields.length > 1 && (
                    <button type="button" onClick={() => removeFamily(idx)} className="absolute top-1.5 right-1.5 p-1 rounded text-gray-400 hover:text-red-500">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                  <div className="grid grid-cols-3 gap-2">
                    <Input label="Name" name={`familyMembers.${idx}.name`} placeholder="Name" />
                    <Input label="Relation" name={`familyMembers.${idx}.relation`} placeholder="Father" />
                    <Input label="Occupation" name={`familyMembers.${idx}.occupation`} placeholder="Job" />
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => appendFamily({ name: '', relation: '', occupation: '' })} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                <Plus className="w-3 h-3" /> Add family member
              </button>
            </div>
          </Section>

          {/* Professional - concise */}
          <Section icon={Wrench} title="Professional">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Skills (comma separated)" name="skills" placeholder="React, Node.js" />
              <Input label="Experience" name="experience" placeholder="2 years" icon={Clock} />
              <Input label="Current company" name="currentCompany" placeholder="Company" icon={Building} />
              <Input label="Expected salary" name="expectedSalary" placeholder="₹5,00,000" icon={DollarSign} />
              <Input label="Notice period" name="noticePeriod" placeholder="30 days" icon={Clock} />
            </div>
          </Section>

          {/* Social links */}
          <Section icon={Globe} title="Online">
            <div className="grid grid-cols-3 gap-2">
              <Input label="LinkedIn" name="linkedin" placeholder="username" icon={Link2} />
              <Input label="GitHub" name="github" placeholder="username" icon={Code} />
              <Input label="Portfolio" name="portfolio" placeholder="website" icon={Globe} />
            </div>
          </Section>

          {/* Resume upload - compact */}
          <Section icon={FileText} title="Resume">
            <div className="border border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50 transition" onClick={() => document.getElementById('resume-input').click()}>
              <input id="resume-input" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files[0])} className="hidden" />
              {resumeFile ? (
                <div className="flex items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /><span className="text-gray-700 truncate">{resumeFile.name}</span></div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setResumeFile(null); }} className="text-red-400 text-xs">Remove</button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-gray-500 text-xs"><Upload className="w-3.5 h-3.5" /> Upload resume (PDF/DOC)</div>
              )}
            </div>
          </Section>

          {/* About yourself - short */}
          <Section icon={MessageSquare} title="About you">
            <textarea {...register('description')} rows={2} placeholder="Brief intro about yourself, experience, and why you'd be a great fit..." className="w-full px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm resize-none" />
          </Section>

          {/* Submit button */}
          <div className="flex justify-center pt-2">
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium flex items-center gap-2 shadow-sm transition">
              {loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...</> : <><Send className="w-3.5 h-3.5" /> Submit application</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
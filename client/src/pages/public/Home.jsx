import { Link } from 'react-router-dom';
import {
  Briefcase,
  ArrowRight,
  Clock,
  Sparkles,
  Shield,
  Mail,
  FileText,
  ChevronRight,
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: FileText,
      title: 'Easy Application',
      desc: 'Simple and intuitive form to submit your application in minutes.',
    },
    {
      icon: Clock,
      title: 'Quick Processing',
      desc: 'Applications are reviewed promptly by our HR team.',
    },
    {
      icon: Mail,
      title: 'Email Updates',
      desc: 'Receive automatic email notifications at every stage.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      desc: 'Your data is encrypted and handled with utmost care.',
    },
  ];

  const steps = [
    { num: '01', title: 'Fill Application', desc: 'Complete the application form with your details' },
    { num: '02', title: 'Upload Resume', desc: 'Attach your resume in PDF or DOC format' },
    { num: '03', title: 'Submit', desc: 'Review and submit your application' },
    { num: '04', title: 'Get Updates', desc: 'Receive email updates on your application status' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-900 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-slate-200" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">HR Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              className="text-slate-400 hover:text-white text-sm font-medium transition-smooth"
            >
              HR Login
            </Link>
            <Link
              to="/apply"
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-white text-slate-950 text-sm font-semibold transition-smooth flex items-center gap-1.5 border border-slate-200"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-slate-950">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-900 bg-slate-900/60 mb-8 animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300 text-xs font-semibold tracking-wider uppercase">Now Accepting Applications</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6 animate-fade-in-up delay-100">
            Your Next Career Move Starts Here
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            Join our growing team of talented professionals. Apply now and take the first step 
            towards an exciting career opportunity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up delay-300">
            <Link
              to="/apply"
              className="group px-7 py-3.5 rounded-lg bg-slate-100 hover:bg-white text-slate-950 font-semibold text-base transition-smooth border border-slate-200 flex items-center gap-2 shadow-sm"
            >
              Apply Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="px-7 py-3.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-300 hover:text-white font-medium text-base transition-smooth"
            >
              How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-24 max-w-md mx-auto border-t border-slate-900 pt-8 animate-fade-in-up delay-400">
            {[
              { num: '500+', label: 'Applications' },
              { num: '50+', label: 'Positions' },
              { num: '95%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">{stat.num}</p>
                <p className="text-slate-500 text-xs mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 border-t border-slate-900 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Why Apply With Us?</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
              Our streamlined application process makes it easy to apply and stay informed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="group p-6 rounded-lg bg-slate-900 border border-slate-900 
                  hover:border-slate-800 transition-smooth text-center flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-900 
                  flex items-center justify-center mb-4 text-slate-400 group-hover:text-white transition-smooth">
                  <feat.icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 border-t border-slate-900 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">How It Works</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
              Four simple steps to submit your application and get started.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-6 p-5 rounded-lg bg-slate-900 border border-slate-900 
                  hover:border-slate-800 transition-smooth group"
              >
                <span className="text-2xl font-bold text-slate-700 group-hover:text-slate-500 transition-smooth">
                  {step.num}
                </span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-smooth" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-100 hover:bg-white 
                text-slate-950 font-semibold text-base transition-smooth border border-slate-200 shadow-sm"
            >
              Start Your Application
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-slate-300" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight">HR Portal</span>
          </div>
          <p className="text-slate-500 text-xs">© 2026 HR Recruitment Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

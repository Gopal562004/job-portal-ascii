import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Public Pages
import ApplyForm from './pages/public/ApplyForm';
import SuccessPage from './pages/public/SuccessPage';

// Admin Pages
import Login from './pages/admin/Login';
import ForgotPassword from './pages/admin/ForgotPassword';
import Dashboard from './pages/admin/Dashboard';
import CandidateDetails from './pages/admin/CandidateDetails';

// Layouts
import AdminLayout from './components/layout/AdminLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<ApplyForm />} />
            <Route path="/apply" element={<Navigate to="/" replace />} />
            <Route path="/success" element={<SuccessPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="candidates/:id" element={<CandidateDetails />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1E293B',
              color: '#F1F5F9',
              border: '1px solid #334155',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#10B981', secondary: '#F1F5F9' },
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#F1F5F9' },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

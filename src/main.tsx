import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AdminLogin from './pages/admin/Login.tsx';
import AdminDashboard from './pages/admin/Dashboard.tsx';
import BlogEditor from './pages/admin/BlogEditor.tsx';
import BlogPost from './pages/BlogPost.tsx';
import Privacy from './pages/Privacy.tsx';
import Terms from './pages/Terms.tsx';
import ProtectedRoute from './lib/ProtectedRoute.tsx';
import { AuthProvider } from './lib/AuthContext.tsx';
import './index.css';

// Base path configured from Vite build environment or window pathname
const basename = import.meta.env.BASE_URL || (window.location.pathname.startsWith('/My-portfillos') ? '/My-portfillos' : '/');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter
      basename={basename}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AuthProvider>
        <Routes>
          {/* Public portfolio */}
          <Route path="/" element={<App />} />
          {/* Blog post pages */}
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Legal pages */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* Admin Routes & Aliases */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin.login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/new" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
          <Route path="/admin/edit/:id" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
          {/* Catch-all redirect to home */}
          <Route path="*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

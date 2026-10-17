import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import BlogPost from './pages/BlogPost.tsx';
import AllBlogs from './pages/AllBlogs.tsx';
import Privacy from './pages/Privacy.tsx';
import Terms from './pages/Terms.tsx';
import Pricing from './pages/Pricing.tsx';
import './index.css';

// Base path configured from Vite build environment or window pathname
const basename = import.meta.env.BASE_URL || (window.location.pathname.startsWith('/My-portfillos') ? '/My-portfillos' : '/');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter
      basename={basename}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        {/* Public portfolio */}
        <Route path="/" element={<App />} />
        {/* Blog pages */}
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        {/* Legal pages */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        {/* Pricing */}
        <Route path="/pricing" element={<Pricing />} />
        {/* Catch-all redirect to home */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

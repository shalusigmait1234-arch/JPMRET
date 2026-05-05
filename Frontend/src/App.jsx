import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home/HomePage';
import About from './pages/About/AboutPage';
import Reports from './pages/Reports/ReportsPage';
import Gallery from './pages/Gallery';
import PrintMedia from './pages/PrintMedia';
import Downloads from './pages/Downloads';
import Contact from './pages/Contact/ContactPage';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminOverview from './pages/Admin/Management/Overview';
import AdminInquiries from './pages/Admin/Management/Inquiries';
import HeroManagement from './pages/Admin/Management/HeroManagement';
import StatManagement from './pages/Admin/Management/StatManagement';
import ServiceManagement from './pages/Admin/Management/ServiceManagement';
import BenefitManagement from './pages/Admin/Management/BenefitManagement';
import GalleryManagement from './pages/Admin/Management/GalleryManagement';
import TestimonialManagement from './pages/Admin/Management/TestimonialManagement';
import CoverageManagement from './pages/Admin/Management/CoverageManagement';
import ReportManagement from './pages/Admin/Management/ReportManagement';
import PrintMediaManagement from './pages/Admin/Management/PrintMediaManagement';
import { SettingsManagementPlaceholder } from './pages/Admin/Management/Placeholders';

// Coverage Pages
import Agriculture from './pages/coverage/Agriculture';
import LocalParticipation from './pages/coverage/LocalParticipation';
import TransformLives from './pages/coverage/TransformLives';
import WaterManagement from './pages/coverage/WaterManagement';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="reports" element={<Reports />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="print-media" element={<PrintMedia />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Coverage Sub-routes */}
          <Route path="coverage">
            <Route path="agriculture" element={<Agriculture />} />
            <Route path="local-participation" element={<LocalParticipation />} />
            <Route path="transform-lives" element={<TransformLives />} />
            <Route path="water-management" element={<WaterManagement />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="hero" element={<HeroManagement />} />
          <Route path="stats" element={<StatManagement />} />
          <Route path="services" element={<ServiceManagement />} />
          <Route path="benefits" element={<BenefitManagement />} />
          <Route path="gallery" element={<GalleryManagement />} />
          <Route path="testimonials" element={<TestimonialManagement />} />
          <Route path="agriculture" element={<CoverageManagement sectionSlug="agriculture" />} />
          <Route path="local-participation" element={<CoverageManagement sectionSlug="local-participation" />} />
          <Route path="transform-lives" element={<CoverageManagement sectionSlug="transform-lives" />} />
          <Route path="water-management" element={<CoverageManagement sectionSlug="water-management" />} />
          <Route path="print-media" element={<PrintMediaManagement />} />
          <Route path="reports" element={<ReportManagement />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="settings" element={<SettingsManagementPlaceholder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

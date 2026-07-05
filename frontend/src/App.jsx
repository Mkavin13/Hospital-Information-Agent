import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';

import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import ChatPage from './pages/ChatPage';

function Layout() {
  const location = useLocation();
  
  // Hide the floating widget and footer if the user is already on the dedicated full chat page
  const showFloatingWidget = location.pathname !== '/chat';
  const showFooter = location.pathname !== '/chat';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
      {showFloatingWidget && <ChatbotWidget />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

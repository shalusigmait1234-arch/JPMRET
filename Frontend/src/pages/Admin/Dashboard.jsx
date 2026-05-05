import React from 'react';
import { useNavigate, Link, useLocation, Outlet } from 'react-router-dom';
import { useGetProfileQuery } from '../../store/api/adminApi';
import { LogOut, User, LayoutDashboard, Settings, FileText, Image as ImageIcon, ShieldCheck, ArrowRight, Menu, Quote, ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
  const { data: admin, isLoading: profileLoading } = useGetProfileQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7fa]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#bd9143]"></div>
      </div>
    );
  }


  const toggleMenu = (name) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const modules = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Hero Section', icon: ImageIcon, path: '/admin/hero' },
    { name: 'Stats / Counters', icon: FileText, path: '/admin/stats' },
    { name: 'Services', icon: FileText, path: '/admin/services' },
    { name: 'Why Us', icon: FileText, path: '/admin/benefits' },
    { name: 'Gallery', icon: ImageIcon, path: '/admin/gallery' },
    { name: 'Testimonials', icon: Quote, path: '/admin/testimonials' },
    { 
      name: 'Coverage', 
      icon: Globe, 
      subItems: [
        { name: 'Agriculture Development', path: '/admin/agriculture' },
        { name: 'Local Participation', path: '/admin/local-participation' },
        { name: 'Transform Lives', path: '/admin/transform-lives' },
        { name: 'Water Management', path: '/admin/water-management' },
      ]
    },
    { name: 'Print Media', icon: ImageIcon, path: '/admin/print-media' },
    { name: 'Reports', icon: FileText, path: '/admin/reports' },
    { name: 'Inquiries', icon: FileText, path: '/admin/inquiries' },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex font-['Inter',sans-serif]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#001e38] text-white flex flex-col shadow-2xl relative z-20">
        <div className="p-3 border-b border-white/10">
          <div className="text-center group cursor-pointer">
            <div className="bg-white p-2 rounded-lg shadow-md inline-block transition-transform group-hover:scale-105">
              <img src="/assets/img/logo/logo.jpg" alt="Logo" className="h-8 w-auto" />
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">
            {modules.map((mod, i) => (
              <li key={i}>
                {mod.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(mod.name)}
                      className="w-full flex items-center justify-between p-3 rounded-md transition-all group hover:bg-white/10 text-white"
                    >
                      <div className="flex items-center space-x-3">
                        <mod.icon size={18} />
                        <span className="text-[13px] font-bold uppercase tracking-widest">{mod.name}</span>
                      </div>
                      {openMenus[mod.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openMenus[mod.name] && (
                      <ul className="mt-1 ml-4 space-y-1 border-l border-white/10 pl-4">
                        {mod.subItems.map((sub, j) => (
                          <li key={j}>
                            <Link
                              to={sub.path}
                              className={`flex items-center space-x-3 p-2 rounded-md transition-all text-[11px] font-bold uppercase tracking-widest ${
                                location.pathname === sub.path
                                ? 'bg-[#bd9143] text-white shadow-md'
                                : 'text-white hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <span>{sub.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={mod.path} 
                    className={`flex items-center space-x-3 p-3 rounded-md transition-all group ${
                      location.pathname === mod.path 
                      ? 'bg-[#bd9143] text-white shadow-lg' 
                      : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <mod.icon size={18} className={location.pathname === mod.path ? 'text-white' : 'text-white group-hover:text-white'} />
                    <span className="text-[13px] font-bold uppercase tracking-widest">{mod.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 w-full rounded-md bg-red-600/10 hover:bg-red-600 transition-all text-red-400 hover:text-white text-[13px] font-bold uppercase tracking-widest shadow-inner"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <header className="bg-white px-8 py-3 flex justify-between items-center shadow-sm relative z-10 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] tracking-wide">
              {modules.find(m => {
                if (m.path === location.pathname) return true;
                if (m.subItems) return m.subItems.some(s => s.path === location.pathname);
                return false;
              })?.name || 'Admin Panel'}
            </h2>
            <span className="h-6 w-[1px] bg-gray-200"></span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">System Live</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 px-4 py-1.5 bg-[#f4f7fa] rounded-lg border border-gray-100">
              <div className="text-right">
                <p className="text-[10px] font-black text-[#001e38] leading-none mb-1 uppercase tracking-tighter">{admin?.email}</p>
                <p className="text-[9px] font-bold text-[#bd9143] uppercase tracking-widest text-right">Root Administrator</p>
              </div>
              <div className="h-8 w-8 rounded-md bg-[#001e38] flex items-center justify-center text-white shadow-lg relative">
                <User size={16} />
                <span className="absolute bottom-[-1px] right-[-1px] h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 flex-1 overflow-y-auto relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

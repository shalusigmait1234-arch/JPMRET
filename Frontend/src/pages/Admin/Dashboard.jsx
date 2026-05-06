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
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard', activeClass: 'bg-[#001e38] text-white', iconClass: 'text-white' },
    { name: 'Inquiries', icon: FileText, path: '/admin/inquiries', activeClass: 'bg-[#001e38] text-white', iconClass: 'text-white' },

    { name: 'Hero Section', icon: ImageIcon, path: '/admin/hero', activeClass: 'bg-[#001e38] text-white', iconClass: 'text-white' },
    { name: 'Stats', icon: FileText, path: '/admin/stats', activeClass: 'bg-[#001e38] text-white', iconClass: 'text-white' },
    { name: 'Services', icon: FileText, path: '/admin/services', activeClass: 'bg-[#001e38] text-white', iconClass: 'text-white' },
    { name: 'Why Us', icon: FileText, path: '/admin/benefits', activeClass: 'bg-[#001e38] text-white', iconClass: 'text-white' },
    { name: 'Gallery', icon: ImageIcon, path: '/admin/gallery', activeClass: 'bg-[#001e38] text-white', iconClass: 'text-white' },
    { name: 'Testimonials', icon: Quote, path: '/admin/testimonials', activeClass: 'bg-[#001e38] text-white', iconClass: 'text-white' },
    {
      name: 'Coverage',
      icon: Globe,
      activeClass: 'bg-[#001e38] text-white',
      iconClass: 'text-white',
      subItems: [
        { name: 'Agriculture Development', path: '/admin/agriculture' },
        { name: 'Local Participation', path: '/admin/local-participation' },
        { name: 'Transform Lives', path: '/admin/transform-lives' },
        { name: 'Water Management', path: '/admin/water-management' },
      ]
    },
    { name: 'Print Media', icon: ImageIcon, path: '/admin/print-media', activeClass: 'bg-[#001e38] text-white', iconClass: 'text-white' },
    { name: 'Reports', icon: FileText, path: '/admin/reports', activeClass: 'bg-[#001e38] text-white', iconClass: 'text-white' },
  ];

  return (
    <div className="admin-panel min-h-screen bg-slate-100 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white text-slate-900 flex flex-col shadow-lg">
        <div className="p-4 border-b border-slate-200">
          <div className="text-center">
            <img src="/assets/img/logo/logo.jpg" alt="Logo" className="h-10 mx-auto" />
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {modules.map((mod, i) => (
              <li key={i}>
                {mod.subItems ? (
                  <div>
                    {(() => {
                      const isActive = mod.subItems.some(s => s.path === location.pathname);
                      return (
                        <button
                          onClick={() => toggleMenu(mod.name)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${isActive ? mod.activeClass : 'hover:bg-slate-100 text-slate-700'}`}
                        >
                          <div className="flex items-center space-x-3">
                            <mod.icon size={18} className={isActive ? mod.iconClass : 'text-slate-700'} />
                            <span className="text-sm font-medium">{mod.name}</span>
                          </div>
                          {openMenus[mod.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      );
                    })()}
                    {openMenus[mod.name] && (
                      <ul className="mt-1 ml-4 space-y-1 border-l border-slate-200 pl-4">
                        {mod.subItems.map((sub, j) => (
                          <li key={j}>
                            <Link
                              to={sub.path}
                              className={`flex items-center p-2 rounded-xl transition-all text-sm ${location.pathname === sub.path
                                ? mod.activeClass
                                : 'text-slate-700 hover:bg-slate-100'
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
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${location.pathname === mod.path
                      ? mod.activeClass
                      : 'text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    <mod.icon size={18} className={location.pathname === mod.path ? mod.iconClass : 'text-slate-700'} />
                    <span className="text-sm font-medium">{mod.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-all py-3 font-semibold"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm border-b border-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{modules.find(m => {
              if (m.path === location.pathname) return true;
              if (m.subItems) return m.subItems.some(s => s.path === location.pathname);
              return false;
            })?.name || 'Admin Panel'}</h2>
            {/* <p className="text-sm text-slate-500 mt-1">Manage content and monitor site activity from here.</p> */}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">{admin?.email}</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                <User size={16} />
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

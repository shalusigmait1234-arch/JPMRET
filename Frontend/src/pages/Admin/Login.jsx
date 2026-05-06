import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../store/api/adminApi';
import { Lock, Mail, Loader2, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      localStorage.setItem('adminToken', result.token);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || 'Authentication failed. Please verify your credentials.');
    }
  };

  return (
    <div className="admin-panel min-h-screen flex items-center justify-center bg-[#f4f7fa] font-['Inter',sans-serif]">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('/assets/img/user-form-bg.jpg')] bg-cover bg-center opacity-10 pointer-events-none"></div>

      <div className="max-w-[450px] w-full mx-4 relative z-10">
        <div className="bg-white rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.1)] overflow-hidden border-b-4 border-[#bd9143]">
          {/* Header Area */}
          <div className="bg-[#001e38] p-8 text-center">
            <img
              src="/assets/img/logo/logo.jpg"
              alt="JPMRET Logo"
              className="h-16 mx-auto mb-4"
            />
            {/* <h2 className="text-2xl font-normal text-white font-['DM_Serif_Display',serif] tracking-wide uppercase">
              Admin Portal
            </h2> */}
          </div>

          {/* Form Area */}
          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <h3 className="text-xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-2">Welcome</h3>
              <p className="text-sm text-gray-500">Authorized access for system administration.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#001e38] uppercase mb-1.5 block tracking-wider">Admin ID / Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-[#bd9143]" />
                    </div>
                    <input
                      type="email"
                      required
                      className="block w-full !pl-12 !pr-4 py-3 bg-[#f9f9f9] border border-[#eee] rounded-md text-sm text-[#333] focus:outline-none focus:border-[#bd9143] focus:bg-white transition-all"
                      placeholder="admin@jpmret.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#001e38] uppercase mb-1.5 block tracking-wider">Secure Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-[#bd9143]" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="block w-full !pl-12 !pr-12 py-3 bg-[#f9f9f9] border border-[#eee] rounded-md text-sm text-[#333] focus:outline-none focus:border-[#bd9143] focus:bg-white transition-all"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#bd9143] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* The undefined 'error' variable was removed as toast.error is used for error handling */}


              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3.5 px-6 text-white text-sm font-bold rounded-md transition-all duration-300 shadow-md group uppercase tracking-widest ${
                  isLoading ? 'bg-black' : 'bg-[#001e38] hover:bg-[#bd9143]'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-gray-400 font-medium">
            © 2024 JPMRET. All Rights Reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/" className="text-[10px] text-[#001e38] hover:text-[#bd9143] font-bold uppercase tracking-tighter">Back to Website</a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-[10px] text-[#001e38] hover:text-[#bd9143] font-bold uppercase tracking-tighter">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

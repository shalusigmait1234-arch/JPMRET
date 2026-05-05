import React from 'react';
import { useGetInquiriesQuery, useGetDashboardStatsQuery } from '../../../store/api/adminApi';
import { FileText, ImageIcon, ShieldCheck, Settings } from 'lucide-react';

const Overview = () => {
  const { data: inquiries } = useGetInquiriesQuery();
  const { data: stats } = useGetDashboardStatsQuery();

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Reports', value: stats?.reports || '0', icon: FileText },
          { label: 'Gallery Items', value: stats?.gallery || '0', icon: ImageIcon },
          { label: 'Inquiries', value: stats?.inquiries || '0', icon: ShieldCheck },
          { label: 'Hero Banners', value: stats?.heroes || '0', icon: Settings },
          { label: 'Achievement Stats', value: stats?.stats || '0', icon: FileText },
          { label: 'Active Services', value: stats?.services || '0', icon: FileText }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:translate-y-[-4px] transition-all duration-300">
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</h4>
              <p className="text-3xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif]">{stat.value}</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-[#f4f7fa] flex items-center justify-center text-[#bd9143] shadow-inner">
              <stat.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-sm font-bold text-[#001e38] uppercase tracking-widest">Recent Inquiries</h3>
          <button className="text-[10px] font-bold text-[#bd9143] hover:underline uppercase tracking-widest">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f9f9f9]">
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sender</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subject</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {inquiries?.slice(0, 5).map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#001e38]">{row.name}</span>
                      <span className="text-[10px] text-gray-400">{row.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 font-medium">{row.subject}</td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
                      row.status === 'New' ? 'bg-blue-100 text-blue-700' : 
                      row.status === 'Read' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              {inquiries?.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
                    No inquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;

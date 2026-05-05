import React from 'react';
import { useGetInquiriesQuery, useGetDashboardStatsQuery } from '../../../store/api/adminApi';
import { FileText, ImageIcon, ShieldCheck, Settings } from 'lucide-react';

const Overview = () => {
  const { data: inquiries } = useGetInquiriesQuery();
  const { data: stats } = useGetDashboardStatsQuery();

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Reports', value: stats?.reports || '0', icon: FileText, card: 'bg-blue-50 border-blue-200', iconBox: 'bg-blue-600 text-white' },
          { label: 'Gallery Items', value: stats?.gallery || '0', icon: ImageIcon, card: 'bg-emerald-50 border-emerald-200', iconBox: 'bg-emerald-600 text-white' },
          { label: 'Inquiries', value: stats?.inquiries || '0', icon: ShieldCheck, card: 'bg-amber-50 border-amber-200', iconBox: 'bg-amber-500 text-white' },
          { label: 'Hero Banners', value: stats?.heroes || '0', icon: Settings, card: 'bg-purple-50 border-purple-200', iconBox: 'bg-purple-600 text-white' },
          { label: 'Achievement Stats', value: stats?.stats || '0', icon: FileText, card: 'bg-rose-50 border-rose-200', iconBox: 'bg-rose-600 text-white' },
          { label: 'Active Services', value: stats?.services || '0', icon: FileText, card: 'bg-cyan-50 border-cyan-200', iconBox: 'bg-cyan-600 text-white' }
        ].map((stat, i) => (
          <div key={i} className={`${stat.card} text-slate-900 p-6 rounded-xl shadow-sm border flex items-center justify-between gap-4 hover:shadow-md transition-all duration-300`}>
            <div>
              <h4 className="text-sm text-slate-600 mb-2">{stat.label}</h4>
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
            </div>
            <div className={`${stat.iconBox} h-10 w-10 flex items-center justify-center rounded-md`}>
              <stat.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-base font-semibold text-slate-900">Recent Inquiries</h3>
          <button className="text-sm text-slate-600 hover:text-slate-900 transition">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-sm font-semibold text-slate-500">Sender</th>
                <th className="px-6 py-3 text-sm font-semibold text-slate-500">Subject</th>
                <th className="px-6 py-3 text-sm font-semibold text-slate-500">Date</th>
                <th className="px-6 py-3 text-sm font-semibold text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries?.slice(0, 5).map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">{row.name}</span>
                      <span className="text-sm text-slate-500">{row.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.subject}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold ${row.status === 'New' ? 'bg-blue-100 text-blue-700' : row.status === 'Read' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              {inquiries?.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-sm text-slate-500">No inquiries found</td>
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


import { useGetInquiriesQuery, useUpdateInquiryStatusMutation } from '../../../store/api/adminApi';
import { Mail, Phone, Calendar, Clock, CheckCircle, Eye, ShieldCheck } from 'lucide-react';
const Inquiries = () => {
  const { data: inquiries, isLoading } = useGetInquiriesQuery();
  const [updateStatus] = useUpdateInquiryStatusMutation();

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#bd9143]"></div></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        {/* <div>
          <h3 className="text-2xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-1">Inquiry Management</h3>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">Manage visitor messages and requests</p>
        </div> */}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {inquiries?.map((inquiry) => (
          <div key={inquiry._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-[#bd9143]/30 transition-all group">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-[#f4f7fa] flex items-center justify-center text-[#001e38] text-sm">
                      {inquiry.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base text-[#001e38]">{inquiry.name}</h4>
                      <p className="text-xs text-gray-400 flex items-center mt-1">
                        <Mail size={12} className="mr-1" /> {inquiry.email}
                        {inquiry.phone && <><span className="mx-2">|</span> <Phone size={12} className="mr-1" /> {inquiry.phone}</>}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f9f9f9] p-4 rounded-lg">
                    <h5 className="text-xs text-[#bd9143] uppercase tracking-widest mb-2">{inquiry.subject}</h5>
                    <p className="text-base text-gray-600 leading-relaxed italic">"{inquiry.message}"</p>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-4 min-w-[150px]">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 flex items-center justify-end">
                      <Calendar size={12} className="mr-1" /> {new Date(inquiry.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-[10px] text-gray-400 flex items-center justify-end mt-1">
                      <Clock size={12} className="mr-1" /> {new Date(inquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2 w-full">
                    <span className={`text-center py-1.5 px-3 rounded-md text-xs font-medium uppercase tracking-widest ${inquiry.status === 'New' ? 'bg-blue-100 text-blue-700' :
                      inquiry.status === 'Read' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                      {inquiry.status}
                    </span>

                    <div className="flex space-x-2">
                      {inquiry.status === 'New' && (
                        <button
                          onClick={() => handleStatusChange(inquiry._id, 'Read')}
                          className="flex-1 flex items-center justify-center p-2 bg-[#001e38] text-white rounded-md hover:bg-[#bd9143] transition-all text-xs uppercase tracking-tighter"
                        >
                          <CheckCircle size={14} className="mr-1" /> Mark Read
                        </button>
                      )}
                      <button className="flex-1 flex items-center justify-center p-2 border border-[#001e38] text-[#001e38] rounded-md hover:bg-gray-50 transition-all text-xs uppercase tracking-tighter">
                        <Eye size={14} className="mr-1" /> View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {inquiries?.length === 0 && (
          <div className="bg-white p-20 rounded-xl border border-dashed border-gray-200 text-center">
            <ShieldCheck size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-base text-gray-400 uppercase tracking-widest">No inquiries found in the database</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquiries;


import { useGetInquiriesQuery, useUpdateInquiryStatusMutation } from '../../../store/api/adminApi';
import { Mail, Phone, Calendar, Clock, CheckCircle, Eye, ShieldCheck, X, User, MessageSquare, Info, Search } from 'lucide-react';
import { useState } from 'react';
import Pagination from '../../../components/Pagination';

const Inquiries = () => {
  const { data: inquiries, isLoading } = useGetInquiriesQuery();
  const [updateStatus] = useUpdateInquiryStatusMutation();
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleViewDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
    // If it was new, mark it as read automatically when viewed?
    if (inquiry.status === 'New') {
      handleStatusChange(inquiry._id, 'Read');
    }
  };

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

  // Filter inquiries based on search
  const filteredInquiries = inquiries?.filter(inquiry => 
    inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Calculate paginated items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInquiries.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-2xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-1">Visitor Inquiries</h3>
            <p className="text-sm text-black font-bold uppercase tracking-widest bg-white border border-gray-100 px-2 py-1 rounded-md shadow-sm ml-2">Manage visitor messages and requests</p>
          </div>
          <span className="bg-[#001e38] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
            Total: {inquiries?.length || 0}
          </span>
        </div>
        <div className="relative group w-full max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-black" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by name, email or subject..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium placeholder:text-black/40 focus:outline-none focus:border-[#bd9143] focus:ring-1 focus:ring-[#bd9143]/20 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentItems.map((inquiry) => (
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
                    <p className="text-base text-black leading-relaxed italic font-medium line-clamp-2">"{inquiry.message}"</p>
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
                      <button
                        onClick={() => handleViewDetails(inquiry)}
                        className="flex-1 flex items-center justify-center p-2 border border-[#001e38] text-[#001e38] rounded-md hover:bg-gray-50 transition-all text-xs uppercase tracking-tighter"
                      >
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
            <ShieldCheck size={48} className="mx-auto text-black mb-24" />
            <p className="text-base text-[#001e38] uppercase tracking-widest">No inquiries found in the database</p>
          </div>
        )}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredInquiries.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isModalOpen && selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2 text-[#013b6d]">
                <Info size={18} />
                <h3 className="text-lg font-black uppercase tracking-widest">Inquiry Details</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-black group-hover:text-red-600 transition-colors bg-white rounded-full p-2 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
              {/* Contact Info Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#001e38]/5 flex items-center justify-center text-[#001e38]">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-black font-black uppercase tracking-[0.1em] shadow-sm bg-white border border-gray-100 px-2 py-1 rounded-md">Full Name</p>
                      <p className="text-base font-bold text-[#001e38]">{selectedInquiry.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#001e38]/5 flex items-center justify-center text-[#001e38]">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-black font-black uppercase tracking-[0.1em] shadow-sm bg-white border border-gray-100 px-2 py-1 rounded-md">Email Address</p>
                      <p className="text-base font-bold text-[#001e38] truncate">{selectedInquiry.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#001e38]/5 flex items-center justify-center text-[#001e38]">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-black font-black uppercase tracking-[0.1em] shadow-sm bg-white border border-gray-100 px-2 py-1 rounded-md">Phone Number</p>
                      <p className="text-base font-bold text-[#001e38]">{selectedInquiry.phone || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#001e38]/5 flex items-center justify-center text-[#001e38]">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-black font-black uppercase tracking-[0.1em] shadow-sm bg-white border border-gray-100 px-2 py-1 rounded-md">Received On</p>
                      <p className="text-base font-bold text-[#001e38]">
                        {new Date(selectedInquiry.createdAt).toLocaleDateString()} at {new Date(selectedInquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare size={16} className="text-[#bd9143]" />
                  <p className="text-[10px] text-black font-black uppercase tracking-[0.2em] shadow-sm bg-white border border-gray-100 px-2 py-1 rounded-md mb-2 inline-block">Message Content</p>
                </div>
                <div className="space-y-4">
                  <div className="pb-3 border-b border-gray-200">
                    <p className="text-xs font-bold text-[#bd9143] uppercase tracking-widest mb-1">Subject</p>
                    <p className="text-lg font-bold text-[#001e38]">{selectedInquiry.subject}</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-base text-black leading-relaxed italic font-medium whitespace-pre-wrap">
                      "{selectedInquiry.message}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-3 bg-[#001e38] text-white rounded-xl hover:bg-[#bd9143] transition-all font-bold text-xs uppercase tracking-widest shadow-md"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;


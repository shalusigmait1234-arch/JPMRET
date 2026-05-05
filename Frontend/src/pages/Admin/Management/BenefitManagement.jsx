import React, { useState } from 'react';
import {
  useGetBenefitsListQuery,
  useCreateBenefitMutation,
  useUpdateBenefitMutation,
  useDeleteBenefitMutation
} from '../../../store/api/adminApi';
import {
  Save,
  Trash2,
  Plus,
  RefreshCw,
  Type,
  FileText,
  Heart,
  ArrowUpDown,
  Edit2
} from 'lucide-react';

const BenefitManagement = () => {
  const { data: benefits, isLoading } = useGetBenefitsListQuery();
  const [createBenefit, { isLoading: creating }] = useCreateBenefitMutation();
  const [updateBenefit, { isLoading: updating }] = useUpdateBenefitMutation();
  const [deleteBenefit] = useDeleteBenefitMutation();

  const [formData, setFormData] = useState({
    title: '',
    icon: 'fa fa-check',
    description: '',
    order: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const resetForm = () => {
    setFormData({ title: '', icon: 'fa fa-check', description: '', order: 0 });
    setEditingId(null);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (benefit) => {
    setFormData({
      title: benefit.title,
      icon: benefit.icon || 'fa fa-check',
      description: benefit.description,
      order: benefit.order || 0
    });
    setEditingId(benefit._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this benefit?')) {
      try {
        await deleteBenefit(id).unwrap();
        setMessage({ type: 'success', text: 'Benefit deleted successfully!' });
        if (editingId === id) resetForm();
      } catch {
        setMessage({ type: 'error', text: 'Failed to delete benefit.' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      if (editingId) {
        await updateBenefit({ id: editingId, ...formData }).unwrap();
        setMessage({ type: 'success', text: 'Benefit updated successfully!' });
      } else {
        await createBenefit(formData).unwrap();
        setMessage({ type: 'success', text: 'Benefit created successfully!' });
        resetForm();
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to save benefit.' });
    }
  };

  if (isLoading) return (
    <div className="p-20 text-center">
      <RefreshCw className="animate-spin h-8 w-8 text-[#bd9143] mx-auto" />
    </div>
  );

  const saving = creating || updating;

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-end">
        {/* <div>
          <h3 className="text-2xl font-normal text-[#013b6d] font-['DM_Serif_Display',serif] mb-1">
            What Drives Us
          </h3>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">
            Manage the commitment/benefits section on the homepage
          </p>
        </div> */}
        {editingId && (
          <button
            onClick={resetForm}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <Plus size={14} />
            <span>Add New Instead</span>
          </button>
        )}
      </div>

      {message.text && (
        <div className={`p-4 rounded-lg text-sm font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Type size={14} className="text-[#bd9143]" />
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Title</label>
                </div>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                  placeholder="e.g. Agriculture development"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={14} className="text-[#bd9143]" />
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Icon Class</label>
                </div>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                  placeholder="e.g. fa fa-leaf"
                  required
                />
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">FontAwesome class name</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={14} className="text-[#bd9143]" />
                <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Description</label>
              </div>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="2"
                className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all resize-none"
                placeholder="Enter description"
                required
              />
            </div>

            <div className="space-y-2 w-full md:w-1/2 md:pr-3">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpDown size={14} className="text-[#bd9143]" />
                <label className="text-sm font-bold text-gray-900 uppercase tracking-widest">Display Order</label>
              </div>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-medium focus:outline-none focus:border-[#bd9143] transition-all"
                placeholder="0"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="min-w-[200px] flex items-center justify-center space-x-3 py-2.5 px-6 bg-[#001e38] text-white rounded-lg hover:bg-[#bd9143] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
              >
                <Save size={18} />
                <span className="text-sm font-bold uppercase tracking-widest">
                  {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview */}
        {/* <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Homepage Preview</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(benefits && benefits.length > 0 ? benefits : [
                { title: "Example Title", icon: "fa fa-leaf", description: "Example description text goes here.", order: 0 }
              ]).map((benefit, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-all">
                  <div className="h-16 w-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4 text-[#bd9143] text-2xl">
                    <i className={benefit.icon}></i>
                  </div>
                  <h3 className="text-lg font-bold text-[#013b6d] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* List Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Existing Benefits</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest">Icon</th>
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest">Content</th>
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest">Order</th>
                  <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {benefits && benefits.length > 0 ? (
                  benefits.map((benefit) => (
                    <tr key={benefit._id} className={`group hover:bg-gray-50/50 transition-all ${editingId === benefit._id ? 'bg-[#bd9143]/5' : ''}`}>
                      <td className="py-4 px-6">
                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-[#bd9143]">
                          <i className={benefit.icon}></i>
                        </div>
                      </td>
                      <td className="py-4 px-6 min-w-[200px]">
                        <h5 className="text-base font-bold text-[#001e38]">{benefit.title}</h5>
                        <p className="text-[13px] text-gray-500 line-clamp-1 mt-1">{benefit.description}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{benefit.order}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(benefit)}
                            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${editingId === benefit._id ? 'bg-[#bd9143] text-white' : 'bg-gray-100 text-[#013b6d] hover:bg-[#013b6d] hover:text-white'}`}
                          >
                            <Edit2 size={12} />
                            {/* <span>Edit</span> */}
                          </button>
                          <button
                            onClick={() => handleDelete(benefit._id)}
                            className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
                          >
                            <Trash2 size={12} />
                            {/* <span>Delete</span> */}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-20 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                      No benefits found. Add one above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitManagement;

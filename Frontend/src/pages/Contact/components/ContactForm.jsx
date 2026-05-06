import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSubmitInquiryMutation } from '../../../store/api/contactApi';
import { allowOnlyText, allowOnlyPhoneNumber } from '../../../utils/validation';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [submitInquiry, { isLoading }] = useSubmitInquiryMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === 'name') {
      finalValue = allowOnlyText(value);
    } else if (name === 'phone') {
      finalValue = allowOnlyPhoneNumber(value);
    }

    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    try {
      await submitInquiry(formData).unwrap();
      setStatusMsg({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setStatusMsg({ 
        type: 'error', 
        text: err?.data?.message || 'Failed to send message. Please try again later.' 
      });
    }
  };

  return (
    <section className="pt-0 pb-20 bg-white">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="w-full lg:w-7/12">
            <div className="bg-white p-6 md:p-8 rounded-lg border border-[#d3a047] shadow-sm">
              <div className="mb-6">
                <h2 className="mb-4">Let's talk...!</h2>
                <p className="text-[#45443F] text-[16px] leading-relaxed">
                  Let's talk and explore how we can work together to create meaningful impact. Whether you have an idea, a project, or a partnership opportunity, we are always open to discussion and collaboration. Reach out to us to share your thoughts, ask questions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d3a047]">
                      <i className="icofont-user-alt-3"></i>
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      className="w-full pl-12 pr-4 py-3 bg-white border border-[#d3a047]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#bd9143] focus:border-[#bd9143] transition-all" 
                      placeholder="Name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative">
                    <label className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d3a047]">
                      <i className="icofont-ui-call"></i>
                    </label>
                    <input 
                      type="text" 
                      name="phone" 
                      className="w-full pl-12 pr-4 py-3 bg-white border border-[#d3a047]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#bd9143] focus:border-[#bd9143] transition-all" 
                      placeholder="Phone" 
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="relative mb-4">
                  <label className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d3a047]">
                    <i className="icofont-ui-email"></i>
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    className="w-full pl-12 pr-4 py-3 bg-white border border-[#d3a047]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#bd9143] focus:border-[#bd9143] transition-all" 
                    placeholder="Email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <label className="absolute left-4 top-4 text-[#d3a047]">
                    <i className="icofont-comment"></i>
                  </label>
                  <textarea 
                    name="message" 
                    className="w-full pl-12 pr-4 py-3 bg-white border border-[#d3a047]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#bd9143] focus:border-[#bd9143] transition-all" 
                    rows="3" 
                    placeholder="Message" 
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {statusMsg.text && (
                  <div className={`p-4 rounded-lg text-sm font-bold border ${
                    statusMsg.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {statusMsg.text}
                  </div>
                )}

                <button 
                  type="submit" 
                  className={`w-full md:w-auto text-white px-10 py-3 rounded-md font-bold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                    isLoading ? 'bg-black' : 'bg-[#001e38] hover:bg-[#bd9143]'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Send Message'} 
                  {!isLoading && <i className="icofont-arrow-right text-lg"></i>}
                </button>
              </form>
            </div>
          </div>

          <div className="w-full lg:w-5/12">
            <div className="h-full min-h-[350px] lg:min-h-full rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d113888.99216154497!2d80.9813931!3d26.870756!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be293119dc895%3A0x27ccd542ed8111f5!2s3%2F132%2C%203%2F132%2C%20Vijayipur%2C%20Vishesh%20Khand%202%2C%20Gomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226010!5e0!3m2!1sen!2sin!4v1777380377793!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

import React, { useState } from 'react';
import { useSubmitInquiryMutation } from '../../../store/api/contactApi';
import { allowOnlyText, allowOnlyPhoneNumber } from '../../../utils/validation';
import { User, Phone, Mail, MessageSquare, Send } from 'lucide-react';

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

    if (name === 'name') finalValue = allowOnlyText(value);
    if (name === 'phone') finalValue = allowOnlyPhoneNumber(value);

    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    try {
      await submitInquiry(formData).unwrap();
      setStatusMsg({
        type: 'success',
        text: 'Thank you! Your message has been sent successfully.'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (err) {
      setStatusMsg({
        type: 'error',
        text: 'Failed to send message. Please try again later.'
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-7">
        <div className="flex flex-wrap lg:flex-nowrap gap-6 items-stretch">
          {/* LEFT - FORM */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white p-6 md:p-8 rounded-lg border border-[#d3a047] shadow-sm h-full">
              <div className="mb-6">
                <h2 className="mb-4 text-[#013b6d] text-4xl font-normal font-['DM_Serif_Display',serif]">Let's talk...!</h2>
                <p className="text-[#45443F] text-[16px] leading-relaxed">
                  Let's talk and explore how we can work together to create meaningful impact. Whether you have an idea, a project, or a partnership opportunity, we are always open to discussion and collaboration. Reach out to us to share your thoughts, ask questions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d3a047]">
                      <User size={18} />
                    </div>
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
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d3a047]">
                      <Phone size={18} />
                    </div>
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

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d3a047]">
                    <Mail size={18} />
                  </div>
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
                  <div className="absolute left-4 top-4 text-[#d3a047]">
                    <MessageSquare size={18} />
                  </div>
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
                  <div className={`p-4 rounded-lg text-sm font-bold border ${statusMsg.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                    {statusMsg.text}
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full md:w-auto text-white px-10 py-3 rounded-md font-bold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isLoading ? 'bg-black' : 'bg-[#001e38] hover:bg-[#bd9143]'
                    }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Send Message'}
                  {!isLoading && <Send size={18} />}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT - MAP */}
          <div className="w-full lg:w-5/12">
            <div className="rounded-lg overflow-hidden border border-[#d3a047] h-full min-h-[400px] shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.431281488126!2d81.00287107522245!3d26.8580554624118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be29352e859b9%3A0x6b443c0a5240292b!2s3%2F132%2C%20Visesh%20Khand%2C%20Gomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226010!5e0!3m2!1sen!2sin!4v1714811802340!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast, Toaster } from 'react-hot-toast';
import Card from './ui/Card';
import SectionTitle from './ui/SectionTitle';

// Replace these with your EmailJS credentials
const SERVICE_ID = "service_xkgk115";
const TEMPLATE_ID = "template_22t3tdb";
const PUBLIC_KEY = "xjyITGetEMbT-HlJz";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.1),transparent_50%)]" />
          <div className="relative z-10">
            <SectionTitle>Get in Touch</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-100 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, text: 'softwaredev1112@gmail.com' },
                    { icon: Phone, text: '+91 9871885699' },
                    { icon: MapPin, text: 'Delhi, India' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-slate-400">
                      <item.icon size={20} className="text-violet-400" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: 'name', type: 'text', label: 'Name', required: true },
                  { id: 'email', type: 'email', label: 'Email', required: true }
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-slate-300 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id as keyof FormData]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg 
                               text-slate-100 focus:ring-2 focus:ring-violet-600 focus:border-transparent
                               placeholder-slate-500"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg 
                             text-slate-100 focus:ring-2 focus:ring-violet-600 focus:border-transparent
                             placeholder-slate-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white py-2 px-6 rounded-lg 
                           font-medium hover:from-violet-700 hover:to-pink-700 transition-colors relative group
                           disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 blur-lg 
                                opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
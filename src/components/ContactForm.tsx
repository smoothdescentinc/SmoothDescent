import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'rate-limited' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else if (response.status === 429) {
                setStatus('rate-limited');
                setErrorMessage(data.message || 'Too many requests');
            } else {
                setStatus('error');
                setErrorMessage(data.message || 'Something went wrong');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Failed to send message. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-green-900 mb-2">Message Sent!</h3>
                <p className="text-green-800">Thank you for reaching out. We'll get back to you shortly.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-green-700 font-bold underline hover:text-green-900"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-brand-primary/10">
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-bold text-brand-dark mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        required
                        placeholder="Jane Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-gray-400"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-brand-dark mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-gray-400"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-brand-dark mb-2">Subject (Optional)</label>
                    <select
                        id="subject"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all bg-white"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                        <option value="">Select a topic...</option>
                        <option value="Product Question">Product Question</option>
                        <option value="Order Support">Order Support</option>
                        <option value="Wholesale">Wholesale/Partnership</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-bold text-brand-dark mb-2">Message</label>
                    <textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                {(status === 'error' || status === 'rate-limited') && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-red-800 text-sm">{errorMessage}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brand-dark hover:bg-brand-primary text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;

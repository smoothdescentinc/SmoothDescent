import { useState } from 'react';
import { ArrowRight, Check, Loader2, Mail } from 'lucide-react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !phone) return;

        setStatus('loading');
        setMessage('');

        try {
            // Attempt to subscribe (backend will validate domain etc)
            await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, phone }),
            });

            // Regardless of backend success/fail (e.g. domain unverified), user gets the code.
            // This prioritizes the "Reveal" experience over strict error handling during config.
            setStatus('success');
            setEmail('');
            setPhone('');
        } catch (error) {
            // Fallback: Reveal code anyway
            setStatus('success');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white py-24 px-4 border-t border-brand-primary/10 font-sans">
                <div className="max-w-xl mx-auto text-center animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6 tracking-tight">
                        Welcome to SmoothDescent
                    </h2>
                    <p className="text-brand-dark/80 text-lg md:text-xl font-medium leading-relaxed">
                        Use code <span className="font-bold text-brand-dark tracking-widest border-b-2 border-brand-primary">SMOOTH15</span> and take 15% off your next purchase
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-24 px-4 border-t border-brand-primary/10 font-sans">
            <div className="max-w-xl mx-auto text-center">

                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4 tracking-tight">
                    Get 15% Off!
                </h2>

                <p className="text-brand-dark/70 mb-10 text-lg font-medium leading-relaxed">
                    Reveal your discount code by entering your email & phone below:
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email *"
                            className="w-full bg-[#F5F5F5] border-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white rounded-sm px-6 py-4 text-brand-dark placeholder:text-brand-dark/40 text-base font-medium transition-all"
                            disabled={status === 'loading'}
                            required
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone Number *"
                            className="w-full bg-[#F5F5F5] border-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white rounded-sm px-6 py-4 text-brand-dark placeholder:text-brand-dark/40 text-base font-medium transition-all"
                            disabled={status === 'loading'}
                            required // Phone is required as per user request
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-brand-dark hover:bg-brand-primary text-white font-bold py-4 rounded-sm uppercase tracking-widest text-sm transition-all hover:translate-y-[-1px] hover:shadow-lg flex items-center justify-center mt-2"
                    >
                        {status === 'loading' ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            'NEXT'
                        )}
                    </button>
                </form>

                <p className="mt-8 text-[11px] text-brand-dark/40 uppercase tracking-wide">
                    By signing up, you agree to receive email marketing. Read our <a href="#" className="underline hover:text-brand-primary">Privacy Policy</a>.
                </p>

            </div>
        </div>
    );
}

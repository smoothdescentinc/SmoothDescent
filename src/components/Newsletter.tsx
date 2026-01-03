import { useState } from 'react';
import { ArrowRight, Check, Loader2, Mail } from 'lucide-react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        setMessage('');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Something went wrong');

            setStatus('success');
            setMessage('Welcome to the family! Check your inbox for your code.');
            setEmail('');
        } catch (error) {
            setStatus('error');
            setMessage(error instanceof Error ? error.message : 'Please try again.');
        } finally {
            if (status !== 'success') {
                setTimeout(() => setStatus('idle'), 3000);
            }
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white py-24 px-4 border-t border-gray-100 font-sans">
                <div className="max-w-md mx-auto text-center animate-fade-in">
                    <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
                    <p className="text-gray-600">Check your inbox for your 10% off code.</p>
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
                    Reveal your discount code by entering your email below:
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md mx-auto">
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

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-brand-dark hover:bg-brand-primary text-white font-bold py-4 rounded-sm uppercase tracking-widest text-sm transition-all hover:translate-y-[-1px] hover:shadow-lg flex items-center justify-center"
                    >
                        {status === 'loading' ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            'NEXT'
                        )}
                    </button>
                </form>

                {status === 'error' && (
                    <p className="mt-4 text-brand-accent font-medium animate-slide-up">
                        {message}
                    </p>
                )}

                <p className="mt-8 text-[11px] text-brand-dark/40 uppercase tracking-wide">
                    Our emails have no unnecessary additives or fillers. Read our <a href="#" className="underline hover:text-brand-primary">Privacy Policy</a>.
                </p>

            </div>
        </div>
    );
}

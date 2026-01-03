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
            <div className="bg-green-50/10 border border-green-500/20 text-green-400 p-4 rounded-lg flex items-center gap-3 animate-fade-in shadow-sm backdrop-blur-sm">
                <div className="bg-green-500/10 p-2 rounded-full">
                    <Check className="w-5 h-5" />
                </div>
                <p className="font-medium">{message}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm relative group">
            <div className="relative flex items-center">
                <Mail className="absolute left-3 w-5 h-5 text-zinc-500 group-focus-within:text-brand-primary transition-colors" />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for 10% off"
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-lg py-3 pl-10 pr-12 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all shadow-inner"
                    disabled={status === 'loading'}
                    required
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-1.5 p-2 bg-brand-primary hover:bg-brand-accent text-white rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg shadow-brand-primary/20"
                    aria-label="Subscribe"
                >
                    {status === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <ArrowRight className="w-4 h-4" />
                    )}
                </button>
            </div>
            {status === 'error' && (
                <p className="absolute -bottom-6 left-1 text-sm text-red-400 animate-slide-up">
                    {message}
                </p>
            )}
            <div className="absolute inset-0 bg-brand-primary/5 rounded-lg blur-xl -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        </form>
    );
}

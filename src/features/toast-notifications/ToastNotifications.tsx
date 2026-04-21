import React, { useEffect, useRef } from 'react';
import './toast-notifications.css';
import { useInteractionStore } from '@/store';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastMessage = {
    id: string;
    message: string;
    type?: ToastType;
    duration?: number;
};

export function ToastNotifications() {
    const toasts = useInteractionStore((s) => s.toasts);

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} />
            ))}
        </div>
    );
}

function ToastItem({ toast }: { toast: ToastMessage }) {
    const removeToast = useInteractionStore((s) => s.removeToast);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Calculate duration: base duration + bonus time for long text
    const getDuration = () => {
        if (toast.duration) return toast.duration;
        // Basic readability logic: add 1s for every 50 characters
        const extraTime = Math.floor(toast.message.length / 50) * 1000;
        return 3000 + extraTime;
    };

    const startTimer = () => {
        // If it's an error, you might want it to stay until dismissed manually
        // if (toast.type === 'error') return;

        timerRef.current = setTimeout(() => {
            removeToast(toast.id);
        }, getDuration());
    };

    const clearTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    useEffect(() => {
        startTimer();
        return clearTimer; // Cleanup on unmount
    }, []);

    return (
        <div
            className={`toast toast-${toast.type ?? 'info'}`}
            onMouseEnter={clearTimer}
            onMouseLeave={startTimer}
        >
            <span className="toast-message">{toast.message}</span>
            <button className="toast-close-btn" onClick={() => removeToast(toast.id)}>
                ×
            </button>
        </div>
    );
}

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
    const removeToast = useInteractionStore((s) => s.removeToast);

    const timers = useRef<Map<string, NodeJS.Timeout>>(new Map());

    const schedule = (toast: ToastMessage) => {
        const duration = toast.duration ?? 3000;

        const timer = setTimeout(() => {
            removeToast(toast.id);
            timers.current.delete(toast.id);
        }, duration);

        timers.current.set(toast.id, timer);
    };

    useEffect(() => {
        // start timers for new toasts
        toasts.forEach((t) => {
            if (!timers.current.has(t.id)) {
                schedule(t);
            }
        });

        // cleanup removed toasts
        timers.current.forEach((timer, id) => {
            if (!toasts.find((t) => t.id === id)) {
                clearTimeout(timer);
                timers.current.delete(id);
            }
        });
    }, [toasts]);

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div key={toast.id} className={`toast toast-${toast.type ?? 'info'}`}>
                    <span>{toast.message}</span>
                    <button onClick={() => removeToast(toast.id)}>×</button>
                </div>
            ))}
        </div>
    );
}

import React, { useState, useEffect } from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'info';
    duration?: number;
}

const Notification: React.FC<NotificationProps> = ({ message, type, duration = 3000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
};

export default Notification;
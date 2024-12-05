import React, { useState, useEffect } from 'react';

export const Loader = ({ loading }: { loading: number }) => {
    const [width, setWidth] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (loading === 1) {
            const id = setInterval(() => {
                setWidth((prevWidth) => {
                    if (prevWidth >= 100) {
                        clearInterval(id)
                        return 0;
                    }
                    return prevWidth + 1;
                });
            }, 1);
            setIntervalId(id);
            return () => {
                clearInterval(id);
            };

        } else if (loading === 0) {
            const id = setInterval(() => {
                setWidth((prevWidth) => {
                    if (prevWidth >= 33) {
                        return 33;
                    }
                    return prevWidth + 1;
                });
            }, 20);
            setIntervalId(id);

            return () => {
                clearInterval(id);
            };
        }
    }, [loading]);

    return <div className="loader" style={{ width: `${width}%` }}></div>
};

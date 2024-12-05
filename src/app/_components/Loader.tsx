import React, { useState, useEffect } from 'react';

export const Loader = ({ loading, setLoading }: { loading: number, setLoading: React.Dispatch<React.SetStateAction<number>> }) => {
    const [width, setWidth] = useState(0);
    console.log("loading", loading)
    useEffect(() => {
        let id: NodeJS.Timeout;

        if (loading === 1) {
            id = setInterval(() => {
                setWidth((prevWidth) => {
                    if (prevWidth >= 100) {
                        clearInterval(id)
                        return 0;
                    }
                    return prevWidth + 1;
                });
            }, 1);
        } else if (loading === 0) {
            id = setInterval(() => {
                setWidth((prevWidth) => {
                    if (prevWidth >= 33) {
                        clearInterval(id)
                        return 33;
                    }
                    return prevWidth + 1;
                });
            }, 20);
        }
    }, [loading]);

    return <div className="loader" style={{ width: `${width}%` }}></div>
};

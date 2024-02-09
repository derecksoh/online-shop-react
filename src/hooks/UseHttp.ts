import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url: string, config: RequestInit): Promise<any> {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(
            resData.message || 'Something wrong, could not send request'
        );
    }

    return resData;
}

export default function useHttp(url: string, config: RequestInit, initialData: any) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(data?: any) {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, { ...config, body: data });
            setData(resData);
        } catch (error) {
            setError(typeof error === 'string' ? error : 'Something went wrong!');
        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    };
}
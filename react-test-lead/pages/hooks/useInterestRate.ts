import { useState, useEffect } from 'react';
import { InterestRateResult } from '../types/types';

export function useInterestRate(): InterestRateResult {
    const [result, setResult] = useState<InterestRateResult>({
        rate: null,
        isLoading: true,
        error: null,
        source: null
    });

    useEffect(() => {
        const fetchInterestRate = async () => {
            try {
                const response = await fetch('/api/getInterestRate');
                if (!response.ok) {
                    throw new Error(`API returned status: ${response.status}`);
                }

                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error);
                }

                setResult({
                    rate: data.interestRate,
                    isLoading: false,
                    error: null,
                    source: data.source || 'api'
                });
            } catch (error) {
                console.error('Error fetching interest rate:', error);
                const defaultInterestRates = Number(process.env.NEXT_PUBLIC_INTEREST_RATE) || 4.5;
                setResult({
                    rate: defaultInterestRates,
                    isLoading: false,
                    error: error instanceof Error ? error.message : 'Unknown error',
                    source: 'fallback'
                });
            }
        };

        fetchInterestRate();
    }, []);

    return result;
}
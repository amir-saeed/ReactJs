export interface YearlyBreakdown {
    year: number;
    remainingDebt: number;
}

export interface MortgageResults {
    monthlyPayment: number;
    totalRepayment: number;
    capital: number;
    interest: number;
    affordabilityCheck: number;
    breakdown: YearlyBreakdown[];
}

export interface InterestRateResult {
    rate: number | null;
    isLoading: boolean;
    error: string | null;
    source: 'api' | 'fallback' | null;
}
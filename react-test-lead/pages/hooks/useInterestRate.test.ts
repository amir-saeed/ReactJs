import { renderHook, waitFor } from '@testing-library/react';
import { useInterestRate } from './useInterestRate';

global.fetch = jest.fn();

describe('useInterestRate hook', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('returns correct default values initially', () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ rate: 4.5 }),
    });

    const { result } = renderHook(() => useInterestRate());

    expect(result.current).toBeDefined();
    expect(result.current.isLoading).toBe(true);
  });

  it('returns fetched rate correctly after loading', async () => {
    const mockedRate = 4.5;

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ interestRate: mockedRate, source: 'api' }),
    });

    const { result } = renderHook(() => useInterestRate());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.rate).toBe(mockedRate);
    expect(result.current.error).toBeNull();
    expect(result.current.source).toBe('api');
  });

  it('handles fetch errors and returns fallback rate', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => useInterestRate());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.rate).toBe(4.5);
    expect(result.current.error).toBe('Failed to fetch');
    expect(result.current.source).toBe('fallback');
  });
});


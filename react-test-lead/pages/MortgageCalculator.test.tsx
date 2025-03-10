import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MortgageCalculator from '../pages/index';
import { useInterestRate } from '../pages/hooks/useInterestRate';

jest.mock('../pages/hooks/useInterestRate');

describe('MortgageCalculator Component', () => {
  beforeEach(() => {
    (useInterestRate as jest.Mock).mockReturnValue({
      rate: 5.25,
      isLoading: false,
      error: null,
      source: 'Mock Source',
    });

    render(<MortgageCalculator />);
  });

  it('renders input fields and calculate button', () => {
    expect(screen.getByLabelText(/Property Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mortgage Term/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calculate/i })).toBeInTheDocument();
  });

  it('calculates and displays mortgage results correctly', async () => {
    fireEvent.change(screen.getByLabelText(/Property Price/i), { target: { value: '250000' } });
    fireEvent.change(screen.getByLabelText(/Deposit/i), { target: { value: '50000' } });

    fireEvent.change(screen.getByLabelText(/Mortgage Term/i), { target: { value: '25' } });

    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    await waitFor(() => {
      expect(screen.getByText(/Monthly Payment/i)).toBeInTheDocument();
      expect(screen.getByText(/^Interest$/)).toBeInTheDocument();

    });
  });
});




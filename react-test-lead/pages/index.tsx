'use client';


import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import { formatCurrency } from "../utils/formatCurrency";
import { useEffect, useState } from "react";
import { calculateMonthlyPayment } from "@/utils/MortgageCalculator/calculateRepayment";
import { useInterestRate } from "./hooks/useInterestRate";
import { MortgageResults, YearlyBreakdown } from "./types/types";

export default function MortgageCalculator() {
  const defaultPrice = Number(process.env.NEXT_PUBLIC_DEFAULT_PROPERTY_PRICE) || 100000; 
  const [propertyPrice, setPropertyPrice] = useState<number>(defaultPrice);

  const defaultDeposit = Number(process.env.NEXT_PUBLIC_DEFAULT_DEPOSIT) || 5000; 
  const [deposit, setDeposit] = useState<number>(defaultDeposit);

  const defaultMortageTerm = Number(process.env.NEXT_PUBLIC_MORGAGE_TERM) || 15; 
  const [mortgageTerm, setMortgageTerm] = useState<number>(defaultMortageTerm);
  
  const defaultInterestRates = Number(process.env.NEXT_PUBLIC_INTEREST_RATE) || 4.5; 
  const [interestRate, setInterestRate] = useState<number>(defaultInterestRates);

  const [results, setResults] = useState<MortgageResults | null>(null);
  const { rate, isLoading, error, source } = useInterestRate();

  const calculateMortgage = (event: React.FormEvent) => {
    event.preventDefault();

    const loanAmount = propertyPrice - deposit;
    const monthlyPayment = calculateMonthlyPayment(propertyPrice, deposit, interestRate, mortgageTerm);
    const totalRepayment = monthlyPayment * mortgageTerm * 12;
    const interestPaid = totalRepayment - loanAmount;

    const increasedInterestRate = interestRate + 3;
    const increasedMonthlyPayment = calculateMonthlyPayment(propertyPrice, deposit, increasedInterestRate, mortgageTerm);

    let remainingDebt = loanAmount;
    const yearlyBreakdown: YearlyBreakdown[] = [{ year: 0, remainingDebt: loanAmount }];

    for (let year = 1; year <= mortgageTerm; year++) {
      for (let month = 1; month <= 12; month++) {
        const interestForMonth = (remainingDebt * (interestRate / 100)) / 12;
        const capitalForMonth = monthlyPayment - interestForMonth;
        remainingDebt -= capitalForMonth;
      }
      yearlyBreakdown.push({
        year,
        remainingDebt: Math.max(0, Math.round(remainingDebt))
      });
    }

    setResults({
      monthlyPayment,
      totalRepayment,
      capital: loanAmount,
      interest: interestPaid,
      affordabilityCheck: increasedMonthlyPayment,
      breakdown: yearlyBreakdown,
    });
  };

  useEffect(() => {
    if (rate !== null) {
      setInterestRate(rate);
    }
  }, [rate]);

  return (
    <Container>
      <title>Mortgage Calculator Test</title>
      <Row className="gap-x-10 pt-3">
        <Col className="border-r" md="auto">
          <Form onSubmit={calculateMortgage}>
            <Form.Label htmlFor="price">Property Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>£</InputGroup.Text>
              <Form.Control
                id="price"
                name="price"
                type="number"
                value={propertyPrice}
                className="no-spinner"
                step="any"
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
              />
            </InputGroup>
            <Form.Label htmlFor="deposit">Deposit</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>£</InputGroup.Text>
              <Form.Control
                id="deposit"
                name="deposit"
                type="number"
                className="no-spinner"
                step="any"
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
              />



            </InputGroup>

            <Form.Label htmlFor="term">Mortgage Term</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                id="term"
                name="term"
                type="number"
                step="any"

                value={mortgageTerm}
                onChange={(e) => setMortgageTerm(Number(e.target.value))}
              />
              <InputGroup.Text>years</InputGroup.Text>
            </InputGroup>
            <Form.Label htmlFor="interest">Interest rate{isLoading && <Spinner animation="border" size="sm" />}</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                id="interest"
                name="interest"
                type="number"
                step="any"
                className="no-spinner"

                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
            <Button className="w-full" variant="primary" type="submit">
              Calculate
            </Button>
          </Form>
        </Col>
        {results && (
          <>
            <Col md="auto">
              <h2 className="pb-3">Results</h2>
              <Table striped="columns">
                <tbody>
                  <tr className="border-b border-t">
                    <td>Monthly Payment</td>
                    <td className="text-right">{formatCurrency(Number(results?.monthlyPayment.toFixed(2)))}</td>
                  </tr>
                  <tr className="border-b">
                    <td>Total Repayment</td>
                    <td className="text-right">{formatCurrency(Number(results?.totalRepayment.toFixed(2)))}</td>
                  </tr>
                  <tr className="border-b">
                    <td>Capital</td>
                    <td className="text-right">{formatCurrency(Number(results?.capital.toFixed(2)))}</td>
                  </tr>
                  <tr className="border-b">
                    <td>Interest</td>
                    <td className="text-right">{formatCurrency(Number(results?.interest.toFixed(2)))}</td>
                  </tr>
                  <tr className="border-b">
                    <td>Affordability check</td>
                    <td className="text-right">{formatCurrency(Number(results?.affordabilityCheck.toFixed(2)))}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>

            <Col md="auto">
              <h2 className="pb-3">Yearly Breakdown</h2>
              <Table className="max-w-52" bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Remaining Debt</th>
                  </tr>
                </thead>
                <tbody>
                  {results.breakdown.map((item: any) => (
                    <tr key={item.year}>
                      <td>{item.year}</td>
                      <td>£{item.remainingDebt.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </>
        )}

      </Row>
    </Container>
  );
}

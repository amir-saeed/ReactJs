import { calculateMonthlyPayment } from "./calculateRepayment";

describe("calculateMonthlyPayment", () => {
  test("should calculate the correct monthly payment with interest", () => {
    const result = calculateMonthlyPayment(300000, 60000, 3.5, 30);
    expect(result).toBeCloseTo(1077.71, 2);
  });

  test("should calculate the correct monthly payment without interest", () => {
    const result = calculateMonthlyPayment(300000, 60000, 0, 30);
    expect(result).toBeCloseTo(666.67, 2);
  });

  test("should calculate the correct monthly payment with a different term", () => {
    const result = calculateMonthlyPayment(300000, 60000, 3.5, 15);
    expect(result).toBeCloseTo(1715.72, 2);
  });
});

/**
 * Formats a number as currency.
 * @param amount - The number to format.
 * @param decimalPlaces - The number of decimal places to include in the formatted currency. Default is 2.
 * @returns The formatted currency as a string.
 */
export function formatCurrency(
  amount: number,
  decimalPlaces: number = 2
): string {
  const currency = "GBP";
  const locale = "en-GB";

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return formatter.format(amount);
}

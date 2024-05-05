/**
 *
 * @param {{
 *  initialValue: number;
 *  icPeriod: number;
 *  icPeriodUnit: number;
 *  icInterestRate: number;
 *  icInterestPeriod: number;
 *  icPeriodicValue: number;
 * }} param0
 * @returns {{
 *   total: number;
 *   totalInvested: number;
 *   totalInterest: number;
 * }}
 */
export function calcInterest({
  initialValue,
  icPeriod,
  icPeriodUnit,
  icInterestRate,
  icInterestPeriod,
  icPeriodicValue,
}) {
  const periodMonths = icPeriod * icPeriodUnit;
  const monthlyInterestRate =
    Math.pow(icInterestRate / 100 + 1, 1 / icInterestPeriod) - 1;

  let total = initialValue;
  let totalInvested = initialValue;
  let totalInterest = 0;

  for (let i = 0; i < periodMonths; i++) {
    const interest = total * monthlyInterestRate;
    totalInvested += icPeriodicValue;
    totalInterest += interest;
    total += icPeriodicValue + interest;
  }

  return {
    total,
    totalInterest,
    totalInvested,
  };
}

// Currency utility: format an amount (already in rupees) as ₹.
// Return.price is stored directly in INR — no unit conversion needed here.
export function formatINR(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

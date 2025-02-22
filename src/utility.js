export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}


export const COLORS = [
  "#0088FE", // Blue
  "#00C49F", // Green
  "#FFBB28", // Yellow
  "#FF8042", // Orange
  "#AF19FF", // Violet
  "#8884d8", // Purple
  "#82ca9c", // Teal
  "#FF5733", // Red-orange
  "#3498db", // Light blue
  "#2ecc71", // Emerald green
];

export const percent = (total, perc) => {
  let onePercent = total / 100
  return (perc * onePercent).toFixed(2)
}


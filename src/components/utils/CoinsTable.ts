export function RoundNumber(x: string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
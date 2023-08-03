export const formatTime = (time: number): string => {
  const convertInSecunds = time / 100;
  const getTowDecimal = convertInSecunds.toFixed(2);
  const [minutes, seconds] = getTowDecimal.split('.');
  const castingMinutes = Number(minutes);

  return `${castingMinutes > 0 ? minutes : '0'}:${seconds}`;
}
export const getWindDirection = (angle: number): string => {
  const directions = [
    'N',
    'NE',
    'E',
    'SE',
    'S',
    'SW',
    'W',
    'NW',
  ];
  return directions[
    Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8
  ];
};
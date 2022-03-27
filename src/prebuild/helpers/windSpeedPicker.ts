export function windSpeedPicker(wind: number): string {
  const windSpeed = [
    0.2,
    1.5,
    3.3,
    5.4,
    7.9,
    10.7,
    13.8,
    17.1,
    20.7,
    24.4,
    28.4,
    32.6,
    Infinity,
  ];
  const names = [
    'calm',
    'lAir',
    'lBreeze',
    'gBreeze',
    'mBreeze',
    'fBreeze',
    'sBreeze',
    'hWind',
    'gale',
    'sGale',
    'storm',
    'vStorm',
    'hurricane',
  ];
  for (let i = 0; i < windSpeed.length; i++) {
    if (wind <= windSpeed[i]) return names[i];
  }
  return 'error';
}
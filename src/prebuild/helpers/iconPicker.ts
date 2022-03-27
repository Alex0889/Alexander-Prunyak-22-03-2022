export function iconPicker(id: string): string {
  const icons: {[key: string]: string} = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'mainly_cloudy',
    '02n': 'mainly_cloudy',
    '03d': 'mainly_cloudy',
    '03n': 'mainly_cloudy',
    '04d': 'mainly_cloudy',
    '04n': 'mainly_cloudy',
    '50d': 'mist',
    '50n': 'mist',
    '13d': 'snow',
    '13n': 'snow',
    '10d': 'small_rain_sun',
    '10n': 'small_rain_moon',
    '09d': 'rain',
    '09n': 'rain',
    '11d': 'thunderstorm',
    '11n': 'thunderstorm',
  };
   return icons[id] || 'error';
}
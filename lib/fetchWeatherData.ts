import { ENDPOINT_URL, API_KEY } from '@env';
import getLatLong from './getLatLong';

const fetchWeatherData = async (city: string): Promise<any> => {
  if (city.length < 2) return;

  const latlong = await getLatLong(city);
  const res = await fetch(
    `http://${ENDPOINT_URL}?${latlong}&units=metric&appid=${API_KEY || ''}`
  );

  const data = await res.json();
  if (data) return data;
};

export default fetchWeatherData;

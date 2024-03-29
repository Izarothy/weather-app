import { GEO_URL, API_KEY } from '@env';

const getLatLong = async (city: string): Promise<string> => {
  const res = await fetch(
    `http://${GEO_URL}?q=${city}&appid=${API_KEY || ''}`
  ).catch((err) => console.log(err));

  const data = await res?.json();

  if (data.length < 1) return '';

  const currCity = data[0];
  const { lat, lon } = currCity;

  return `lat=${lat}&lon=${lon}`;
};

export default getLatLong;

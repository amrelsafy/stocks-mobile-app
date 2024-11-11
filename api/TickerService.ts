import {apiKey} from '../config/polygonAPIKey';
import { ITicker } from '../interfaces/ITicker';

export const getTickersAPI = async (search: string): Promise<ITicker[] | undefined> => {
  try{
    const baseURL = `https://api.polygon.io/v3/reference/tickers?active=true&limit=10&apiKey=${apiKey}`;
    const fetchURL = search ? baseURL + `&search=${search}` : baseURL;
    const res = await fetch(fetchURL);
    const data = await res.json();
    return data.results;
  }
  catch(error){
    console.error(`Error fetching tickers ${error}`)
  }
};

export const getTickerIconAPI = async (ticker: string): Promise<string | undefined>=> {
  try{
    const res = await fetch(
      `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${apiKey}`,
    );
    const data = await res.json();
    if(data.results){
      if (data.results.branding)
        return data.results.branding.icon_url + `?apiKey=${apiKey}`;
    }

    return '';
  }
  catch(error){
    console.error(`Error fetching ticker details ${error}`)
  }
};
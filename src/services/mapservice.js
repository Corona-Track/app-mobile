import axios from 'axios';

export const getMapElementsByPosition = async filter => {
  const response = await axios.post(`https://us-central1-coronatrackrn.cloudfunctions.net/getMapElementsByPosition`, filter);
  return response;
};

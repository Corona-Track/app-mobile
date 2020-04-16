import axios from 'axios';

export const getAddressDataByZipCode = async zipCode => {
  const response = await axios(`https://viacep.com.br/ws/${zipCode}/json/`);
  return response;
};

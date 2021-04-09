'use strict';

const axios = require('axios');
const { navisionServiceUrl } = require('../../../config');

const convertKeysToCamelCase = function (obj) {
  const camelCasedObj = {};
  for (const key in obj) {
    const newKey = key.charAt(0).toLowerCase() + key.slice(1);
    camelCasedObj[newKey] = obj[key];
  }
  return camelCasedObj;
};

module.exports = {
  getHeaders: async function () {
    const { data: ordersHeaders } = await axios.get(`${navisionServiceUrl}/orders-headers`);
    return ordersHeaders.map(line => convertKeysToCamelCase(line));
  },
  getLines: async function () {
    const { data: ordersLines } = await axios.get(`${navisionServiceUrl}/orders-lines`);
    return ordersLines.map(line => convertKeysToCamelCase(line));
  }
};


import { useState, useEffect } from 'react';
import LinksService from '../services/LinksService';

export default (getter = value => value) => {
  const [requests, setRequests] = useState([]);
  async function fetchData() {
    try {
      const dataRequests = await LinksService.getLinksRequests();
      setRequests(getter(dataRequests));
    } catch (error) {
      // TODO show ?
      console.error('error fetching data', error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return [requests, fetchData];
};

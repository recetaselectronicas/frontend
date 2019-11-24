
import { useState, useEffect, useCallback } from 'react';
import LinksService from '../services/LinksService';

export default () => {
  const [requests, setRequests] = useState([]);
  const updateState = useCallback(async () => {
    const dataRequests = await LinksService.getLinksRequests();
    setRequests(dataRequests);
  }, [])
  useEffect(() => {
    updateState();
  }, [updateState]);

  return [requests, updateState];
};

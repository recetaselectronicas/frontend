import React from 'react';
import qs from 'query-string';
import Rule from './components/rule';

export default function Norm(props) {
  const { location } = props;
  const { search } = location;
  const qsParsed = qs.parse(search, { ignoreQueryPrefix: true });

  return (
    <div>
      <Rule debug={qsParsed.debug === 'true'} />
    </div>
  );
}

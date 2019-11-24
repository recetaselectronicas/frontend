import React from 'react';

export const Shower = ({ label, attribute }) => Boolean(attribute) && <div>{label}: {attribute} </div>

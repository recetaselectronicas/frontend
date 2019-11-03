import React from 'react';
import CreateAffiliateAccount from './CreateAffiliateAccount/CreatePatientAccount';

const creationsMap = {
  affiliate: props => <CreateAffiliateAccount {...props} />,
};

export default function CreateAccount(props) {
  const { type } = props;

  return (
    <>
      {creationsMap[type] && creationsMap[type](props)}
    </>
  );
}

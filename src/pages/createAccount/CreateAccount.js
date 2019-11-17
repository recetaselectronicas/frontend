import React, { useState } from 'react';
import CreateAffiliateAccount from './CreateAffiliateAccount/CreateAffiliateAccount';
import CreateAccountCongrats from './CreateAccountCongrats';
import CreateDoctorAccount from './CreateDoctorAccount/CreateDoctorAccount';
import CreatePharmacistAccount from './CreatePharmacistAccount/CreatePharmacistAccount';

const creationsMap = {
  affiliate: (onCreationSuccess, onCreationCancel) => <CreateAffiliateAccount onCreationSuccess={onCreationSuccess} onCreationCancel={onCreationCancel} />,
  doctor: (onCreationSuccess, onCreationCancel) => <CreateDoctorAccount onCreationSuccess={onCreationSuccess} onCreationCancel={onCreationCancel} />,
  pharmacist: (onCreationSuccess, onCreationCancel) => <CreatePharmacistAccount onCreationSuccess={onCreationSuccess} onCreationCancel={onCreationCancel} />,
};

export default function CreateAccount(props) {
  const { type } = props;
  const [accountData, setAccountData] = useState('');

  const onCreationSuccess = (newAccountData) => {
    setAccountData(newAccountData);
  };

  const onCreationCancel = () => {
    setAccountData('');
    props.history.push('/login');
  };

  return (
    <>
      {accountData && (<CreateAccountCongrats {...accountData} />)}
      {!accountData && creationsMap[type] && creationsMap[type](onCreationSuccess, onCreationCancel)}
    </>
  );
}

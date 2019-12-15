import React, { useState, useEffect } from 'react';
import CreateAffiliateAccount from './CreateAffiliateAccount/CreateAffiliateAccount';
import CreateAccountCongrats from './CreateAccountCongrats';
import CreateDoctorAccount from './CreateDoctorAccount/CreateDoctorAccount';
import CreatePharmacistAccount from './CreatePharmacistAccount/CreatePharmacistAccount';
import i18n from '../../utils/i18n';

const creationsMap = {
  affiliate: (onCreationSuccess, onCreationCancel) => <CreateAffiliateAccount onCreationSuccess={onCreationSuccess} onCreationCancel={onCreationCancel} />,
  doctor: (onCreationSuccess, onCreationCancel) => <CreateDoctorAccount onCreationSuccess={onCreationSuccess} onCreationCancel={onCreationCancel} />,
  pharmacist: (onCreationSuccess, onCreationCancel) => <CreatePharmacistAccount onCreationSuccess={onCreationSuccess} onCreationCancel={onCreationCancel} />,
};

export default function CreateAccount(props) {
  const { type, setTitle } = props;
  const [accountData, setAccountData] = useState('');

  const onCreationSuccess = (newAccountData) => {
    setAccountData(newAccountData);
  };

  const onCreationCancel = () => {
    setAccountData('');
    props.history.push('/login');
  };

  useEffect(() => {
    if (!type) {
      window.location.href = '/';
    } else {
      setTitle(`Creación de la cuenta de ${i18n.gettext(type)}`);
    }
  }, [type]);

  return (
    <>
      {accountData && (<CreateAccountCongrats {...accountData} />)}
      {!accountData && creationsMap[type] && creationsMap[type](onCreationSuccess, onCreationCancel)}
    </>
  );
}

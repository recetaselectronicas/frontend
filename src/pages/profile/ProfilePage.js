import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import UserService from '../../services/UserService';


const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  const fetchData = async () => {
    try {
      const data = await UserService.getData();
      setProfile(data);
    } catch (error) {
      // TODO : manejar esto
      console.log(error, 'no se pudo obtener el perfil del usaurio');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (!profile) {
    return <div>Loading...</div>;
  }
  const { name, surname, corporateName, userName, email, address, contactNumber, birthDate, nationality, nicNumber } = profile;
  return (
    <Paper>
      {name && (
        <div>
          {' '}
                    Nombre:
          {' '}
          {name}
        </div>
      )}
      {surname && (
        <div>
                    Apellido:
          {' '}
          {surname}
        </div>
      )}
      {corporateName && (
        <div>
                    Nombre legal:
          {' '}
          {corporateName}
        </div>
      )}
      {userName && (
        <div>
                    Nombre de usuario:
          {' '}
          {userName}
        </div>
      )}
      {email && (
        <div>
                    Email:
          {' '}
          {email}
        </div>
      )}
      {address && (
        <div>
                    Dirección:
          {' '}
          {address}
        </div>
      )}
      {contactNumber && (
        <div>
                    Numero de contacto:
          {' '}
          {contactNumber}
        </div>
      )}
      {birthDate && (
        <div>
                    Fecha de nacimiento:
          {' '}
          {birthDate}
        </div>
      )}
      {nationality && (
        <div>
                    Nacionalidad:
          {' '}
          {nationality}
        </div>
      )}
      {nicNumber && (
        <div>
                    Numero de documento:
          {' '}
          {nicNumber}
        </div>
      )}
    </Paper>
  );
};

export default ProfilePage;

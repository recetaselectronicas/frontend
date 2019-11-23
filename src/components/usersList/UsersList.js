import React from 'react';
import { Paper, Button, Typography } from '@material-ui/core';
import { Shower } from '../shower/Shower';


export const UsersList = ({ users, onClick, emptyState, labelButton }) => {
    if (!users) {
        return null
    }
    const isEmpty = users.length === 0
    return <div>
        {!isEmpty ? users.map((user) => {
            const { id, name, lastName, birthDate, contactNumber, nationality, address, email, nationalMatriculation, nicNumber, gender } = user
            return (
                <Paper key={id} style={{ padding: '2em', marginBottom: '2em', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        {Boolean(name) && Boolean(lastName) && (
                            <div>
                                Nombre: {name}, {lastName}
                            </div>
                        )}
                        <Shower label="Fecha de nacimiento" attribute={birthDate} />
                        <Shower label="Numero de contacto" attribute={contactNumber} />
                        <Shower label="Nacionalidad" attribute={nationality} />
                        <Shower label="Dirección" attribute={address} />
                        <Shower label="Email" attribute={email} />
                        <Shower label="Matricula nacional" attribute={nationalMatriculation} />
                        <Shower label="Numero de documento" attribute={nicNumber} />
                        <Shower label="Sexo" attribute={gender} />
                    </div>
                    <div>
                        <Button onClick={() => onClick(user)} > {labelButton} </Button>
                    </div>
                </Paper>
            )
        }) : (emptyState &&
            <Paper style={{ padding: '2em' }}>
                <Typography variant="h5">
                    {emptyState}
                </Typography>
            </Paper>)
        }
    </div>

}
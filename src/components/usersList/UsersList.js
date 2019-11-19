import React from 'react';
import { Paper, Button } from '@material-ui/core';


export const UsersList = ({ users, unlink }) => {
    return <div>
        {users.map((user) => {
            const { name, lastName, birthDate, contactNumber, nationality, address, email, nationalMatriculation, nicNumber, gender } = user
            return (
                <Paper style={{ padding: '2em', marginBottom: '2em', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        {Boolean(name) && Boolean(lastName) && (
                            <div>
                                {name}, {lastName}
                            </div>
                        )}
                        {Boolean(birthDate) && <div>{birthDate}</div>}
                        {Boolean(contactNumber) && <div>{contactNumber}</div>}
                        {Boolean(nationality) && <div>{nationality}</div>}
                        {Boolean(address) && <div>{address}</div>}
                        {Boolean(email) && <div>{email}</div>}
                        {Boolean(nationalMatriculation) && <div>{nationalMatriculation}</div>}
                        {Boolean(nicNumber) && <div>{}</div>}
                        {Boolean(gender) && <div>{gender}</div>}
                    </div>
                    <div>
                        <Button onClick={() => unlink(user)} >Desvincular </Button>
                    </div>
                </Paper>
            )
        })
        }
    </div>

}
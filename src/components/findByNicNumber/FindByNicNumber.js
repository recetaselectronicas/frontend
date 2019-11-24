import React from 'react';
import { Button, FormControl, TextField, MenuItem } from '@material-ui/core';


const FindByNicNumber = ({
    setNicnumber,
    nicNumber,
    setGender,
    gender,
    search,
}) => (
        <div>
            <FormControl>

                <TextField
                    name="DNI"
                    label="DNI"
                    onChange={event => setNicnumber(event.target.value)}
                    value={nicNumber}
                />

                <TextField
                    select
                    label="Sexo"
                    onChange={event => setGender(event.target.value)}
                    value={gender}
                >
                    <MenuItem value="M">Hombre</MenuItem>
                    <MenuItem value="F">Mujer</MenuItem>
                </TextField>
                <Button onClick={search} disabled={!gender || !nicNumber}>Buscar</Button>
            </FormControl>


        </div>
    );

export default FindByNicNumber;

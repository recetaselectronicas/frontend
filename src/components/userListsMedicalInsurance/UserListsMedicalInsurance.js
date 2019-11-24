import React, { useState, useEffect, useCallback } from 'react';
import { Container, Paper, Button, Typography, FormControl, TextField, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LinksService from '../../services/LinksService';
import withSnackbar from '../hocs/withSnackbar';
import { UsersList } from '../usersList/UsersList';
import FindByNicNumber from '../findByNicNumber/FindByNicNumber';

const nicNumberFlow = "nicNumber"
const nationalMatriculationFlow = "nationalMatriculation"

const UserListsMedicalInsurance = ({ showSuccess, showError, findUsers, entity, searchUsers, label }) => {
    const [users, setUsers] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [selectedFlow, setSelectedFlow] = useState(null);
    const [nicNumber, setNicnumber] = useState('');
    const [gender, setGender] = useState('');
    const [matriculation, setMatriculation] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const data = await findUsers();
            setUsers(data);
        } catch (error) {
            showError('Hubo un error inesperado lo sentimos !');
        }
    }, [findUsers, showError])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const cleanInputs = () => {
        setNicnumber('')
        setGender('')
        setMatriculation('')
        setSelectedFlow(null)
        setSearchResult([])
    }

    const handleError = (error) => {
        if (error.message) {
            showError(error.message);
        } else {
            showError('Hubo un error inesperado lo sentimos !');
        }
    };

    const unlink = async ({ id }) => {
        try {
            await LinksService.unlink({
                [entity]: {
                    id
                },
            });
            showSuccess(`Se desvinculo con exito el ${label} !`);
            await fetchData();
        } catch (error) {
            handleError(error);
        }
    };

    const search = async () => {
        try {
            const searchData = await searchUsers({ gender, nicNumber, matriculation })
            setSearchResult(searchData)
        } catch (error) {
            handleError(error)
        }
    }

    const linkup = async ({ id }) => {
        try {
            await LinksService.requestLink({
                [entity]: {
                    id
                }
            })
            showSuccess(`Se vinculo con exito el ${label} !`);
            cleanInputs();
            await fetchData();
        } catch (error) {
            handleError(error)
        }
    }

    const selectFlow = (flow) => {
        setSelectedFlow(flow)
        setSearchResult([])
    }
    const onClose = () => {
        cleanInputs();
    }

    return (
        <Container className="page">
            <Paper style={{ padding: '2em', marginBottom: '2em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5">Agregar un {label}</Typography>
                    {selectedFlow && <IconButton aria-label="Close" onClick={onClose} >
                        <CloseIcon />
                    </IconButton>}
                </div>

                {!selectedFlow
                    && (
                        <>
                            <Button onClick={() => selectFlow(nicNumberFlow)}>Por DNI</Button>
                            <Button onClick={() => selectFlow(nationalMatriculationFlow)}>Por matricula nacional</Button>
                        </>
                    )}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {selectedFlow === nicNumberFlow && (
                        <FindByNicNumber
                            gender={gender}
                            nicNumber={nicNumber}
                            setNicnumber={setNicnumber}
                            setGender={setGender}
                            search={search}
                        />
                    )}

                    {selectedFlow === nationalMatriculationFlow && (
                        <FormControl>
                            <TextField label="Matricula nacional" value={matriculation} onChange={event => setMatriculation(event.target.value)} />
                            <Button onClick={search} disabled={!matriculation}>Buscar</Button>
                        </FormControl>
                    )}
                </div>

                {searchResult.length > 0 && <UsersList users={searchResult} onClick={linkup} labelButton="Vincular" />}

            </Paper>
            <UsersList users={users} onClick={unlink} emptyState={`No tienes ningun ${label} asociado`} labelButton="Desvincular" />
        </Container>
    );
};

export default withSnackbar(UserListsMedicalInsurance);

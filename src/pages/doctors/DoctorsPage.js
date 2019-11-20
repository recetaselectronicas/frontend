import React, { useState, useEffect } from 'react';
import { Container, Paper, Button, Typography, FormControl, TextField } from '@material-ui/core';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import LinksService from '../../services/LinksService';
import withSnackbar from '../../components/hocs/withSnackbar';
import { UsersList } from '../../components/usersList/UsersList';
import FindByNicNumber from '../../components/findByNicNumber/FindByNicNumber';
import DoctorService from '../../services/DoctorService';


const nicNumberFlow = "nicNumber"
const nationalMatriculationFlow = "nationalMatriculation"

const DoctorsPage = ({ showSuccess, showError }) => {
    const [doctors, setDoctors] = useState([]);
    const [searchDoctors, setSearchDoctors] = useState([]);
    const [selectedFlow, setSelectedFlow] = useState(null);
    const [nicNumber, setNicnumber] = useState('');
    const [gender, setGender] = useState('');
    const [nationalMatriculation, setNationalMatriculation] = useState('');
    async function fetchData() {
        try {
            const data = await MedicalInsuranceService.getDoctors();
            setDoctors(data);
        } catch (error) {
            showError('Hubo un error inesperado lo sentimos !');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const cleanInputs = () => {
        setNicnumber('')
        setGender('')
        setNationalMatriculation('')
        setSelectedFlow(null)
        setSearchDoctors([])
    }

    const handleError = (error) => {
        if (error.message) {
            showError(error.message);
        } else {
            showError('Hubo un error inesperado lo sentimos !');
        }
    };

    const unlink = async (doctor) => {
        try {
            await LinksService.unlink({
                doctor: {
                    id: doctor.id,
                },
            });
            showSuccess('Se desvinculo con exito el doctor !');
            await fetchData();
        } catch (error) {
            handleError(error);
        }
    };

    const search = async () => {
        try {
            const doctorsData = await DoctorService.search({ gender, nicNumber, nationalMatriculation })
            setSearchDoctors(doctorsData)
        } catch (error) {
            handleError(error)
        }
    }

    const linkup = async (doctor) => {
        try {
            await LinksService.requestLink({
                doctor: {
                    id: doctor.id
                }
            })
            showSuccess('Se vinculo con exito el doctor !');
            cleanInputs();
            await fetchData();
        } catch (error) {
            handleError(error)
        }
    }

    const selectFlow = (flow) => {
        setSelectedFlow(flow)
        setSearchDoctors([])
    }

    return (
        <Container>
            <Paper style={{ padding: '2em', marginBottom: '2em' }}>
                <Typography variant="h5">Agregar un medico</Typography>
                {!selectedFlow
                    && (
                        <>
                            <Button onClick={() => selectFlow(nicNumberFlow)}>Por DNI</Button>
                            <Button onClick={() => selectFlow(nationalMatriculationFlow)}>Por matricula nacional</Button>
                        </>
                    )}
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
                        <TextField label="Matricula nacional" value={nationalMatriculation} onChange={event => setNationalMatriculation(event.target.value)} />
                        <Button onClick={search}>Buscar</Button>
                    </FormControl>
                )}

                {searchDoctors.length > 0 && <UsersList users={searchDoctors} onClick={linkup} labelButton="Vincular" />}




            </Paper>
            <UsersList users={doctors} onClick={unlink} emptyState="No tienes doctores asociados" labelButton="Desvincular" />
        </Container>
    );
};

export default withSnackbar(DoctorsPage);

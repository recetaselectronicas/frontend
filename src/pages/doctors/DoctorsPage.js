import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import LinksService from '../../services/LinksService';
import withSnackbar from '../../components/hocs/withSnackbar';
import { UsersList } from '../../components/usersList/UsersList';

const DoctorsPage = ({ showSuccess, showError }) => {
    const [doctors, setDoctors] = useState([]);

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
                    id: doctor.id
                }
            })
            showSuccess('Se desvinculo con exito el doctor !')
            await fetchData();
        } catch (error) {
            handleError(error)
        }
    };

    return (
        <Container>
            <UsersList users={doctors} unlink={unlink} emptyState='No tienes doctores asociados' />
        </Container>
    );
};

export default withSnackbar(DoctorsPage);

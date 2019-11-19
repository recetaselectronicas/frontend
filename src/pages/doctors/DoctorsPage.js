import React, { useState, useEffect } from 'react';
import { Container, Paper } from '@material-ui/core';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
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
    const unlink = (id) => {
        alert("should implement this");
    };
    return (
        <Container>
            <UsersList users={doctors} unlink={unlink} />
        </Container>
    );
};

export default withSnackbar(DoctorsPage);

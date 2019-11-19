import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import withSnackbar from '../../components/hocs/withSnackbar';
import { UsersList } from '../../components/usersList/UsersList';

const PharmacitsPage = ({ showSuccess, showError }) => {
    const [pharmacits, setPharmacits] = useState([]);

    async function fetchData() {
        try {
            const data = await MedicalInsuranceService.getPharmacits();
            setPharmacits(data);
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
            <UsersList users={pharmacits} unlink={unlink} />
        </Container>
    );
};

export default withSnackbar(PharmacitsPage);

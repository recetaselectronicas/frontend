import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import withSnackbar from '../../components/hocs/withSnackbar';
import LinksService from '../../services/LinksService';
import { UsersList } from '../../components/usersList/UsersList';

const PharmacistsPage = ({ showSuccess, showError }) => {
    const [pharmacists, setPharmacists] = useState([]);

    async function fetchData() {
        try {
            const data = await MedicalInsuranceService.getPharmacists();
            setPharmacists(data);
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

    const unlink = async (pharmacist) => {
        try {
            await LinksService.unlink({
                pharmacist: {
                    id: pharmacist.id
                }
            })
            showSuccess('Se desvinculo con exito el farmaceutico !')
            await fetchData();
        } catch (error) {
            handleError(error)
        }
    };

    return (
        <Container>
            <UsersList users={pharmacists} unlink={unlink} emptyState='No tienes farmaceuticos asociados' />
        </Container>
    );
};

export default withSnackbar(PharmacistsPage);

import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import LinksService from '../../services/LinksService';
import withSnackbar from '../../components/hocs/withSnackbar';
import { UsersList } from '../../components/usersList/UsersList';

const AffiliatesPage = ({ showSuccess, showError }) => {
    const [affiliates, setAffiliates] = useState([]);

    async function fetchData() {
        try {
            const data = await MedicalInsuranceService.getAffiliates();
            setAffiliates(data);
        } catch (error) {
            showError('Hubo un error inesperado lo sentimos !');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const unlink = async (affiliate) => {
        try {
            await LinksService.unlink({
                affiliate: {
                    patient: {
                        id: affiliate.idPatient
                    },
                    plan: {
                        id: affiliate.plan.id
                    }
                }
            })
            showSuccess('Se desvinculo con exito el afiliado !')
            await fetchData();
        } catch (error) {
            handleError(error)
        }

    };

    const handleError = (error) => {
        if (error.message) {
            showError(error.message);
        } else {
            showError('Hubo un error inesperado lo sentimos !');
        }
    };
    return (
        <Container>
            <UsersList users={affiliates} unlink={unlink} />
        </Container>
    );
};

export default withSnackbar(AffiliatesPage);

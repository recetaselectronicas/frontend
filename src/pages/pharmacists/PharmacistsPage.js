import React from 'react';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import PharmacistService from '../../services/PharmacistService';
import UserListsMedicalInsurance from '../../components/userListsMedicalInsurance/UserListsMedicalInsurance';

const PharmacistsPage = () => (
    <UserListsMedicalInsurance
        searchUsers={(dataSearch) => PharmacistService.search(dataSearch)}
        findUsers={() => MedicalInsuranceService.getPharmacists()}
        entity={'pharmacist'}
        label="Farmaceutico"
    />
)

export default PharmacistsPage

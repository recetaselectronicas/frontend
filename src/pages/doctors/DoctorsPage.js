import React from 'react';
import MedicalInsuranceService from '../../services/MedicalInsuranceService';
import DoctorService from '../../services/DoctorService';
import UserListsMedicalInsurance from '../../components/userListsMedicalInsurance/UserListsMedicalInsurance';

const DoctorsPage = () =>
    (<UserListsMedicalInsurance
        searchUsers={(dataSearch) => DoctorService.search(dataSearch)}
        findUsers={() => MedicalInsuranceService.getDoctors()}
        entity={'doctor'}
        label="Doctor"
    />)

export default DoctorsPage;

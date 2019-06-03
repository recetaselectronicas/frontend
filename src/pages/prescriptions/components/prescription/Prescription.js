import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import './Prescription.css';

const PrescriptionItem = (props) => {
  const onClickPrescription = () => {
    props.goToPrescriptionDetail(props.id);
  };
  const {
    doctor, medicalInsurance, issuedDate, status, items,
  } = props;
  return (
    <ListItem onClick={onClickPrescription} className="prescription__list-item">
      <ListItemAvatar
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: 70,
          height: 70,
        }}
      >
        <Avatar style={{ width: 70, height: 70 }} alt="Remy Sharp" src="https://image.flaticon.com/icons/svg/234/234735.svg" />
      </ListItemAvatar>
      <div className="prescription__list-item__body">
        <div>
          Medico:
          {doctor.description}
        </div>
        <div>
          Obra social:
          {medicalInsurance.description}
        </div>
        <div>
          Fecha de emision:
          {issuedDate}
        </div>
        <div>
          Estado:
          {status}
        </div>
        <div>
          Medicamentos:
          {items.map(item => item.description)}
        </div>
      </div>
    </ListItem>
  );
};

export default PrescriptionItem;

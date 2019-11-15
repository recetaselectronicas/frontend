import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PhotoGallery from '../photoGallery/PhotoGallery';

export default function ImageSelector(props) {
  const { onSelect, onUnSelect, photo, label = 'Sacale una foto a tu documento', placeholder = 'Foto Documento.jpg' } = props;
  const [open, setOpen] = useState(false);

  const editPhoto = () => {
    setOpen(true);
  };

  const unSelect = () => {
    onUnSelect();
  };

  const select = (newPhotoUri) => {
    setOpen(false);
    onSelect(newPhotoUri);
  };

  return (
    <>
      {photo && (<Chip label={placeholder} onClick={editPhoto} onDelete={unSelect} />)}
      {!photo && (<Chip label={label} onClick={editPhoto} avatar={<PhotoCameraIcon />} variant="outlined" />)}
      {open && (<PhotoGallery open photo={photo} onClose={() => setOpen(false)} onConfirm={select} />)}
    </>
  );
}

ImageSelector.defaultProps = {
  photo: '',
};

ImageSelector.propTypes = {
  photo: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onUnSelect: PropTypes.func.isRequired,
};

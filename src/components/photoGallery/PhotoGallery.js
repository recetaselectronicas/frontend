import Camera from 'react-html5-camera-photo';
import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '../dialog/dialogTitle/DialogTitle';
import DialogContent from '../dialog/dialogContent/DialogContent';
import DialogActions from '../dialog/dialogActions/DialogActions';
import 'react-html5-camera-photo/build/css/index.css';

const steps = {
  takePicture: {
    name: 'TAKE_PICTURE',
    isStep(step) {
      return step.name === this.name;
    },
  },
  confirmPicture: {
    name: 'CONFIRM_PICTURE',
    isStep(step) {
      return step.name === this.name;
    },
  },
};

export default function PhotoGallery(props) {
  const { photo, open, onClose, onConfirm } = props;
  const [photoUri, setPhotoUri] = useState(photo);
  const [step, setStep] = useState(steps.takePicture);
  const takePictureTitle = 'Sacale una foto a tu Documento';
  const confirmPictureTitle = 'Salió bien?';

  useEffect(() => {
    if (photoUri) {
      setStep(steps.confirmPicture);
    } else {
      setStep(steps.takePicture);
    }
  }, [photoUri]);

  const onTakePhotoAnimationDone = (dataUri) => {
    setPhotoUri(dataUri);
  };

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm(photoUri);
  };

  const handleTakePicture = () => {
    setPhotoUri('');
  };

  return (
    <>
      <Dialog maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>
          {step.isStep(steps.takePicture) ? takePictureTitle : confirmPictureTitle}
          <IconButton style={{ float: 'right', top: '-10px' }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {step.isStep(steps.confirmPicture) && (
            <>
              <DialogContentText>Si creés que la foto es clara, confirmala!</DialogContentText>
              <img style={{ width: '100%' }} alt="document" src={photoUri} />
            </>
          )}
          {step.isStep(steps.takePicture) && <Camera isImageMirror={false} onTakePhotoAnimationDone={onTakePhotoAnimationDone} imageType="jpg" />}
        </DialogContent>
        {step.isStep(steps.confirmPicture)
          && (
          <DialogActions>
            <Button onClick={handleTakePicture} color="primary">Sacar Otra</Button>
            <Button onClick={handleConfirm} color="primary">Confirmar</Button>
          </DialogActions>
          )}
      </Dialog>
    </>
  );
}

PhotoGallery.defaultProps = {
  photo: '',
};

PhotoGallery.propTypes = {
  open: PropTypes.bool.isRequired,
  photo: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

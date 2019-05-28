import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const AddItemDialog = props => {
  const [suggestionList, setSuggestionList] = React.useState([]);

  const onChangeItemInput = async (event) => {
    try {
      const data = await props.searchMedicament(event.target.value);
      setSuggestionList(data.result)
    } catch (error) {
      console.log(error)
    }
  }
  const classes = {}

  const { handleClose, open } = props;

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Agregar item
          </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <div className={classes.root}>

                <div className={classes.container}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Medicamento"
                    className="add-item__item-texfield"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      )
                    }}
                    onChange={onChangeItemInput}
                  />
                  <div >
                    {suggestionList.length > 0 && (
                      <Paper className={classes.paper} square>
                        <Suggestions data={suggestionList} />
                      </Paper>
                    )}
                  </div>
                </div>


              </div>

            </Grid>
            <Grid item>
              <TextField id="input-with-icon-textfield" label="Cantidad" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Agregar
              </Button>
          <Button onClick={handleClose} color="secondary">
            Cancelar
              </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


function Suggestions(props) {
  return props.data.map((suggestion) =>
    renderSuggestion(suggestion),
  )
}

function renderSuggestion(suggestionProps) {
  return (
    <MenuItem
      component="div"
    >
      {suggestionProps.label}
    </MenuItem>
  );
}



export default AddItemDialog;

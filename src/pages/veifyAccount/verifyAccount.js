import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Card, CardActions, CardContent, CardHeader, Container, Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import AccountService from '../../services/AccountService';

const verifyStatuses = {
  ok: 'ok',
  error: 'error',
};

function VerifyAccount(props) {
  const { location } = props;
  const { token, type } = queryString.parse(location.search);
  const [isVerifying, setIsVerifying] = useState(true);
  const [verifyStatus, setVerifyStatus] = useState(verifyStatuses.ok);

  const login = () => {
    props.history.push('/login');
  };

  useEffect(() => {
    setTimeout(() => {
      AccountService.verifyAccount(type, token)
        .then(() => {
          setVerifyStatus(verifyStatuses.ok);
          setIsVerifying(false);
        })
        .catch((err) => {
          setVerifyStatus(verifyStatuses.error);
          setIsVerifying(false);
          console.error(err);
        });
    }, 1500);
  }, [type, token]);

  if (isVerifying) {
    return (
      <>
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          <Paper style={{ padding: '90px' }}>
            <Typography style={{ margin: '10px' }} variant="h4" align="center">Verificando</Typography>
            <LinearProgress />
          </Paper>
        </Container>
      </>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Card>
        {verifyStatus === verifyStatuses.ok && (
        <>
          <CardHeader title="Felicidades!" titleTypographyProps={{ variant: 'h6', color: 'textPrimary' }} style={{ textAlign: 'center' }} />
          <CardContent>
            <Typography paragraph align="center">
                  Gracias por crear una cuenta en UNIFY.
                  Ya puedes usar tu cuenta sin problemas.
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={login}>Login</Button>
          </CardActions>
        </>
        )}
        {verifyStatus === verifyStatuses.error && (
        <>
          <CardHeader title="Ups!" titleTypographyProps={{ variant: 'h6', color: 'textSecondary' }} style={{ textAlign: 'center' }} />
          <CardContent>
            <Typography paragraph align="center">
                  No fue posible verificar su cuenta. Intente nuevamente.
                  Si el error persiste contactenos.
            </Typography>
          </CardContent>
        </>
        )}
      </Card>
    </Container>
  );
}

export default withRouter(VerifyAccount);

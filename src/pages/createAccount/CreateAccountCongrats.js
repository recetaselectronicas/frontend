import React from 'react';
import { Card, CardActions, CardContent, CardHeader, Container, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import withRouter from 'react-router-dom/es/withRouter';

function CreateAccountCongrats(props) {
  const { email, name, surName } = props;

  const login = () => {
    props.history.push('/login');
  };

  return (
    <>
      <Container style={{ marginTop: '20px' }} maxWidth="md">
        <Card>
          <CardHeader title={`Felicidades, ${surName.value} ${name.value}!`} titleTypographyProps={{ variant: 'h6', color: 'textPrimary' }} style={{ textAlign: 'center' }} />
          <CardContent>
            <Typography paragraph align="center">
              Gracias por crear una cuenta en UNIFY. Solo falta que verifique su dirección de correro. Enviamos un mail a
              <span style={{ fontWeight: 'bold' }}>{` ${email.value} `}</span>
              con las instrucciones de cómo hacerlo. Una vez verificada su cuenta, podrá comenzar a usar el sitio.
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={login}>Login</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}

export default withRouter(CreateAccountCongrats);

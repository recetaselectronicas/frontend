/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from 'react-router';
import unifyLogo from './unify_logo.png';
import SessionService from '../../services/SessionService';
import UserService from '../../services/UserService';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    cursor: 'pointer',
  },
  title: {
    marginLeft: '8px',
    flexGrow: 1,
    cursor: 'pointer',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [state, setState] = React.useState({
    open: false,
  });
  const [menu, setMenu] = React.useState([]);

  const userIsLogged = SessionService.userIsLogged();

  const toggleDrawer = openValue => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, open: openValue });
  };

  useEffect(() => {
    if (userIsLogged) {
      UserService.getMenu().then((newMenu) => {
        setMenu(newMenu);
      });
    }
  }, [userIsLogged]);
  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const onSelectedItem = (item) => {
    setState({ ...state, open: false });
    props.history.push(item.url);
  };
  const goHome = () => {
    props.history.push(userIsLogged ? '/recetas' : '/');
  };
  const logout = () => {
    SessionService.logout();
    props.setUserIsLogged(false);
    props.history.push('/');
    handleClose();
  };
  const goConfiguration = () => {
    props.history.push('/configuracion');
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {userIsLogged && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img src={unifyLogo} alt="" width={25} onClick={goHome} style={{ cursor: 'pointer' }} />
          <Typography variant="h6" className={classes.title} onClick={goHome}>
            Unify
          </Typography>

          {userIsLogged && (
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={goConfiguration}>Configuración</MenuItem>
                <MenuItem onClick={logout}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={state.open} onClose={toggleDrawer(false)}>
        <div className={classes.list} role="presentation" onKeyDown={toggleDrawer(false)}>
          <List>
            {menu.map(link => (
              <ListItem button key={link.label} onClick={() => onSelectedItem(link)}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default withRouter(MenuAppBar);

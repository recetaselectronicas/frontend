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

const localRoutes = [
  {
    url: '/configuracion',
    label: 'Configuración'
  },
  {
    url: '/',
    label: 'Home'
  }
]

function MenuAppBar({ history, location, setUserIsLogged }) {
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
    history.push(item.url);
  };
  const goHome = () => {
    history.push(userIsLogged ? '/recetas' : '/');
  };
  const logout = () => {
    SessionService.logout();
    setUserIsLogged(false);
    history.push('/');
    handleClose();
  };
  const goConfiguration = () => {
    history.push('/configuracion');
    handleClose();
  };

  const getActualPage = () => {
    const searchUrl = menuItem => menuItem.url === location.pathname
    const page = menu.find(searchUrl) || localRoutes.find(searchUrl)
    if (page) {
      return page.label
    } else {
      return location.pathname.replace("/", "")
    }
  }

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
              data-testid="menu-drawer-button"
            >
              <MenuIcon />
            </IconButton>
          )}
          <img src={unifyLogo} alt="" width={25} onClick={goHome} style={{ cursor: 'pointer' }} />
          <Typography variant="h6" className={classes.title} onClick={goHome}>
            Unify - <span style={{ textTransform: 'capitalize' }}>{getActualPage()}</span>
          </Typography>

          {userIsLogged && (
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                data-testid='user-icon'
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
                <MenuItem onClick={logout} data-testid='logout-button'>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={state.open} onClose={toggleDrawer(false)}>
        <div className={classes.list} role="presentation" onKeyDown={toggleDrawer(false)}>
          <List>
            {menu.map(link => (
              <ListItem button key={link.label} data-testid={link.url} onClick={() => onSelectedItem(link)}>
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

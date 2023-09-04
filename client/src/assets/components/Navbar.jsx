import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './Navbar.css'
import { BrowserRouter as Router, Link, Route, useLocation } from 'react-router-dom';

const Navbar = () => {
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              MUI
            </Typography>

            <List style={{display:"flex"}} className='navigation'>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'left' }}>
                    <Link to="/" onClick={() => navigate("/")} style={{ textDecoration: 'none', color:"white" }}>
                      Form
                    </Link>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'left' }}>
                    <Link to="/display" onClick={() => navigate("/display")} style={{ textDecoration: 'none', color:"white" }}>
                      Records
                    </Link>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'left' }}>
                    <Link to="/register" onClick={() => navigate("/register")} style={{ textDecoration: 'none', color:"white" }}>
                      Register
                    </Link>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'left' }}>
                    <Link to="/login" onClick={() => navigate("/login")} style={{ textDecoration: 'none', color:"white" }}>
                      Login
                    </Link>
                  </ListItemButton>
                </ListItem>
              </List>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <Box
              onClick={handleDrawerToggle}
              onKeyDown={handleDrawerToggle}
              role="presentation"
            >
              <Typography variant="h6" sx={{ my: 2, textAlign: 'center' }}>
                MUI
              </Typography>
              <Divider />
              <List>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'left' }}>
                    <Link to="/" onClick={() => navigate("/")} style={{ textDecoration: 'none' }}>
                      Form
                    </Link>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'left' }}>
                    <Link to="/display" onClick={() => navigate("/display")} style={{ textDecoration: 'none' }}>
                      Records
                    </Link>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'left' }}>
                    <Link to="/register" onClick={() => navigate("/register")} style={{ textDecoration: 'none' }}>
                      Register
                    </Link>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: 'left' }}>
                    <Link to="/login" onClick={() => navigate("/login")} style={{ textDecoration: 'none' }}>
                      Login
                    </Link>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </nav>
      </Box>
    </Router>
  );
};

export default Navbar;

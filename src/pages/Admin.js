import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {mainListItems, secondaryListItems} from '../components/ListItems';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Orders from '../components/Orders';
import ManageUser from '../components/ManageUser';
import ManageTimeshare from '../components/ManageTimeshare';
import DashboardUI from '../components/Dashboard';
import PaginationList from "../components/PaginationList";
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";

import {GetUser} from "../services/user.service";
import {privateRoutes} from "../routes/route";

const adminRoutes = [
    {
        path: '/dashboard',
        placeholder: 'Dashboard',
        component: DashboardUI
    },
    {
        path: '/manage-user',
        placeholder: 'User management',
        component: ManageUser
    },
    {
        path: '/manage-timeshare',
        placeholder: 'Timeshare management',
        component: ManageTimeshare
    }
]

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Timeshare Exchange Platform
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme(
    {
        palette: {
            primary: {
                main: '#faa935',
            },
            secondary: {
                main: '#31415e',
            },
        },
    }
);

export default function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Routes>
            <Route>
                {adminRoutes.map((route, index) => {
                    const Component = route.component;
                    const Title = route.placeholder;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <ThemeProvider theme={defaultTheme}>
                                    <Box sx={{display: 'flex'}}>
                                        <CssBaseline/>
                                        <AppBar position="absolute" open={open}>
                                            <Toolbar
                                                sx={{
                                                    pr: '24px', // keep right padding when drawer closed
                                                }}
                                            >
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                    onClick={toggleDrawer}
                                                    sx={{
                                                        marginRight: '36px',
                                                        ...(open && {display: 'none'}),
                                                    }}
                                                >
                                                    <MenuIcon/>
                                                </IconButton>
                                                <Typography
                                                    component="h1"
                                                    variant="h6"
                                                    color="inherit"
                                                    noWrap
                                                    sx={{flexGrow: 1}}
                                                >
                                                    {Title}
                                                </Typography>

                                                <IconButton color="inherit">
                                                    <Badge badgeContent={4} color="secondary">
                                                        <NotificationsIcon/>
                                                    </Badge>
                                                </IconButton>
                                                <Avatar sx={{bgcolor: '#1454da', ml: 2}}>AD</Avatar>
                                            </Toolbar>
                                        </AppBar>
                                        <Drawer variant="permanent" open={open}>
                                            <Toolbar
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    px: [1],
                                                }}
                                            >
                                                <IconButton onClick={toggleDrawer}>
                                                    <ChevronLeftIcon/>
                                                </IconButton>
                                            </Toolbar>
                                            <Divider/>
                                            <List component="nav">
                                                {mainListItems}
                                                <Divider sx={{my: 1}}/>
                                                {secondaryListItems}
                                            </List>
                                        </Drawer>
                                        <Box
                                            component="main"
                                            sx={{
                                                backgroundColor: (theme) =>
                                                    theme.palette.mode === 'light'
                                                        ? theme.palette.grey[100]
                                                        : theme.palette.grey[900],
                                                flexGrow: 1,
                                                height: '100vh',
                                                overflow: 'auto',
                                            }}
                                        >
                                            <Toolbar/>
                                            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                                                {/*Main container include function here*/}
                                                <Component/>
                                                <Copyright sx={{pt: 4}}/>
                                            </Container>
                                        </Box>
                                    </Box>
                                </ThemeProvider>
                            }
                        />
                    )
                })}
            </Route>
        </Routes>

    );
}
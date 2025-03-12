import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { Outlet } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Link from '@mui/material/Link';
import NotificationPage from '../component/pages/NotificationPage';
import Popover from '@mui/material/Popover';

import MainScreenPage from "../component/pages/MainScreenPage.jsx"
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CenteredModal from "../component/pages/CenteredModal";



// Import logo
import logo from "../assets/logo.png";

//new icons
import DashboardIcon from "../icons/grid_view_25dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg";
import MenuOpenIcon from "../icons/menu_open_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import QuickLinksIcon from "../icons/dataset_linked_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import StarBorderIcon from "../icons/hotel_class_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import AccessTimeIcon from "../icons/alarm_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import NotificationsIcon from "../icons/notifications_unread_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
import SettingsIcon from "../icons/settings_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import ChevronLeftIcon from "../icons/left_panel_close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import SearchIcon from "../icons/manage_search_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
import UploadIcon from "../icons/upload_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 220;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[100],
    '&:hover': {
        backgroundColor: theme.palette.grey[200],
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Dashboard() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
    const notificationOpen = Boolean(notificationAnchorEl);
    const [openModal, setOpenModal] = useState(false);
    const [openSubMenu, setOpenSubMenu] = React.useState({});
    const [mainPageOpenComp, setMainPageOpenComp] = React.useState(false);
    const handleSubMenuToggle = (text) => {
        setOpenSubMenu((prev) => ({ ...prev, [text]: !prev[text] }));

    };
    const subItemClick = () => {
        setMainPageOpenComp(true);
    }
    const handleModalOpen = () => {
        console.log("button clicked");
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleNotificationClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    // Handle notification close
    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    // Menu items to match your original layout
    const menuItems = [
        { text: 'Dashboard', icon: <img src={DashboardIcon} alt="Dashboard" width={24} height={24} /> },
        {
            text: 'Menu', icon: <img src={MenuOpenIcon} alt="Menu" width={24} height={24} /> ,children: [
                { text: 'Master' },
                { text: 'Allied Master' },
                { text: 'Linking' },
                { text: 'Target' },
                { text: 'Others' },
                { text: 'Report' },
                { text: 'Settings' },
                { text: 'Transactions' },
                { text: 'NOC ststus' },
            ] },
        { text: 'Quick Links', icon: <img src={QuickLinksIcon} alt="Quick Links" width={24} height={24} /> },
        { text: 'Favorite', icon: <img src={StarBorderIcon} alt="Favorite" width={24} height={24} /> },
        { text: 'Scheduler', icon: <img src={AccessTimeIcon} alt="Scheduler" width={24} height={24} /> },
    ];

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{
                bgcolor: 'background.paper', color: 'text.primary', boxShadow: 0, borderBottom: 1,
                borderColor: 'divider'
            }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleNotificationClick}
                            aria-describedby="notification-popover"
                        >
                            <Badge badgeContent={999} color="error">
                                <img src={NotificationsIcon} alt="NotificationsIcon" width={24} height={24} />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" color="inherit">
                            <img src={SettingsIcon} alt="SettingsIcon" width={24} height={24} />
                        </IconButton>
                        <Divider orientation="vertical" flexItem sx={{ mx: 2, height: 62 }} />
                        <Avatar src="https://randomuser.me/api/portraits/men/45.jpg" sx={{ width: 42, height: 42, borderRadius: '4px', objectFit: 'cover' }} />
                        <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 500 }}>
                            Admin
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>


            <Popover
                id="notification-popover"
                open={notificationOpen}
                anchorEl={notificationAnchorEl}
                onClose={handleNotificationClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    mt: 1,
                    '& .MuiPopover-paper': {
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        overflow: 'visible'
                    }
                }}
            >
                <NotificationPage />
            </Popover>

            <CenteredModal open={openModal} handleClose={handleModalClose} />

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    {open && (
                        <Box
                            component="img"
                            src={logo}
                            alt="logo"
                            sx={{ height: 32, marginRight: 'auto' }}
                        />
                    )}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <img src={ChevronLeftIcon} alt="NotificationsIcon" width={20} height={20} />
                        }
                    </IconButton>
                </DrawerHeader>
                <Divider />

                {open && (
                    <Box sx={{ px: 2, py: 2, }}>
                        <Search sx={{ borderRadius: 5, }}>
                            <SearchIconWrapper >
                                <img src={SearchIcon} alt="NotificationsIcon" width={24} height={24} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "100%",
                                }}
                            />

                        </Search>
                    </Box>
                )}

                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden' // Hide overflow on the container
                    }}
                >
                    <Box sx={{overflowY: "auto"}}>
                    <List>
                        {menuItems.map((item) => (
                            <React.Fragment key={item.text}>
                                <ListItem disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        onClick={() => item.children && handleSubMenuToggle(item.text)}
                                        sx={{
                                            minHeight: 40,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                            py: 0.2,
                                        }}
                                    >
                                        {item.icon && (
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 2 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                        )}
                                        <ListItemText
                                            primary={item.text}
                                            sx={{ opacity: open ? 1 : 0 }}
                                            primaryTypographyProps={{ fontSize: '14px' }}
                                        />
                                        {open && item.children && (openSubMenu[item.text] ? <ExpandLess /> : <ExpandMore />)}
                                    </ListItemButton>
                                </ListItem>
                                {item.children && (
                                    <Collapse in={openSubMenu[item.text]} timeout="auto" unmountOnExit>
                                        {open && <List component="div" disablePadding>
                                            {item.children.map((subItem) => (
                                                <ListItemButton
                                                    onClick={() => subItemClick()}
                                                    key={subItem.text}
                                                    sx={{ bgcolor: '#F4F6F8', pl: 4, py: 0.2 }}
                                                >
                                                    <ListItemText
                                                        primary={subItem.text}
                                                        primaryTypographyProps={{ fontSize: '12px' }}
                                                    />
                                                    {/* Only show the child icon when the drawer is open */}
                                                    {open && (
                                                        <ListItemIcon sx={{ minWidth: 22, color: 'gray' }}>
                                                            <ChevronRightIcon fontSize="small" />
                                                        </ListItemIcon>
                                                    )}
                                                </ListItemButton>
                                            ))}
                                        </List>}
                                    </Collapse>
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                    </Box>
            </Box>

                
                
                <Box sx={{ mt: 'auto', mb: 2, px: 2 }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            color: 'error.main',
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: 'error.main',
                            }}
                        >
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 0, display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <DrawerHeader />

                {/* Breadcrumbs with Upload button */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1,
                    borderBottom: 1,
                    borderColor: 'divider'
                }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="#">
                            Report
                        </Link>
                        <Link underline="hover" color="inherit" href="#">
                            Sales
                        </Link>
                        <Typography color="text.primary" fontWeight="medium">Sales Analysis</Typography>
                    </Breadcrumbs>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<img src={UploadIcon} alt="NotificationsIcon" width={24} height={24} />}
                        sx={{
                            fontSize: "14px",
                            textTransform: "none",
                            fontWeight: "bold",
                            color: "#1b2c4a",
                            backgroundColor: "none",
                            padding: "5px 20px",
                            borderRadius: "10px",
                            border: "1px solid #1b2c4a",
                        }}
                        onClick={handleModalOpen}
                    >
                        Upload
                    </Button>
                </Box>

                {/* Main content area */}
                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
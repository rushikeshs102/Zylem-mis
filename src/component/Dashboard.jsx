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
import {Tooltip} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CenteredModal from "../component/pages/CenteredModal";




//new icons
import logo from "../assets/logo.png";
import DashboardIcon from "../icons/grid_view_25dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg";
import MenuOpenIcon from "../icons/menu_open_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import QuickLinksIcon from "../icons/dataset_linked_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import StarBorderIcon from "../icons/hotel_class_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import AccessTimeIcon from "../icons/alarm_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import NotificationsIcon from "../icons/notifications_unread_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"

import SettingsIcon from "../icons/settings_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import ChevronLeftIcon from "../icons/left_panel_close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import SearchIcon from "../icons/manage_search_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setScreenPage, openSideBar, closeSidebar } from '../component/Slice/GeneralStateSlice';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

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
    const [openSubMenu, setOpenSubMenu] = React.useState({});

    const [selectedItem, setSelectedItem] = React.useState(null);
    const [selectedChild, setSelectedChild] = React.useState(null);

    const [navPopupOpen, setNavPopupOpen] = useState(false); // State for navigation popup

    const handleNavPopupClose = () => {
        setNavPopupOpen(false);
    };

    const handleItemClick = (itemText) => {
        setSelectedItem(itemText);

        // Check if the menu item has children
        if (menuItems.find(item => item.text === itemText)?.children) {
            handleSubMenuToggle(itemText);

            // If submenu is being closed, reset selectedChild
            if (openSubMenu[itemText]) {
                setSelectedChild(null);
            }
        }
    };


    const handleChildClick = (subItem) => {

        console.log("clicked" + subItem);
        setNavPopupOpen(true);
        dispatch(setScreenPage({ mainScreenItem: subItem.replace(" ", "_") })) //pass selected item without space
        selectedChild(subItem);


    };


    const handleSubMenuToggle = (text) => {
        setOpenSubMenu((prev) => ({ ...prev, [text]: !prev[text] }));
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const notifyStatus = useSelector((state) => state.generalState.notificationStatus);


    React.useEffect(() => {
        setNotificationAnchorEl(false);
    }, [notifyStatus]);

    const handleDrawerOpen = () => {
        setOpen(true);
        dispatch(openSideBar());
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setNavPopupOpen(false);
        dispatch(closeSidebar());
    };

    const handleNotificationClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    // Handle notification close
    const handleNotificationClose = () => {
        setNotificationAnchorEl(false);
    };

    // Menu items to match your original layout
    const menuItems = [
        { text: 'Dashboard', icon: <img src={DashboardIcon} alt="Dashboard" width={24} height={24} /> },
        {
            text: 'Menu', icon: <img src={MenuOpenIcon} alt="Menu" width={24} height={24} />, children: [
                { text: 'Master' },
                { text: 'Allied Master' },
                { text: 'Linking' },
                { text: 'Target' },
                { text: 'Others' },
                { text: 'Reports' },
                { text: 'Settings' },
                { text: 'Transactions' },
                { text: 'NOC status' },
            ]
        },
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
                    <Box sx={{ display: 'flex', alignItems: 'center',gap:2 }}>
                        <Tooltip title={
                            <Box
                                sx={{
                                    backgroundColor: "#121212",
                                    height: "auto",
                                    overflow: "auto",

                                }}
                            >
                                <Typography

                                    sx={{ fontSize: "12px", color: "#fff" }}
                                >
                                    Notification
                                </Typography>
                            </Box>
                        } arrow
                            PopperProps={{
                                sx: {
                                    "& .MuiTooltip-tooltip": {
                                        backgroundColor: "#121212",
                                        color: "text.primary",
                                    },
                                },
                            }}>
                            <IconButton
                                size="large"
                                color="inherit"
                                onClick={handleNotificationClick}
                                aria-describedby="notification-popover"
                                sx={{
                                    height: 32,
                                    width: 32,
                                    backgroundColor: "#EBF2FF",
                                    borderRadius:'8px'
                                }}
                            >
                                <Badge badgeContent={6} color="error" >
                                    <img src={NotificationsIcon} alt="NotificationsIcon" width={24} height={24} />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={
                            <Box
                                sx={{
                                    backgroundColor: "#121212",
                                    height: "auto",
                                    overflow: "auto",

                                }}
                            >
                                <Typography

                                    sx={{ fontSize: "12px", color: "#fff" }}
                                >
                                    Settings
                                </Typography>
                            </Box>
                        } arrow
                            PopperProps={{
                                sx: {
                                    "& .MuiTooltip-tooltip": {
                                        backgroundColor: "#121212",
                                        color: "text.primary",
                                    },
                                },
                            }}>
                        <IconButton size="large" color="inherit"
                                sx={{
                                    height: 32,
                                    width: 32,
                                    backgroundColor: "#EBF2FF",
                                    borderRadius: '8px'
                                }}
                            >
                                <SettingsOutlinedIcon width={24} height={24} />
                            </IconButton>
                        </Tooltip>

                        <Divider orientation="vertical" flexItem sx={{ mx: 2, height: 62 }} />
                        <Avatar src="https://randomuser.me/api/portraits/men/5.jpg" sx={{ width: 42, height: 42, borderRadius: '4px', objectFit: 'cover' }} />
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
                    <Box sx={{ px: 2, paddingTop: 1, width: "110%" }}>
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
                    <List>
                        {menuItems.map((item) => (
                            <React.Fragment key={item.text}>
                                <ListItem disablePadding sx={{ display: "block" }}>
                                    <ListItemButton
                                        onClick={() => handleItemClick(item.text)}
                                        sx={{
                                            minHeight: 25,
                                            justifyContent: open ? "initial" : "center",
                                            px: 2,
                                            py: 0.2,
                                            color: openSubMenu[item.text] ? "#01429B" : "inherit",
                                            backgroundColor: openSubMenu[item.text] ? "#EBF2FF" : "inherit",
                                            borderRadius: "12px",
                                            mx: openSubMenu[item.text] ? 0.5 : null,
                                            pl: openSubMenu[item.text] ? 2.2 : 2.5,
                                        }}
                                    >
                                        {item.icon && (
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 2 : "auto",
                                                    justifyContent: "center",
                                                    filter: openSubMenu[item.text] ? "invert(17%) sepia(98%) saturate(2083%) hue-rotate(206deg) brightness(99%) contrast(92%)" : "none",
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                        )}
                                        <ListItemText
                                            primary={item.text}
                                            sx={{ opacity: open ? 1 : 0 }}
                                            primaryTypographyProps={{
                                                fontSize: "14px",
                                                fontWeight: openSubMenu[item.text] ? 600 : 400,
                                            }}
                                        />
                                        {open && item.children && (
                                            <div style={{ color: openSubMenu[item.text] ? "#1976d2" : "inherit" }}>
                                                {openSubMenu[item.text] ? <ExpandLess /> : <ExpandMore />}
                                            </div>
                                        )}
                                    </ListItemButton>
                                </ListItem>
                                {item.children && (
                                    <Collapse in={openSubMenu[item.text]} timeout="auto" unmountOnExit>
                                        {open && (
                                            <List component="div" disablePadding>
                                                {item.children.map((subItem, index) => (
                                                    <ListItemButton
                                                        onClick={() => handleChildClick(subItem.text)}
                                                        key={subItem.text}
                                                        sx={{
                                                            bgcolor: "#F4F6F8",
                                                            py: 0.2,
                                                            pl: 6,
                                                            position: "relative",
                                                            "&::before": {
                                                                content: '""',
                                                                position: "absolute",
                                                                left: 24,
                                                                top: "0%",
                                                                height: index === item.children.length - 1 ? "50%" : "100%",// Avoid extra line on first item
                                                                width: "2px",
                                                                backgroundColor: "#C4C4C4", // Line color
                                                            },
                                                            "&::after": {
                                                                content: '""',
                                                                position: "absolute",
                                                                left: 22,
                                                                top: "50%",
                                                                transform: "translateY(-50%)",
                                                                width: 8,
                                                                height: 8,
                                                                borderRadius: "50%",
                                                                backgroundColor:
                                                                    selectedChild === subItem.text ? "#01429B" : "#999",
                                                                transition: "background-color 0.3s ease-in-out", // Smooth transition effect
                                                            },
                                                            "&:hover::after": {
                                                                backgroundColor: "#01429B", // Change dot color on hover
                                                            },
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={subItem.text}
                                                            primaryTypographyProps={{
                                                                fontSize: "12px", sx: {
                                                                    color: selectedChild === subItem.text ? "#01429B" : "#000", // Change text color when selected
                                                                    transition: "color 0.3s ease-in-out", // Smooth transition
                                                                    "&:hover": {
                                                                        color: "#01429B", // Change text color on hover
                                                                    }
                                                                } }}

                                                        />

                                                        {open && (
                                                            <ListItemIcon sx={{ minWidth: 22, color: "gray" }}>
                                                                <ChevronRightIcon fontSize="small" />
                                                            </ListItemIcon>
                                                        )}
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        )}
                                    </Collapse>
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                </Box>


                <Divider sx={{ width: '100%', backgroundColor: "#D1D5DB", px: 0 }} />
                <Box sx={{ mt: 'auto', px: 2 }}>
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



                {/* Main content area */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', position: 'relative' }}>
                    {navPopupOpen && <MainScreenPage

                        onClose={handleNavPopupClose}
                        styled={{ zIndex: 1400, position: 'absolute' }}
                    />}
                    <Outlet />

                </Box>
            </Box>
        </Box>
    );
}
import * as React from 'react';
import { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Material UI
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import {
    Box,
    Toolbar,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    InputBase,
    Avatar,
    Badge,
    Popover,
    Collapse,
    Tooltip
} from '@mui/material';

import {
    ChevronRight as ChevronRightIcon,
    ExpandLess,
    ExpandMore,
    Logout as LogoutIcon,
    SettingsOutlined as SettingsOutlinedIcon
} from '@mui/icons-material';


// Components
import NotificationPage from '../component/pages/NotificationPage';
import MainScreenPage from "../component/pages/MainScreenPage.jsx";

// Redux
import { setScreenPage, openSideBar, closeSidebar } from '../component/Slice/GeneralStateSlice';

// Icons and Assets
import logo from "../assets/logo.png";
import DashboardIcon from "../icons/grid_view_25dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg";
import MenuOpenIcon from "../icons/menu_open_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import QuickLinksIcon from "../icons/dataset_linked_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import StarBorderIcon from "../icons/hotel_class_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import AccessTimeIcon from "../icons/alarm_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import NotificationsIcon from "../icons/notifications_unread_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import ChevronLeftIcon from "../icons/left_panel_close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import DrawerOpen from '../icons/right_panel_close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
import SearchIcon from "../icons/manage_search_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";



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




function Dashboard() {
    const [darkMode, setDarkMode] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [currentPath, setCurrentPath] = React.useState('/dashboard');

    const [open, setOpen] = React.useState(true);
    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
    const notificationOpen = Boolean(notificationAnchorEl);
    const [openSubMenu, setOpenSubMenu] = React.useState({});

    const [selectedItem, setSelectedItem] = React.useState(null);
    const [selectedChild, setSelectedChild] = React.useState(null);

    const [navPopupOpen, setNavPopupOpen] = useState(false); // State for navigation popup

    const [menuItemsCollapsed, setMenuItemsCollapsed] = React.useState(false);

    const handleNavPopupClose = () => {
        setNavPopupOpen(false);
    };

    const handleItemClick = (itemText) => {
        setSelectedItem(itemText);

        // Check if the menu item has children
        if (menuItems.find(item => item.text === itemText)?.children) {
            // Create a new object for openSubMenu state
            const newOpenSubMenu = {};

            // If the clicked item was not already open, open only that item
            // Otherwise close everything (clicking an already open item closes it)
            if (!openSubMenu[itemText]) {
                newOpenSubMenu[itemText] = true;
            }

            // Replace the entire openSubMenu state
            setOpenSubMenu(newOpenSubMenu);

            // If submenu was previously open, reset selectedChild
            if (openSubMenu[itemText]) {
                setSelectedChild(null);
            }
        }
    };

    const handleChildClick = (subItem) => {
        console.log("clicked " + subItem);
        setNavPopupOpen(true);
        dispatch(setScreenPage({ mainScreenItem: subItem.replace(" ", "_") })); //pass selected item without space
        setSelectedChild(subItem); // Fixed: was calling selectedChild as function
        console.log(subItem)
    };

    const handleSubMenuToggle = (text) => {
        setOpenSubMenu((prev) => ({ ...prev, [text]: !prev[text] }));
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const notifyStatus = useSelector((state) => state.generalState.notificationStatus);

    const isFilterOpen = useSelector((state) => state.generalState.isFilterOpen);

    console.log("isFilterOpen :" + isFilterOpen);

    React.useEffect(() => {
        setNotificationAnchorEl(null); // Fixed: was setting to false
    }, [notifyStatus]);

    const handleDrawerOpen = () => {
        setOpen(true);
        setDrawerOpen(true);
        dispatch(openSideBar());
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setNavPopupOpen(false);
        dispatch(closeSidebar());
        setDrawerOpen(false);
    };

    const handleNotificationClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    // Handle notification close
    const handleNotificationClose = () => {
        setNotificationAnchorEl(null); // Fixed: was setting to false
    };

    const toggleMenuCollapse = () => {
        console.log("state: " + menuItemsCollapsed);

        if (menuItemsCollapsed === true) { // Fixed: was using == instead of ===
            setMenuItemsCollapsed(false);
            console.log("open drawer");
            handleDrawerOpen();
        } else {
            setMenuItemsCollapsed(true);
            console.log("closed drawer");
            handleDrawerClose();
        }
    };

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
        {
            text: 'Quick Links', icon: <img src={QuickLinksIcon} alt="Quick Links" width={24} height={24} />, children: [
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
        { text: 'Favorite', icon: <img src={StarBorderIcon} alt="Favorite" width={24} height={24} /> },
        { text: 'Scheduler', icon: <img src={AccessTimeIcon} alt="Scheduler" width={24} height={24} /> },
    ];

    // Create theme with light/dark mode support
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? 'dark' : 'light',
                },
                breakpoints: {
                    values: {
                        xs: 0,
                        sm: 600,
                        md: 600,
                        lg: 1200,
                        xl: 1536,
                    },
                },
            }),
        [darkMode]
    );

    const toggleDrawer = () => {
        if (drawerOpen === true) { // Fixed: was using == instead of ===
            setMenuItemsCollapsed(false);
            console.log("open drawer");
            handleDrawerOpen();
        } else {
            setMenuItemsCollapsed(true);
            console.log("closed drawer");
            handleDrawerClose();
        }
        setDrawerOpen(!drawerOpen);
    };

    const handleNavigation = (path) => {
        setCurrentPath(path);
    };

    // Drawer width when open
    const drawerWidth = 200;
    // Drawer width when closed (icon only)
    const collapsedDrawerWidth = 65;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                {/* Header */}
                <Box position="fixed" sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: 0,
                    borderBottom: 1,
                    borderColor: 'divider',
                    width: '100%' // Ensure the header spans the full width
                }}>
                    <Toolbar sx={{
                        justifyContent: 'space-between',
                        padding: '0 16px',
          
                        minHeight: '55px !important',  // Force override
                        height: '55px !important',
                    }} >
                        {/* Logo on left side */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", width: "175px" }}>
                                <Box
                                    component="img"
                                    src={logo}
                                    alt="logo"
                                    sx={{ height: 38, marginRight: 'auto' }}
                                />
                                {
                                    drawerOpen ?
                                        <IconButton onClick={handleDrawerClose}>

                                            <img src={ChevronLeftIcon} alt="SidebarClose" width={20} height={20} />
                                        </IconButton>
                                        :
                                        <IconButton onClick={handleDrawerOpen}>
                                            <img src={DrawerOpen} alt="SidebarOpen" width={20} height={20} />
                                        </IconButton>
                                }
                            </Box>
                        </Box>

                        <Divider orientation="vertical" sx={{ height: "55px" }} />


                        {/* Icons on right side */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            marginLeft: 'auto' // Ensure this section is pushed to the right
                        }}>
                            <Tooltip title={
                                <Box sx={{ backgroundColor: "#121212", height: "auto", overflow: "auto" }}>
                                    <Typography sx={{ fontSize: "12px", color: "#fff" }}>
                                        Notification
                                    </Typography>
                                </Box>
                            }
                                arrow
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
                                        borderRadius: '8px'
                                    }}
                                >
                                    <Badge badgeContent={6} color="error">
                                        <img src={NotificationsIcon} alt="NotificationsIcon" width={24} height={24} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={
                                <Box sx={{ backgroundColor: "#121212", height: "auto", overflow: "auto" }}>
                                    <Typography sx={{ fontSize: "12px", color: "#fff" }}>
                                        Settings
                                    </Typography>
                                </Box>
                            }
                                arrow
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
                                    sx={{
                                        height: 32,
                                        width: 32,
                                        backgroundColor: "#EBF2FF",
                                        borderRadius: '8px'
                                    }}
                                >
                                    <SettingsOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>

                            <Divider orientation="vertical" sx={{ height: "55px" }} />

                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                <Avatar
                                    src="https://randomuser.me/api/portraits/men/5.jpg"
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        borderRadius: '4px',
                                        objectFit: 'cover'
                                    }}
                                />
                                <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 500 }}>
                                    Admin
                                </Typography>
                            </Box>
                        </Box>
                    </Toolbar>
                </Box>

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

                {/* Main content with collapsible sidebar */}
                <Box sx={{ position: "fixed", display: 'flex', flexGrow: 1, pt: '55px', width:"100%" }}>
                    {/* Sidebar - always visible, collapsible */}

                    <Box
                        component="nav"
                        sx={{
                            width: drawerOpen ? drawerWidth : collapsedDrawerWidth,
                            flexShrink: 0,
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                            borderRight: `1px solid ${theme.palette.divider}`,
                            bgcolor: theme.palette.background.paper,
                            overflowX: 'hidden',
                            height: '100%',
                            position: 'relative',
                            zIndex: 1500,
                        }}
                    >
                        <Box sx={{ height: 480, }}>
                            {/*search box*/}
                            {open && <Box sx={{ px: 2, paddingTop: 1, width: "110%" }}>
                                <Search sx={{ borderRadius: 5, }}>
                                    <SearchIconWrapper >
                                        <img src={SearchIcon} alt="SearchIcon" width={24} height={24} />
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
                            </Box>}

                            <List>
                                {menuItems.map((item) => (
                                    <React.Fragment key={item.text}>
                                        <ListItem disablePadding sx={{ display: "block" }}>
                                            <ListItemButton
                                                onClick={() => handleItemClick(item.text)}
                                                sx={{
                                                    height: 25,

                                                    justifyContent: open ? "initial" : "center",
                                                    px: 2,
                                                    py: open? 2:2.5,
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
                                                            filter: openSubMenu[item.text]
                                                                ? "invert(17%) sepia(98%) saturate(2083%) hue-rotate(206deg) brightness(99%) contrast(92%)"
                                                                : "none",
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
                                                                        height: index === item.children.length - 1 ? "50%" : "100%",
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
                                                                        }
                                                                    }}
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

                        {/* Logout button at bottom of sidebar */}
                        <Box sx={{

                            position: 'fixed',
                            bottom: 0,
                            width: '200px',
                            border: `1px solid ${theme.palette.divider}`,
                            height: "55px",
                         
                            
                        }}>
                            <ListItemButton
                                sx={{
                                   
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    color: 'error.main',
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                       
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


                    </Box>

                    <Box component="main" sx={{ flexGrow: 1, p: 0, display: 'flex', flexDirection: 'column', height: '100vh', width:"100%" }}>




                        {/* Main content area */}
                        <Box sx={{ flexGrow: 1, overflow: 'auto', backgroundColor: '#F4F6F8',  height: "100%" ,}}>
                            {navPopupOpen && <MainScreenPage

                                onClose={handleNavPopupClose}
                                styled={{ zIndex: 1400, position: 'relative' }}
                            />}
                            <Outlet />

                        </Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Dashboard;
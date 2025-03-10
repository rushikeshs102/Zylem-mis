import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import QuickLinksIcon from "@mui/icons-material/Link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import TableViewIcon from "@mui/icons-material/TableView";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import DragDropApp from "./DragDropApp";

// Menu items with nested structure
const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "menu",
    title: "Menu",
    icon: <MenuIcon />,
    children: [
      { title: "Report", segment: "submenu-item-1" },
      { title: "Submenu Item 2", segment: "submenu-item-2" },
    ],
  },
  {
    segment: "quick-links",
    title: "Quick Links",
    icon: <QuickLinksIcon />,
    children: [
      { title: "Link 1", segment: "link-1" },
      { title: "Link 2", segment: "link-2" },
    ],
  },
  {
    segment: "favorite",
    title: "Favorite",
    icon: <FavoriteIcon />,
    children: [
      { title: "Favorite 1", segment: "favorite-1" },
      { title: "Favorite 2", segment: "favorite-2" },
    ],
  },
  {
    segment: "scheduler",
    title: "Scheduler",
    icon: <ScheduleIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          "& .MuiToolbar-root": {
            "& .MuiTypography-root": {
              display: "none",
            },
          },
        },
      },
    },
  },
  colorSchemes: { light: true, dark: true },
});


function CustomNavigation({ onNavigate }) {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (title) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleNavigate = (segment) => {
    if (onNavigate) {
      onNavigate(segment);
    }
  };

  return (
    <List>
      {NAVIGATION.map((item) => (
        <React.Fragment key={item.title}>
          <ListItem
            button
            onClick={() => {
              if (item.children) {
                toggleItem(item.title);
              } else {
                handleNavigate(item.segment);
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
            {item.children &&
              (openItems[item.title] ? (
                <ExpandMoreIcon />
              ) : (
                <ChevronRightIcon />
              ))}
          </ListItem>

          {item.children && (
            <Collapse in={openItems[item.title]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children.map((child, index) => (
                  <ListItem
                    key={index}
                    button
                    sx={{ pl: 4 }}
                    onClick={() => handleNavigate(child.segment)}
                  >
                    <ListItemText primary={child.title} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}

      <ListItem
        button
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <ListItemIcon>
          <LogoutIcon color="error" />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          slotProps={{ primary: { sx: { color: "error.main" } } }}
        />
      </ListItem>
    </List>
  );
}

function DemoPageContent({ pathname }) {
  // Extract the last segment from the pathname or use the full pathname
  const currentSegment = pathname.split("/").pop() || pathname;

  // Check for the segment instead of the full path
  if (currentSegment === "submenu-item-1") {
    return <DragDropApp />;
  }

  // Default dashboard content
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h5" mb={2}>
        Dashboard content for {pathname}
      </Typography>
    </Box>
  );
}

function DashboardLayoutAccount({ window }) {
  const [session, setSession] = useState({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  const authentication = useMemo(
    () => ({
      signIn: () =>
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        }),
      signOut: () => setSession(null),
    }),
    []
  );

  const router = useDemoRouter("/dashboard");
  const demoWindow = window ? window() : undefined;

  const handleNavigate = (segment) => {
    // Just update the active segment in state instead of changing the URL
    router.push("/" + segment, { shallow: true });
  };

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      customNavigation={() => <CustomNavigation onNavigate={handleNavigate} />}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func,
};

export const Dashboard = () => {
  return <DashboardLayoutAccount />;
};

export default Dashboard;

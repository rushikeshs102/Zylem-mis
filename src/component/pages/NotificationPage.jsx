import * as React from "react";
import { Box, Tab, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText, Divider, Button } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import CardActionArea from '@mui/material/CardActionArea';


const notifications = {
    read: [
        { id: 1, name: "Michel S.", message: "requests permission to edit the scheduler section", time: "1 day ago", avatar: "https://randomuser.me/api/portraits/men/3.jpg", read: true },
        { id: 2, name: "Suhas D.", message: "requests permission to edit the scheduler section", time: "3 days ago", avatar: "https://randomuser.me/api/portraits/men/4.jpg", read: true }
    ],
    unread: [
        { id: 3, name: "Ratan M.", message: "requests permission to edit the scheduler section", time: "6 days ago", avatar: "https://randomuser.me/api/portraits/men/5.jpg", read: false },
        { id: 4, name: "Avi S.", message: "requests permission to edit the scheduler section", time: "9 days ago", avatar: "https://randomuser.me/api/portraits/women/1.jpg", read: false },
        {
            id: 5, name: "Susha L.", message: "requests permission to edit the scheduler section", time: "9 days ago", avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            read:false
        },
        { id: 6, name: "Robert M.", message: "requests permission to edit the scheduler section", time: "10 days ago", avatar: "https://randomuser.me/api/portraits/men/9.jpg" }
    ]
};

// Merge read and unread notifications for the general tab
const generalNotifications = [...notifications.read, ...notifications.unread];

export default function NotificationPage() {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCancel = () => {
        console.log("Cancel button click");
    }
    return (
        <Box sx={{ width: 310, height: 430, border: "1px solid #D1D5DB", borderRadius: "8px", background: "#fffff", p: 0, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', }}>
            <TabContext value={value}>
                {/* Tab List */}
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, fontFamily: 'sans-serif' }}>
                            Notification
                        </Typography>
                        <Button sx={{ background: 'none', minWidth: 0, padding: 0, }} onClick={handleCancel}>
                            <ClearRoundedIcon sx={{ color: '#909090' }} fontSize="small" />
                        </Button>

                    </Box>
                    <TabList
                        onChange={handleChange}
                        aria-label="notification tabs"
                        textColor="primary"
                        indicatorColor="#121212"
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            minHeight: "36px", // Reduce overall height
                            px: 0.5,
                            mb: -0.7, // Move divider line up slightly
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#121212", // Change indicator line color to black
                                height: "2px",
                                bottom: 5, // Align it properly with the divider

                            },
                            
                        }}
                    >
                        <Tab label="General" value="1" sx={{ flexGrow: 1, textTransform: "none", fontSize: "14px", fontWeight: 500, minHeight: "30px", p: 0, "&.Mui-selected": { color: "#374151" } }} />
                        <Tab label="Read" value="2" sx={{ flexGrow: 1, textTransform: "none", fontSize: "14px", fontWeight: 500, minHeight: "30px", p: 0, "&.Mui-selected": { color: "#374151" } }} />
                        <Tab label="Unread" value="3" sx={{ flexGrow: 1, textTransform: "none", fontSize: "14px", fontWeight: 500, minHeight: "30px", p: 0, "&.Mui-selected": { color: "#374151" } }} />
                    </TabList>


                </Box>

                <Box sx={{ height: 360, overflow: 'auto'}}>
                    <TabPanel value="1" sx={{ p: 0 }}>
                        <NotificationList data={generalNotifications} />
                    </TabPanel>
                    <TabPanel value="2" sx={{ p: 0, background: "#F4F6F8" }}>
                        <NotificationList data={notifications.read} />
                    </TabPanel>
                    <TabPanel value="3" sx={{ p: 0 }}>
                        <NotificationList data={notifications.unread} />
                    </TabPanel>
                </Box>
            </TabContext>
        </Box>
    );
}

// Component to Render Notification Items
const NotificationList = ({ data }) => {
    return (

        <List sx={{ p: 0 }}>
            {data.map((item, index) => (
                <React.Fragment key={item.id}>
                    <CardActionArea>
                    <ListItem alignItems="flex-start" sx={{ px: 1, py: 0.3, backgroundColor: item.read ? "#F4F6F8" : "transparent" }}>
                        <ListItemAvatar>
                            <Avatar src={item.avatar} sx={{ width: 35, height: 35 }} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="body2" sx={{ fontSize: "12px", color: "#374151" }}>
                                    <strong>{item.name}</strong>
                                    <span style={{ color: '#909090' }}> {item.message} </span>
                                </Typography>
                            }
                            secondary={<Typography sx={{ fontSize: "10px", color: "#909090" }}>
                                <FiberManualRecordRoundedIcon sx={{ fontSize: '8px', paddingRight: '2px', color: '#909090' }} />
                                {item.time}</Typography>}
                        />
                    </ListItem>
                    </CardActionArea>
                    {index < data.length - 1 && <Divider sx={{ width: "100%", color:'#D1D5DB' }} />}
                </React.Fragment>
            ))}
        </List>
    );
};

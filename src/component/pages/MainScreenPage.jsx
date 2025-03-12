import React, { useState, useRef, useEffect } from "react";

import { Box, Tab, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText, Divider, Button, ListItemButton } from "@mui/material";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';


export default function MainScreenPage() {
    const [menuState, setMenuState] = useState("Reports");
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeSubItems, setActiveSubItems] = useState([]);
    const [subMenuPosition, setSubMenuPosition] = useState(0);

    // Create refs for each list item
    const itemRefs = useRef({});

    const navigationConfig = {
        Master: [
            { id: 1, title: 'Master 1' },
            { id: 2, title: 'Master 2' },
            { id: 3, title: 'Master 3' },
        ],
        Allied_Master: [],
        Linking: [],
        Target: [],
        Other: [],
        Reports: [
            { id: 1, title: 'Sales', subItems: ['Invoice Count', 'Sales Analysis', 'YTD Availability'] },
            { id: 2, title: 'Scheme', subItems: ['option 1', 'option 2','option 3'] },
            { id: 3, title: 'Status', subItems: ['Status Item 1', 'Status Item 2'] },
            { id: 4, title: 'Analytics', subItems: ['option 1', 'option 2'] },
            { id: 5, title: 'Purchase', subItems: ['option 1', 'option 2'] },
            { id: 6, title: 'Query', subItems: ['option 1', 'option 2'] },
            { id: 7, title: 'Stock & Sales', subItems: ['option 1', 'option 2', 'option 3', 'option 4'] },
            { id: 8, title: 'Target', subItems: ['option 1', 'option 2'] },
            { id: 9, title: 'Dump Report', subItems: ['option 1', 'option 2'] },
            { id: 10, title: 'Zylem Table View', subItems: ['option 1', 'option 2'] },
            { id: 11, title: 'Listing', subItems: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6'] },
        ],
        Settings: [],
    };

    const handleCancel = () => {
        console.log('cancel button clicked');
    };

    const handleItemClick = (item) => {
        setSelectedItem(item.id);
        setActiveSubItems(item.subItems || []);

        // Get position of the clicked item for subnavigation positioning
        if (itemRefs.current[item.id]) {
            const elementTop = itemRefs.current[item.id].offsetTop;
            setSubMenuPosition(elementTop);
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", width: "100%", position: "relative" }}>
                {/* Main navigation */}
                <Box
                    sx={{
                        width: "200px",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "5px",
                        border: "1px solid #D1D5DB",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "visible"
                    }}
                >
                    <Box sx={{ p: 1, display: "flex", justifyContent: "space-between", width: '100%' }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                            {menuState}
                        </Typography>
                        <Button sx={{ background: 'none', minWidth: 0, padding: 0, }} onClick={handleCancel}>
                            <ClearRoundedIcon sx={{ color: '#909090' }} fontSize="small" />
                        </Button>
                    </Box>
                    <Divider sx={{ width: '100%', backgroundColor: "#D1D5DB" }} />
                    <Box sx={{ p: 1, px: 0, fontSize: '14px' }}>
                        {navigationConfig[menuState]?.map((item) => (
                            <ListItem
                                key={item.id}
                                disablePadding
                                ref={el => itemRefs.current[item.id] = el}
                            >
                                <ListItemButton
                                    onClick={() => handleItemClick(item)}
                                    sx={{
                                        '&:hover': { backgroundColor: '#e0f7fa' },
                                        borderLeft: selectedItem === item.id ? '4px solid #03438d' : 'none',
                                        backgroundColor: selectedItem === item.id ? '#e3f2fd' : 'transparent',
                                        display: 'flex',
                                        justifyContent: 'left',
                                        pl: 0,
                                    }}
                                >
                                    <ChevronRightRoundedIcon sx={{ fontSize: "20px", mr: 2, ml: 1 }} />
                                    <Typography sx={{ whiteSpace: 'normal', wordWrap: 'break-word', overflow: 'hidden', fontSize: "14px" }}>
                                        {item.title}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </Box>
                </Box>

                {/* Sub navigation */}
                {activeSubItems.length > 0 && (
                    <Box
                        sx={{
                            width: "200px",
                            position: "absolute",
                            left: "199px", // Position right next to main menu
                            top: subMenuPosition, // Position at the level of the selected item
                            zIndex: 100,
                            border: "1px solid #D1D5DB",
                            backgroundColor: "#f5f5f5",
                            borderLeft: 'none',
                            borderTopRightRadius: "5px",
                            borderBottomRightRadius: "5px"
                        }}
                    >
                        {activeSubItems.map((subItem, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton sx={{ '&:hover': { backgroundColor: '#e0f7fa' }, pl: 1 }}>
                                    <ChevronRightRoundedIcon sx={{ fontSize: "16px", mr: 1 }} />
                                    <Typography sx={{ whiteSpace: 'normal', wordWrap: 'break-word', fontSize: "14px" }}>
                                        {subItem}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </Box>
                )}
            </Box>
        </>
    );
}
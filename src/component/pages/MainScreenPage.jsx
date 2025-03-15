import React, { useState, useRef, useEffect } from "react";
import {
    Box, Typography, List, ListItem, ListItemText, Divider, Button, ListItemButton
} from "@mui/material";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
export default function MainScreenPage({ open, onClose }) {
    const navigate = useNavigate();
    const [localSelectedItem, setlocalSelectedItem] = useState(null);
    const [activeSubItems, setActiveSubItems] = useState([]);
    const [subMenuPosition, setSubMenuPosition] = useState(0);

    let globalSelectedItem = useSelector((state) => state.generalState.mainScreenItem);
    const menuState = useSelector((state) => state.generalState.mainScreenItem);
    const dispatch = useDispatch();

    const theme = useTheme();

    const itemRefs = useRef([]);
    const navigationConfig = {
        Master: [
            { id: 1, title: 'Distributor' },
            { id: 2, title: 'Supplier' },
            { id: 3, title: 'User' },
            { id: 4, title: 'Area Tree' },
            { id: 5, title: 'Customer' },
            { id: 6, title: 'Item' },
            { id: 7, title: 'Scheme' },

        ],
        Allied_Master: [
            { id: 1, title: 'License Type' },
            { id: 2, title: 'Brand' },
            { id: 3, title: 'Flavour' },
            { id: 4, title: 'Size' },
            { id: 5, title: 'Item Type' },
            { id: 6, title: 'Item Class' },
            { id: 7, title: 'Item Group' },
        ],
        Linking: [
            { id: 1, title: 'Route Outlet Master' },
            { id: 2, title: 'Scheme Exception Account' },
        ],

        Target: [
            { id: 1, title: 'Target vs Achivement' },

        ],
        Others: [
            { id: 1, title: 'Scheme Deactivate' },
            { id: 2, title: 'File Import Approval' },
            { id: 3, title: 'API Data Exchange' },
            { id: 4, title: 'Distributor Division Lag Days CSV' },
        ],
        Reports: [
            { id: 1, title: 'Sales', subItems: ['Invoice Count', 'Sales Analysis', 'YTD Availability'] },
            { id: 2, title: 'Scheme', subItems: ['option 1', 'option 2', 'option 3'] },
            { id: 3, title: 'Status', subItems: ['Status Item 1', 'Status Item 2'] },
            { id: 4, title: 'Analytics', subItems: ['option 1', 'option 2'] },
            { id: 5, title: 'Purchase', subItems: ['option 1', 'option 2'] },
            { id: 6, title: 'Query', subItems: ['option 1', 'option 2'] },
            { id: 7, title: 'Stock & Sales', subItems: ['option 1', 'option 2', 'option 3', 'option 4'] },
            { id: 8, title: 'Target', subItems: ['option 1', 'option 2'] },
            { id: 9, title: 'Dump Report', subItems: ['option 1', 'option 2'] },
            { id: 10, title: 'Zylem Table View', subItems: ['option 1', 'option 2'] },
            { id: 11, title: 'Listing', subItems: ['option 1', 'option 2', 'option 3'] },
        ],
        Settings: [
            { id: 1, title: 'Configuration' },
            { id: 2, title: 'Linking' },
            { id: 3, title: 'Posting' },
            { id: 4, title: 'Sequensing' },
            { id: 5, title: 'Change Password' },
            { id: 6, title: 'Distributor Division' },
            { id: 7, title: 'Import Blank Files' },
            { id: 8, title: 'Company Purchase Item Link' },
            { id: 9, title: 'Zylem Templates' },
            { id: 10, title: 'Distributor Division Verification' },
            { id: 11, title: 'User Access Rights' },
        ],
        Transactions: [
            { id: 1, title: 'Manual Stock Sales Excel' },
            { id: 2, title: 'Online Entry' },
            { id: 3, title: 'Office Entry' },
            { id: 4, title: 'Distributor Sales Entry Online' },
            { id: 5, title: 'Sales Additional Details' },
        ],
        NOC_ststus: [
            { id: 1, title: 'Pending Actions' },
            { id: 2, title: 'NOC Status' },
            { id: 3, title: 'NOC Details' },
        ]
    };

    const handleCancel = () => {
        onClose();
    };

    const handleItemClick = (item) => {
        setlocalSelectedItem(item.id);
        setActiveSubItems(item.subItems || []);

        if (itemRefs.current[item.id]) {
            const elementTop = itemRefs.current[item.id].offsetTop;
            setSubMenuPosition(elementTop);
        }
    };

    const handleSubItemClick = (subItem) => {
        if (subItem == 'Sales Analysis') {
            onClose();
            navigate("/mainScreenPage/SalesAnalysisPage")
        }
    };

    useEffect(() => {
        if (open) {
            setlocalSelectedItem(null);
            setActiveSubItems([]);
        }
    }, [open]);

    return (
        <Box sx={{ width: "100%", height: "100%", zIndex: theme.zIndex.modal + 10, position: 'absolute', /*backgroundColor: 'rgba(0, 0, 0, 0.2)'*/ }}>
            {/* Main navigation */}
            <Box
                sx={{
                    width: "200px",
                    height: '100%',
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #D1D5DB",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "visible",
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Box sx={{ p: 1, display: "flex", justifyContent: "space-between", width: '100%' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                        {menuState ? menuState.replace("_", " ") : ""}
                    </Typography>
                    <Button sx={{ background: 'none', minWidth: 0, padding: 0 }} onClick={handleCancel}>
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
                                    '&:hover': { backgroundColor: '#e3f2fd', borderLeft: '4px solid #03438d' },
                                    borderLeft: localSelectedItem === item.id ? '4px solid #03438d' : 'none',
                                    backgroundColor: localSelectedItem === item.id ? '#e3f2fd' : 'transparent',
                                    display: 'flex',
                                    justifyContent: 'left',
                                    pl: 0,
                                    py: 0.7
                                }}
                            >
                                <ChevronRightRoundedIcon sx={{ fontSize: "16px", mr: 2, ml: 1 }} />
                                <Typography sx={{ whiteSpace: 'normal', wordWrap: 'break-word', overflow: 'hidden', fontSize: "12px" }}>
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
                        left: "199px",
                        top: subMenuPosition,
                        zIndex: 1400,
                        border: "1px solid #D1D5DB",
                        backgroundColor: "#f5f5f5",
                        borderLeft: 'none',
                        borderTopRightRadius: "5px",
                        borderBottomRightRadius: "5px",
                        boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {activeSubItems.map((subItem, index) => (
                        <ListItem key={index} disablePadding >
                            <ListItemButton
                                sx={{
                                    '&:hover': { backgroundColor: '#e3f2fd', borderLeft: '4px solid #03438d' },
                                    pl: 1,
                                    py: 0.7
                                }}
                                onClick={() => handleSubItemClick(subItem)}
                            >
                                <ChevronRightRoundedIcon sx={{ fontSize: "16px", mr: 1 }} />
                                <Typography sx={{ whiteSpace: 'normal', wordWrap: 'break-word', fontSize: "12px" }}>
                                    {subItem}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </Box>
            )}
        </Box>
    );
}
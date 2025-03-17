import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import SearchIcon from "../../icons/manage_search_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
import TableViewIcon from "@mui/icons-material/TableView";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import NotificationPage from '../pages/NotificationPage'
import Divider from "@mui/material/Divider";
import { MenuItem, Stack, FormControl, OutlinedInput, Select, InputLabel, Breadcrumbs } from "@mui/material";
import Link from '@mui/material/Link';
import CloseIcon1 from '@mui/icons-material/Close';
import MinusCloseIcon from "../../icons/do_not_disturb_on_25dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg";
import EditIcon from "../../icons/border_color_25dp_2854C5_FILL0_wght400_GRAD0_opsz24.svg";
import DragIndicatorIcon from "../../icons/drag_indicator_25dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg";
import SigmaIcon from "../../icons/functions_24dp_75FB4C_FILL0_wght400_GRAD0_opsz24.svg";
import UpDownArrawIcon from "../../icons/swap_vert_25dp_F19E39_FILL0_wght400_GRAD0_opsz24.svg";
import FilterIcon from "../../icons/filter_alt_25dp_48752C_FILL0_wght400_GRAD0_opsz24.svg";
import DocsAddIcon from "../../icons/docs_add_on_25dp_48752C_FILL0_wght400_GRAD0_opsz24.svg";
import CloseIcon from "../../icons/close_icon.svg";
import Popover from "@mui/material/Popover";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import { List, ListItem } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import calandericon from "../../icons/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import { IconButton } from "@mui/material";
import CenteredModal from '../pages/CenteredModal';
import UploadIcon from "../../icons/upload_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FilterClose from "../../icons/dock_to_right_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import {  useSelector } from "react-redux";


function SalesAnalysis() {
    const initialItems = ["Account",
        "Account Code",
        "Batch Number",
        "Business Unit",
        "City",
        "Company",
        "Country",
        "Creation Date",
        "Date",
        "Day",
        "Dealer",
        "Dealer Code",
        "Dispatch Date",];

    const [openModal, setOpenModal] = useState(false);


    const handleModalOpen = () => {
        console.log("button clicked");
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };



    // drag and drop states
    const [controllers, setControllers] = useState([...initialItems].sort());
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [search, setSearch] = useState("");
    const [editPopoverAnchorEl, setEditPopoverAnchorEl] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [orderByChecked, setOrderByChecked] = useState({});
    const [subTotalChecked, setSubTotalChecked] = useState({});
    const [isDraggingOverRows, setIsDraggingOverRows] = useState(false);
    const [isDraggingOverColumns, setIsDraggingOverColumns] = useState(false);
    const [tempOrderByChecked, setTempOrderByChecked] = useState({});
    const [tempSubTotalChecked, setTempSubTotalChecked] = useState({});
    const [subtotalPanelOpen, setSubtotalPanelOpen] = useState(false);
    const [orderByPanelOpen, setOrderByPanelOpen] = useState(false);
    const [subtotalAnchorEl, setSubtotalAnchorEl] = useState(null);
    const [orderByAnchorEl, setOrderByAnchorEl] = useState(null);


    // Filter states
    const [criteria, setCriteria] = useState("Select Filter");
    const [value, setValue] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [fromCalendarAnchor, setFromCalendarAnchor] = useState(null);
    const [toCalendarAnchor, setToCalendarAnchor] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(true);

    // filter const avlues 
    const fromCalendarOpen = Boolean(fromCalendarAnchor);
    const toCalendarOpen = Boolean(toCalendarAnchor);


    // Sidebar state access
    const sideBarState = useSelector((state) => state.generalState.sidebarState);


    // drag and drop functions

    const handleSubtotalIconClick = (event) => {
        setSubtotalAnchorEl(event.currentTarget);
        setSubtotalPanelOpen(true);
        setOrderByPanelOpen(false);
    };

    const handleOrderByIconClick = (event) => {
        setOrderByAnchorEl(event.currentTarget);
        setOrderByPanelOpen(true);
        setSubtotalPanelOpen(false);
    };

    const handleCloseSubtotalPanel = () => {
        setSubtotalPanelOpen(false);
        setSubtotalAnchorEl(null);
    };

    const handleCloseOrderByPanel = () => {
        setOrderByPanelOpen(false);
        setOrderByAnchorEl(null);
    };

    const handleRemoveSubtotal = (item) => {
        const newSubTotalChecked = { ...subTotalChecked };
        delete newSubTotalChecked[item];
        setSubTotalChecked(newSubTotalChecked);
    };

    const handleRemoveOrderBy = (item) => {
        const newOrderByChecked = { ...orderByChecked };
        delete newOrderByChecked[item];
        setOrderByChecked(newOrderByChecked);
    };

    const handleEditClick = (event, item) => {
        setEditPopoverAnchorEl(event.currentTarget);
        setEditingItem(item);

        setTempOrderByChecked({
            ...tempOrderByChecked,
            [item]: orderByChecked[item] || false
        });
        setTempSubTotalChecked({
            ...tempSubTotalChecked,
            [item]: subTotalChecked[item] || false
        });
    };

    const handleEditClose = () => {
        setEditPopoverAnchorEl(null);
        setEditingItem(null);
    };

    const handleSaveSettings = () => {
        setOrderByChecked({
            ...orderByChecked,
            [editingItem]: tempOrderByChecked[editingItem]
        });
        setSubTotalChecked({
            ...subTotalChecked,
            [editingItem]: tempSubTotalChecked[editingItem]
        });
        handleEditClose();
    };

    const onDragEnd = (result) => {
        setIsDraggingOverRows(false);
        setIsDraggingOverColumns(false);
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId !== "controllers") {
            return;
        }
        const actualItem = filteredItems[source.index];
        if (destination.droppableId === "rows") {
            const newRows = [...rows];
            newRows.splice(destination.index, 0, actualItem);
            setRows(newRows);
            setControllers(controllers.filter(item => item !== actualItem));
        }
        else if (destination.droppableId === "columns") {
            const newColumns = [...columns];
            newColumns.splice(destination.index, 0, actualItem);
            setColumns(newColumns);
            setControllers(controllers.filter(item => item !== actualItem));
        }
    };

    const filteredItems = controllers.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    );

    const removeItem = (item, sourceList) => {
        if (sourceList === "rows") {
            setRows(rows.filter(rowItem => rowItem !== item));
            setControllers([...controllers, item].sort());
            const newOrderByChecked = { ...orderByChecked };
            const newSubTotalChecked = { ...subTotalChecked };
            delete newOrderByChecked[item];
            delete newSubTotalChecked[item];
            setOrderByChecked(newOrderByChecked);
            setSubTotalChecked(newSubTotalChecked);
        } else if (sourceList === "columns") {
            setColumns(columns.filter(colItem => colItem !== item));
            setControllers([...controllers, item].sort());
        }
    };

    const onDragUpdate = (update) => {
        if (!update.destination) {
            setIsDraggingOverRows(false);
            setIsDraggingOverColumns(false);
            return;
        }
        setIsDraggingOverRows(update.destination.droppableId === "rows");
        setIsDraggingOverColumns(update.destination.droppableId === "columns");
    };

    const resetRows = () => {
        setControllers(
            (prev) => [...prev, ...rows].sort()
        );
        setRows([]);
        setOrderByChecked({});
        setSubTotalChecked({});
    };

    const resetColumns = () => {
        setControllers(
            (prev) => [...prev, ...columns].sort() // Always keep sorted order
        );
        setColumns([]);
    };

    const getSubTotalTooltipContent = () => {
        const items = Object.keys(subTotalChecked).filter(key => subTotalChecked[key]);
        if (items.length === 0) return "SubTotal";
        return (
            <Box>

                <Typography fontSize="14px" fontWeight="bold" display="flex" alignItems="center" justifyContent="center" >
                    Subtotal
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        borderBottom: "1px solid white",

                    }}
                />
                <Box>
                    <List>
                        {items.map((item) => (
                            <ListItem key={item} sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 0, m: 0 }}>
                                {item}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        );
    };

    const getOrderByTooltipContent = () => {
        const items = Object.keys(orderByChecked).filter(key => orderByChecked[key]);
        if (items.length === 0) return "Order By";
        return (
            <Box>
                <Typography fontSize="14px" fontWeight="bold" display="flex" alignItems="center" justifyContent="center" >
                    Order By
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        borderBottom: "1px solid white",
                    }}
                />
                <Box>
                    <List>
                        {items.map((item) => (
                            <ListItem key={item} sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 0, m: 0 }} >
                                {item}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        );
    };

    const getFilterTooltipContent = () => {
        if (criteria === "Select Filter") return "Filter";
        return (
            <Box>
                <Typography fontSize="14px" fontWeight="bold" display="flex" alignItems="center" justifyContent="center" >
                    Filter
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        borderBottom: "1px solid white",
                    }}
                />
                <Typography sx={{ fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", p: 0, m: 0 }} >
                    {criteria}
                </Typography>
            </Box>
        );
    };


    // Filter functions

    const handleCriteriaChange = (e) => {
        setCriteria(e.target.value);
        setValue(""); // Reset value when criteria changes
    };

    const handleFromCalendarOpen = (event) => {
        setFromCalendarAnchor(event.currentTarget);
    };

    const handleFromCalendarClose = () => {
        setFromCalendarAnchor(null);
    };

    const handleFromDateChange = (date) => {
        setFromDate(date);
        handleFromCalendarClose();
    };

    const handleToCalendarOpen = (event) => {
        setToCalendarAnchor(event.currentTarget);
    };

    const handleToCalendarClose = () => {
        setToCalendarAnchor(null);
    };

    const handleToDateChange = (date) => {
        setToDate(date);
        handleToCalendarClose();
    };

    const handleOpenFilter = () => {
        setIsFilterOpen(true);
    };

    const handleCloseFilter = () => {
        setIsFilterOpen(false);
    };




    // MUI styles for Filter Panel
    const selectStyles = {
        borderRadius: '8px',
        height: '32px',
        fontSize: '12px',
        color: '#909090',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(209, 213, 219)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#60a5fa',
            borderWidth: '1px',
        },
        '& .MuiSelect-select': {
            padding: '4px 14px',
            borderRadius: '8px',
        },
        "& .MuiOutlinedInput-input": {
            color: "gray",
            "&::placeholder": {
                fontSize: '12px',
                color: "#909090",
                opacity: 1,
            },
        },

        "& .MuiInputBase-root": {
            color: "#121212",
        },
    };

    const inputStyles = {
        borderRadius: '10px',
        height: '35px',
        fontSize: '12px',
        color: '#909090',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(209, 213, 219)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#60a5fa',
            borderWidth: '2px',
        },
        '& .MuiOutlinedInput-input': {
            padding: '4px 14px',
        }
    };

    const labelStyles = {
        fontSize: '12px',
        fontWeight: 500,
        color: 'rgb(55, 65, 81)',
        marginBottom: '4px',
        display: 'block'
    };

    const checkboxStyles = {
        padding: '0',

        color: '#909090',
        '&.Mui-checked': {
            color: '#1b2c4a',
        }
    };

    const calendarStyle = {

        width: '239px',

        height: '250px', // Fixed height to prevent overflow

        borderRadius: '10px',

        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

        overflow: 'hidden', // Hide scrollbars

        marginBottom: 0,

        '& .MuiPickersCalendarHeader-root': {

            backgroundColor: '#1a2b4b',

            height: '40px',

            display: 'flex',

            alignItems: 'center',

            width: "100%",

            marginTop: 0,

            justifyContent: 'space-between',

            color: 'white',

            padding: '0 12px',

            position: 'sticky',

            top: 0,

            zIndex: 10,

        },

        '& .MuiPickersCalendarHeader-label': {

            fontSize: '14px',

            fontWeight: '500',

        },

        '& .MuiPickersArrowSwitcher-root, & .MuiPickersArrowSwitcher-button': {

            color: 'white',

            fontSize: '21px',

        },

        '& .MuiDayCalendar-weekContainer': {

            display: 'grid',

            gridTemplateColumns: 'repeat(7, 1fr)',

            gap: '2px',

        },

        '& .MuiDayCalendar-weekDayLabel': {

            fontSize: '10px',

            color: '#666',

            fontWeight: 'bold',

            textTransform: 'uppercase',

            textAlign: 'center',

        },

        '& .MuiPickersDay-root': {

            fontSize: '13px',

            width: '30px',

            height: '30px',

            display: 'flex',

            alignItems: 'center',

            justifyContent: 'center',

            borderRadius: '50%',

            margin: 'auto',

        },

        '& .MuiPickersDay-root.Mui-selected': {

            backgroundColor: '#1a4b8c',

            color: '#FFFFFF',

            fontWeight: 'bold',

            border: '2px solid #1a4b8c',

            width: '30px',

            height: '30px',

        },

        '& .MuiPickersDay-today': {

            position: 'relative',

            fontWeight: 'bold',

        },

        '& .MuiPickersDay-today::after': {

            content: '""',

            position: 'absolute',

            bottom: '-2px',

            left: '50%',

            transform: 'translateX(-50%)',

            width: '4px',

            height: '4px',

            borderRadius: '50%',

            backgroundColor: '#1a4b8c',

        },

        '& .MuiPickersDay-root:hover': {

            backgroundColor: 'rgba(26, 75, 140, 0.1)',

            borderRadius: '50%',

        },

        // Year selection styling

        '& .MuiYearCalendar-root': {

            display: 'grid',

            width: "100%",

            height: "100%",

            gridTemplateColumns: 'repeat(3, 1fr)',

            gap: '6px',

            padding: '8px',

            justifyContent: 'center',

        },

        '& .MuiPickersYear-yearButton': {

            fontSize: '14px',

            padding: '8px',

            width: '60px',

            height: '35px',

            textAlign: 'center',

        },

        // Month selection styling

        '& .MuiMonthCalendar-root': {

            display: 'grid',

            width: "100%",

            height: "100%",

            gridTemplateColumns: 'repeat(3, 1fr)',

            gap: '1px',

            padding: '4px',

            justifyContent: 'center',

            marginTop: 0,

        },

        '& .MuiPickersMonth-monthButton': {

            fontSize: '14px',

            padding: '8px',

            width: '70px',

            height: '35px',

            textAlign: 'center',

        },

        '& .MuiPopover-paper': {

            minHeight: 'auto',

            maxHeight: '400px',

            overflow: 'hidden', // Ensures no scrollbar appears

        },

    };


    return (
        <>


            <CenteredModal open={openModal} handleClose={handleModalClose} />
            {/* Breadcrumbs*/}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1,
                borderBottom: 1,
                borderColor: 'divider'
            }}>
                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="large" />}>
                    <Link underline="hover" color="inherit" href="#">
                        Report
                    </Link>
                    <Link underline="hover" color="inherit" href="#">
                        Sales
                    </Link>
                    <Typography color="text.primary" fontWeight="medium">
                        Sales Analysis
                    </Typography>
                </Breadcrumbs>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<img src={UploadIcon} alt="NotificationsIcon" width={24} height={24} className="upload-icon" />}
                    sx={{
                        fontSize: "14px",
                        textTransform: "none",
                        fontWeight: "bold",
                        color: "#1b2c4a",
                        backgroundColor: "none",
                        padding: "5px 20px",
                        borderRadius: "10px",
                        border: "1px solid #1b2c4a",
                        "&:hover": {
                            backgroundColor: "#01429B",
                            color: "#ffffff",
                            borderColor: "#01429B",
                            "& .upload-icon": {
                                filter: "brightness(0) invert(1)", // Turns the icon white
                            },
                        },
                    }}
                    onClick={handleModalOpen}
                >
                    Upload
                </Button>
            </Box>
            <div style={{ backgroundColor: '#F4F6F8' }} className="flex flex-1 w-full h-[90%]">
                {/* Sales Filter Panel - Always visible */}

                {!isFilterOpen && (
                    <IconButton size="small" onClick={handleOpenFilter} sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "0 8px 8px 0",
                        position: "absolute", // Adjust positioning
                        top: "60px", // Fine-tune as needed
                        left: "0px",
                        backgroundColor: "#4682b4",
                        '&:hover': { backgroundColor: "#36648b" }
                    }}>
                        <img src={FilterClose} alt="FilterClose" width={24} height={24} />
                    </IconButton>
                )}

                {isFilterOpen && (
                    <Box sx={{
                        width: '27%',
                        bgcolor: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        p: 2,
                        borderRight: '1px solid rgb(229, 231, 235)',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                            borderBottom: '1px solid rgb(229, 231, 235)',
                            pb: 1,
                            bgcolor: 'white',
                            position: 'sticky',
                            top: 0,
                            zIndex: 50,


                        }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                                Filter
                            </Typography>
                            <Box sx={{ right: 0 }}>
                                <IconButton size="small" onClick={handleCloseFilter}  >
                                    <CloseIcon1 fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>

                        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                            <Stack spacing={2}>
                                <Box>
                                    <InputLabel sx={labelStyles}>Consider</InputLabel>
                                    <FormControl fullWidth size="small" variant="outlined" >
                                        <Select
                                            displayEmpty
                                            defaultValue=""

                                            sx={{ ml: 0.5, width: '96%', borderRadius: 2, height: 35 }}
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return <span style={{ color: '#909090', fontSize: "12px" }}>Select option</span>;
                                                }
                                                return selected;
                                            }}
                                        >
                                            <MenuItem value="">Select option</MenuItem>
                                            <MenuItem value="option1">Option 1</MenuItem>
                                            <MenuItem value="option2">Option 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <InputLabel sx={labelStyles}>Period</InputLabel>
                                    <FormControl fullWidth size="small" variant="outlined">
                                        <Select
                                            displayEmpty
                                            defaultValue=""
                                            input={<OutlinedInput sx={selectStyles} />}
                                            sx={{ ml: 0.5, width: '96%', borderRadius: 2, height: 35 }}
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return <span style={{ color: '#909090', fontSize: "12px" }}>Select option</span>;
                                                }
                                                return selected;
                                            }}
                                        >
                                            <MenuItem value="">Select option</MenuItem>
                                            <MenuItem value="option1">Option 1</MenuItem>
                                            <MenuItem value="option2">Option 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>



                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ width: '50%', }}>
                                        <InputLabel sx={labelStyles}>From</InputLabel>
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            placeholder="DD/MM/YYYY"
                                            value={fromDate ? fromDate.format('DD/MM/YYYY') : ''}
                                            InputProps={{
                                                sx: inputStyles,
                                                endAdornment: (
                                                    <IconButton size="small" onClick={handleFromCalendarOpen} sx={{ marginRight: -2 }}>
                                                        <img src={calandericon} alt="calander" width={20} height={20} />
                                                    </IconButton>
                                                )
                                            }}
                                            sx={{ marginRight: 0, width: '90%' }}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                        <Popover
                                            open={fromCalendarOpen}
                                            anchorEl={fromCalendarAnchor}
                                            onClose={handleFromCalendarClose}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'center',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateCalendar
                                                    referenceDate={dayjs('2022-04-17')}
                                                    views={['year', 'month', 'day']}
                                                    value={fromDate}
                                                    onChange={handleFromDateChange}
                                                    sx={calendarStyle}
                                                />
                                            </LocalizationProvider>
                                        </Popover>
                                    </Box>
                                    <Box sx={{ width: '50%' }}>
                                        <InputLabel sx={labelStyles}>To</InputLabel>
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            placeholder="DD/MM/YYYY"
                                            value={toDate ? toDate.format('DD/MM/YYYY') : ''}
                                            InputProps={{
                                                sx: inputStyles,
                                                endAdornment: (
                                                    <IconButton size="small" onClick={handleToCalendarOpen}>
                                                        <img src={calandericon} alt="calander" width={20} height={20} />
                                                    </IconButton>
                                                )
                                            }}
                                            sx={{ width: '96%' }}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                        <Popover
                                            open={toCalendarOpen}
                                            anchorEl={toCalendarAnchor}
                                            onClose={handleToCalendarClose}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateCalendar
                                                    referenceDate={dayjs('2022-04-17')}
                                                    views={['year', 'month', 'day']}
                                                    value={toDate}
                                                    onChange={handleToDateChange}
                                                    sx={calendarStyle}
                                                />
                                            </LocalizationProvider>
                                        </Popover>
                                    </Box>
                                </Box>



                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="grandTotal"
                                            sx={checkboxStyles}
                                        />
                                    }
                                    label={
                                        <Typography sx={{ fontSize: '12px', color: 'rgb(55, 65, 81)' }}>
                                            Descending order for grandtotal
                                        </Typography>
                                    }
                                    sx={{ margin: 0 }}
                                />

                                <Divider sx={{ mb: 1, mt: 1 }} />

                                <Box>
                                    <InputLabel sx={labelStyles}>Sales For</InputLabel>
                                    <FormControl fullWidth size="small" variant="outlined">
                                        <Select
                                            displayEmpty
                                            defaultValue=""
                                            input={<OutlinedInput sx={selectStyles} />}
                                            sx={{ ml: 0.5, width: '96%', borderRadius: 2, height: 35 }}
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return <span style={{ color: '#909090', fontSize: "12px" }}>Select option</span>;
                                                }
                                                return selected;
                                            }}
                                        >
                                            <MenuItem value="">Select option</MenuItem>
                                            <MenuItem value="option1">Option 1</MenuItem>
                                            <MenuItem value="option2">Option 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <InputLabel sx={labelStyles}>Output In</InputLabel>
                                    <FormControl fullWidth size="small" variant="outlined">
                                        <Select
                                            displayEmpty
                                            defaultValue=""
                                            input={<OutlinedInput sx={selectStyles} />}
                                            sx={{ ml: 0.5, width: '96%', borderRadius: 2, height: 35 }}
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return <span style={{ color: '#909090', fontSize: "12px" }}>Select option</span>;
                                                }
                                                return selected;
                                            }}
                                        >
                                            <MenuItem value="">Select option</MenuItem>
                                            <MenuItem value="option1">Option 1</MenuItem>
                                            <MenuItem value="option2">Option 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <InputLabel sx={labelStyles}>Data Clause</InputLabel>
                                    <FormControl fullWidth size="small" variant="outlined">
                                        <Select
                                            displayEmpty
                                            defaultValue=""
                                            input={<OutlinedInput sx={selectStyles} />}
                                            sx={{ ml: 0.5, width: '96%', borderRadius: 2, height: 35 }}
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return <span style={{ color: '#909090', fontSize: "12px" }}>Select option</span>;
                                                }
                                                return selected;
                                            }}
                                        >
                                            <MenuItem value="">Select option</MenuItem>
                                            <MenuItem value="option1">Option 1</MenuItem>
                                            <MenuItem value="option2">Option 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <InputLabel sx={labelStyles}>Having Clause</InputLabel>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <FormControl variant="outlined" size="small" sx={{ flexGrow: 1 }}>
                                            <Select
                                                displayEmpty
                                                defaultValue=""
                                                input={<OutlinedInput sx={selectStyles} />}
                                                sx={{ ml: 0.5, borderRadius: 2, height: 35, width: 140 }}
                                                renderValue={(selected) => {
                                                    if (!selected) {
                                                        return <span style={{ color: '#909090', fontSize: "12px" }}>Select option</span>;
                                                    }
                                                    return selected;
                                                }}
                                            >
                                                <MenuItem value="">Select option</MenuItem>
                                                <MenuItem value="option1">Option 1</MenuItem>
                                                <MenuItem value="option2">Option 2</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            type="number"
                                            placeholder="1000"
                                            variant="outlined"
                                            size="small"
                                            InputProps={{ sx: inputStyles }}
                                            sx={{ width: '30%', height: 35, mr: 0.5 }}

                                        />
                                    </Box>
                                </Box>

                                <Box>
                                    <InputLabel sx={labelStyles}>Top</InputLabel>
                                    <TextField
                                        type="number"
                                        placeholder="1000"
                                        variant="outlined"
                                        size="small"
                                        InputProps={{ sx: inputStyles }}
                                        sx={{ ml: 0.5, width: '96%' }}
                                    />
                                </Box>

                                <Box>
                                    <InputLabel sx={labelStyles}>Transfer</InputLabel>
                                    <FormControl fullWidth size="small" variant="outlined">
                                        <Select
                                            displayEmpty
                                            defaultValue=""
                                            input={<OutlinedInput sx={selectStyles} />}
                                            sx={{ ml: 0.5, width: '96%', borderRadius: 2, height: 35 }}
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return <span style={{ color: '#909090', fontSize: "12px" }}>Select option</span>;
                                                }
                                                return selected;
                                            }}

                                        >
                                            <MenuItem value="">Select option</MenuItem>
                                            <MenuItem value="option1">Option 1</MenuItem>
                                            <MenuItem value="option2">Option 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <InputLabel sx={labelStyles}>Active</InputLabel>
                                    <FormControl fullWidth size="small" variant="outlined">
                                        <Select
                                            displayEmpty
                                            defaultValue=""
                                            input={<OutlinedInput sx={selectStyles} />}
                                            sx={{ ml: 0.5, width: '96%', borderRadius: 2, height: 35 }}
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return <span style={{ color: '#909090', fontSize: "12px" }}>Select option</span>;
                                                }
                                                return selected;
                                            }}

                                        >
                                            <MenuItem value="">Select option</MenuItem>
                                            <MenuItem value="option1">Option 1</MenuItem>
                                            <MenuItem value="option2">Option 2</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Divider sx={{ width: "100%" }} />

                                <Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="salesAdditionalDetails"
                                                sx={checkboxStyles}
                                            />
                                        }
                                        label={
                                            <Typography sx={{ fontSize: '12px', color: 'rgb(55, 65, 81)' }}>
                                                Sales Additional Details
                                            </Typography>
                                        }
                                        sx={{ margin: 0, mb: 2, mr: 2 }}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="includeValidation"
                                                sx={checkboxStyles}
                                            />
                                        }
                                        label={
                                            <Typography sx={{ fontSize: '12px', color: 'rgb(55, 65, 81)' }}>
                                                Include Validation
                                            </Typography>
                                        }
                                        sx={{ margin: 0, mb: 2, mr: 2 }}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="includePromotion"
                                                sx={checkboxStyles}
                                            />
                                        }
                                        label={
                                            <Typography sx={{ fontSize: '12px', color: 'rgb(55, 65, 81)' }}>
                                                Include Promotion
                                            </Typography>
                                        }
                                        sx={{ margin: 0, mb: 2, mr: 2 }}
                                    />
                                </Box>

                                <Box>
                                    <InputLabel sx={labelStyles}>Criteria</InputLabel>
                                    <FormControl fullWidth size="small" variant="outlined">
                                        <Select
                                            value={criteria}
                                            onChange={handleCriteriaChange}
                                            displayEmpty
                                            input={<OutlinedInput sx={selectStyles} />}
                                            sx={{ ml: 0.5, width: '96%', borderRadius: 2, height: 35 }}
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return <span style={{ color: '#909090', fontSize: "12px" }}>Select Filter</span>;
                                                }
                                                return selected;
                                            }}
                                        >
                                            <MenuItem value="">Select Filter</MenuItem>
                                            <MenuItem value="Account">Account</MenuItem>
                                            <MenuItem value="Business Unit">Business Unit</MenuItem>
                                            <MenuItem value="City">City</MenuItem>
                                            <MenuItem value="Company">Company</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <InputLabel sx={labelStyles}>Value</InputLabel>
                                    {criteria === "City" ? (
                                        <FormControl fullWidth size="small" variant="outlined">
                                            <Select
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                                displayEmpty
                                                input={<OutlinedInput sx={selectStyles} />}
                                                sx={{ ml: 0.5, width: '96%', borderRadius: 2, height: 35 }}
                                            >
                                                <MenuItem value="">Select value</MenuItem>
                                                <MenuItem value="Malwarehiva">Malwarehiva</MenuItem>
                                                <MenuItem value="Other City">Other City</MenuItem>
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        <TextField
                                            type="text"
                                            placeholder="$0, Search Value"
                                            variant="outlined"
                                            size="small"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            InputProps={{ sx: inputStyles }}
                                            fullWidth
                                        />
                                    )}
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                )}

                {/* Drag and Drop Component */}
                <div style={{ backgroundColor: '#F4F6F8' }} className="flex flex-1 w-full h-[100%]">
                    <div className="w-[75%] px-14" style={{
                        height: "100%",
                        width: "120%",
                        marginRight: isFilterOpen ? "0" : "27%",
                        //transition: "margin-Right 0.3s ease-in-out", 
                    }}>
                        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    p: 2,
                                    width: "100%",
                                    height: "90%",
                                    justifyContent: "center",
                                }}
                            >
                                {/* Controllers Dropdown */}
                                <Droppable droppableId="controllers">
                                    {(provided) => (
                                        <Paper
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            elevation={3}
                                            sx={{
                                                width: "38%",
                                                minHeight: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                borderRadius: 1,
                                            }}
                                        >
                                            <Typography variant="h9" fontWeight="bold"  sx={{ paddingLeft: 1, paddingTop:1 }}>
                                                Select controls
                                            </Typography>
                                            <TextField
                                                placeholder="Search"
                                                size="small"
                                                fullWidth
                                                sx={{
                                                    mb: 1,
                                                    p: 1,
                                                    "& .MuiInputBase-root": {
                                                        borderRadius: 1,
                                                        height: "32px",
                                                    },
                                                    "& .MuiInputBase-input": {
                                                        fontSize: "0.8rem",
                                                        paddingLeft: "5px",
                                                    },
                                                    "& .MuiInputAdornment-root": {
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: "1rem",
                                                        },
                                                    },
                                                }}
                                                onChange={(e) => setSearch(e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <img src={SearchIcon} alt="SearchIcon" width={30} height={30} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    height: "100%",
                                                    overflowY: "auto",
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    borderRadius: 1,
                                                    paddingLeft: 1,

                                                    "& .MuiPaper-root": {
                                                        boxShadow: "none",
                                                        borderRadius: 0,
                                                        borderColor: "divider",
                                                        borderBottom: "none",
                                                    },
                                                }}
                                            >
                                                {filteredItems.map((item, index) => (
                                                    <Draggable key={item} draggableId={item} index={index}>
                                                        {(provided) => (
                                                            <Paper
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                elevation={0}
                                                                sx={{
                                                                    p: 0.5,
                                                                    mb: 0,
                                                                    cursor: "pointer",
                                                                    "&:hover": {
                                                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                                                    },
                                                                }}
                                                            >
                                                                <Typography variant="body2">{item}</Typography>
                                                            </Paper>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </Box>
                                        </Paper>
                                    )}
                                </Droppable>

                                {/* Rows Column */}
                                <Box
                                    sx={{
                                        width: "38%",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                        mr: 5,
                                        //pr: 0.5,
                                    }}
                                >
                                    {/* Upper box - Rows Header */}
                                    <Paper
                                        elevation={2}
                                        sx={{
                                            width: "125%",
                                            p: 0.5,
                                            backgroundColor: "#fafafa",
                                            border: isDraggingOverRows ? 'none' : '1px solid transparent',
                                            outline: isDraggingOverRows ? '2px dashed #1b2c4a' : 'none',
                                            outlineOffset: '-2px'
                                        }}
                                    >
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                                                <Typography variant="h9" fontWeight="bold">
                                                    Rows
                                                </Typography>
                                                {rows.length > 0 &&
                                                    (<Box sx={{ display: "flex", flexDirection: "row" }}>
                                                        <Tooltip
                                                            title={
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
                                                                        {getSubTotalTooltipContent()}
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
                                                            }}
                                                        >
                                                            <Box component="span" onClick={handleSubtotalIconClick}>
                                                                <img src={SigmaIcon} alt="SigmaIcon" width={24} height={24} style={{ cursor: 'pointer' }} />
                                                            </Box>
                                                        </Tooltip>
                                                        <Tooltip
                                                            title={
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
                                                                        {getOrderByTooltipContent()}
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
                                                            }}
                                                        >
                                                            <Box component="span" onClick={handleOrderByIconClick}>
                                                                <img src={UpDownArrawIcon} alt="UpDownArrawIcon" width={24} height={24} style={{ cursor: 'pointer' }} />
                                                            </Box>
                                                        </Tooltip>
                                                        <Tooltip
                                                            title={
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
                                                                        {getFilterTooltipContent()}
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
                                                            }}
                                                        >
                                                            <Box component="span">
                                                                <img src={FilterIcon} alt="FilterIcon" width={24} height={24} />
                                                            </Box>
                                                        </Tooltip>
                                                    </Box>)}
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Selected controllers ({rows.length})
                                            </Typography>
                                            <Button
                                                variant="text"
                                                size="small"
                                                color="primary"
                                                onClick={resetRows}
                                                sx={{
                                                    fontSize: "10px",
                                                    marginTop: "10px",
                                                    textTransform: "none",
                                                    textDecoration: "underline",
                                                    fontWeight: "bold",
                                                    color: "#01429B",
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                                Reset selection
                                            </Button>
                                        </Box>
                                    </Paper>

                                    {/* Subtotal box popover */}

                                    <Popover
                                        open={subtotalPanelOpen}
                                        anchorEl={subtotalAnchorEl}
                                        onClose={handleCloseSubtotalPanel}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <Paper sx={{
                                            width: 250,
                                            p: 2,
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 2,
                                            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)'
                                        }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold">Subtotal</Typography>
                                                <CloseIcon1
                                                    fontSize="small"
                                                    onClick={handleCloseSubtotalPanel}
                                                    sx={{ cursor: 'pointer' }}
                                                />
                                            </Box>
                                            {Object.keys(subTotalChecked)
                                                .filter(key => subTotalChecked[key])
                                                .map((item) => (
                                                    <Box
                                                        key={item}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            p: 1,
                                                            mb: 1,
                                                            border: '1px solid #ccc',
                                                            borderRadius: 6,
                                                        }}
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <img src={DragIndicatorIcon} alt="DragIndicatorIcon" width={20} height={20} />
                                                            <Typography sx={{ ml: 1 }}>{item}</Typography>
                                                        </Box>
                                                        <Box
                                                            component="span"
                                                            onClick={() => handleRemoveSubtotal(item)}
                                                            sx={{ cursor: 'pointer' }}
                                                        >
                                                            <img src={MinusCloseIcon} alt="MinusCloseIcon" width={20} height={20} />
                                                        </Box>
                                                    </Box>
                                                ))}
                                        </Paper>
                                    </Popover>

                                    {/* Order by box Popover */}

                                    <Popover
                                        open={orderByPanelOpen}
                                        anchorEl={orderByAnchorEl}
                                        onClose={handleCloseOrderByPanel}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <Paper sx={{
                                            width: 250,
                                            p: 2,
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 2,
                                            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)'
                                        }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold">Order By</Typography>
                                                <CloseIcon1
                                                    fontSize="small"
                                                    onClick={handleCloseOrderByPanel}
                                                    sx={{ cursor: 'pointer' }}
                                                />
                                            </Box>
                                            {Object.keys(orderByChecked)
                                                .filter(key => orderByChecked[key])
                                                .map((item) => (
                                                    <Box
                                                        key={item}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            p: 1,
                                                            mb: 1,
                                                            border: '1px solid #ccc',
                                                            borderRadius: 6,
                                                        }}
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <img src={DragIndicatorIcon} alt="DragIndicatorIcon" width={20} height={20} />
                                                            <Typography sx={{ ml: 1 }}>{item}</Typography>
                                                        </Box>
                                                        <Box
                                                            component="span"
                                                            onClick={() => handleRemoveOrderBy(item)}
                                                            sx={{ cursor: 'pointer' }}
                                                        >
                                                            <img src={MinusCloseIcon} alt="MinusCloseIcon" width={20} height={20} />
                                                        </Box>
                                                    </Box>
                                                ))}
                                        </Paper>
                                    </Popover>

                                    {/* Lower box - Rows Drop Area */}

                                    <Droppable droppableId="rows" isDropDisabled={false}>
                                        {(provided, snapshot) => (
                                            <Paper
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                elevation={2}
                                                sx={{
                                                    width: "125%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    overflowY: "auto",
                                                    alignItems: "center",
                                                    height: rows.length === 0 ? "180px" : "auto",
                                                    maxHeight: "180px",
                                                    p: 0,
                                                    backgroundColor: "#fafafa",
                                                    border: snapshot.isDraggingOver ? 'none' : '1px solid transparent',
                                                    outline: snapshot.isDraggingOver ? '2px dashed #1b2c4a' : 'none',
                                                    outlineOffset: '-2px'
                                                }}
                                            >
                                                {rows.length === 0 && (
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            height: "100%",
                                                            width: "100%",
                                                            color: "text.disabled",
                                                        }}
                                                    >
                                                        <TableViewIcon
                                                            sx={{ fontSize: 32, mb: 1, color: "#ccc" }}
                                                        />
                                                        <Typography variant="body2">Drag & Drop here</Typography>
                                                    </Box>
                                                )}
                                                <Box sx={{ width: "100%" }}>
                                                    {rows.map((item, index) => {
                                                        // Check if this item has either orderBy or subtotal checked
                                                        const isEitherChecked = orderByChecked[item] || subTotalChecked[item];

                                                        return (
                                                            <Paper
                                                                key={item}
                                                                elevation={0}
                                                                sx={{
                                                                    width: "100%",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "space-between",
                                                                    paddingLeft: 1,
                                                                    paddingRight: 1,
                                                                    paddingTop: 1,
                                                                    paddingBottom: 1,
                                                                    "&:hover": {
                                                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                                                    },
                                                                }}
                                                            >
                                                                <img src={DragIndicatorIcon} alt="DragIndicatorIcon" width={24} height={24} />
                                                                <Typography sx={{
                                                                    paddingLeft: 2,
                                                                    paddingRight: 1,
                                                                    border: '1px solid #ccc',
                                                                    borderRadius: 4,
                                                                    width: '100%',
                                                                }}>{item}</Typography>
                                                                <img
                                                                    style={{ marginLeft: '5px', marginRight: '5px' }}
                                                                    src={MinusCloseIcon}
                                                                    alt="MinusCloseIcon"
                                                                    width={20}
                                                                    height={20}
                                                                    onClick={() => removeItem(item, "rows")}
                                                                />
                                                                {(editPopoverAnchorEl && editingItem === item) ? (
                                                                    <img src={CloseIcon} alt="CloseIcon" width={20} height={20} onClick={handleEditClose} style={{ cursor: 'pointer' }} />
                                                                ) : (
                                                                    (orderByChecked[item] || subTotalChecked[item]) ? (
                                                                        <img
                                                                            src={EditIcon}
                                                                            alt="EditIcon"
                                                                            width={20}
                                                                            height={20}
                                                                            onClick={(event) => handleEditClick(event, item)}
                                                                            style={{ cursor: 'pointer' }}
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={DocsAddIcon}
                                                                            alt="DocsAddIcon"
                                                                            width={20}
                                                                            height={20}
                                                                            onClick={(event) => handleEditClick(event, item)}
                                                                            style={{ cursor: 'pointer' }}
                                                                        />
                                                                    )
                                                                )}
                                                            </Paper>
                                                        );
                                                    })}
                                                </Box>
                                                {provided.placeholder}
                                            </Paper>
                                        )}
                                    </Droppable>

                                    {/* pop over check boxes */}

                                    <Popover
                                        open={Boolean(editPopoverAnchorEl)}
                                        anchorEl={editPopoverAnchorEl}
                                        onClose={handleEditClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}

                                    >
                                        <Box sx={{
                                            width: 140,
                                            height: 100,
                                            padding: "8px",
                                            borderRadius: "8px",
                                            backgroundColor: "white",
                                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                            display: "flex",
                                            flexDirection: "column",
                                            //justifyContent: "space-between"
                                        }}>
                                            <FormControlLabel
                                                sx={{
                                                    margin: 0,
                                                    padding: 0,
                                                    minHeight: "24px",
                                                    "& .MuiTypography-root": {
                                                        fontSize: "14px",
                                                        fontWeight: 500
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{
                                                            padding: 0,
                                                            marginRight: 0.5,
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 20
                                                            },
                                                            '&.Mui-checked': {
                                                                color: '#1b2c4a' // Change color when checked
                                                            }
                                                        }}
                                                        checked={tempOrderByChecked[editingItem] || false}
                                                        onChange={(e) => setTempOrderByChecked({
                                                            ...tempOrderByChecked,
                                                            [editingItem]: e.target.checked
                                                        })}
                                                    />
                                                }
                                                label="Order By"
                                            />
                                            <FormControlLabel
                                                sx={{
                                                    margin: 0,
                                                    padding: 0,
                                                    minHeight: "24px",
                                                    "& .MuiTypography-root": {
                                                        fontSize: "14px",
                                                        fontWeight: 500
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{
                                                            padding: 0,
                                                            marginRight: 0.5,
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 20
                                                            },
                                                            '&.Mui-checked': {
                                                                color: '#1b2c4a' // Change color when checked
                                                            }
                                                        }}
                                                        checked={tempSubTotalChecked[editingItem] || false}
                                                        onChange={(e) => setTempSubTotalChecked({
                                                            ...tempSubTotalChecked,
                                                            [editingItem]: e.target.checked
                                                        })}
                                                    />
                                                }
                                                label="Sub-Total"
                                            />
                                            <Button
                                                variant="contained"
                                                onClick={handleSaveSettings}
                                                sx={{
                                                    backgroundColor: '#1b2c4a',
                                                    padding: "2px 0",
                                                    fontSize: '11px',
                                                    fontWeight: 'bold',
                                                    width: "50%",
                                                    position: "absolute",
                                                    right: "7px",
                                                    bottom: "10px",
                                                    borderRadius: "4px",
                                                    marginTop: "4px",
                                                    '&:hover': {
                                                        backgroundColor: '#131f35',
                                                    }
                                                }}
                                            >
                                                SAVE
                                            </Button>
                                        </Box>
                                    </Popover>



                                </Box>

                                {/* Columns Column */}
                                <Box
                                    sx={{
                                        width: "40%",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,

                                    }}
                                >
                                    {/* Upper box - Columns Header */}

                                    <Paper
                                        elevation={2}
                                        sx={{
                                            width: "110%",
                                            p: 0.5,
                                            backgroundColor: "#fafafa",
                                            border: isDraggingOverColumns ? 'none' : '1px solid transparent',
                                            outline: isDraggingOverColumns ? '2px dashed #1b2c4a' : 'none',
                                            outlineOffset: '-2px'
                                        }}
                                    >
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                                                <Typography variant="h9" fontWeight="bold">
                                                    Columns
                                                </Typography>

                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Selected controllers ({columns.length})
                                            </Typography>
                                            <Button
                                                variant="text"
                                                size="small"
                                                color="primary"
                                                onClick={resetColumns}
                                                sx={{
                                                    fontSize: "10px",
                                                    marginTop: "10px",
                                                    textTransform: "none",
                                                    textDecoration: "underline",
                                                    fontWeight: "bold",
                                                    color: "#01429B",
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                }}
                                            >
                                                Reset selection
                                            </Button>
                                        </Box>
                                    </Paper>

                                    {/* Lower box - Columns Drop Area */}

                                    <Droppable droppableId="columns" isDropDisabled={false}>
                                        {(provided, snapshot) => (
                                            <Paper
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                elevation={2}
                                                sx={{
                                                    //flexGrow: 1,
                                                    width: "110%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    overflowY: "auto",
                                                    alignItems: "center",
                                                    height: columns.length === 0 ? "180px" : "auto",
                                                    maxHeight: "180px",
                                                    p: 0,
                                                    backgroundColor: "#fafafa",
                                                    border: snapshot.isDraggingOver ? 'none' : '1px solid transparent',
                                                    outline: snapshot.isDraggingOver ? '2px dashed #1b2c4a' : 'none',
                                                    outlineOffset: '-2px'
                                                }}
                                            >
                                                {columns.length === 0 && (
                                                    <Box
                                                        sx={{

                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            height: "100%",
                                                            color: "text.disabled",
                                                        }}
                                                    >
                                                        <TableViewIcon
                                                            sx={{ fontSize: 32, mb: 1, color: "#ccc" }}
                                                        />
                                                        <Typography variant="body2">Drag & Drop here</Typography>
                                                    </Box>
                                                )}
                                                {columns.map((item, index) => (
                                                    <Paper
                                                        key={item}
                                                        elevation={0}
                                                        sx={{

                                                            width: "100%",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            paddingLeft: 1,
                                                            paddingRight: 1,
                                                            paddingTop: 1,
                                                            paddingBottom: 1,
                                                            "&:hover": {
                                                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                                                            },
                                                        }}
                                                    >
                                                        <img src={DragIndicatorIcon} alt="DragIndicatorIcon" width={24} height={24}

                                                        />
                                                        <Typography sx={{
                                                            paddingLeft: 2,
                                                            paddingRight: 1,
                                                            border: '1px solid #ccc',
                                                            borderRadius: 4,
                                                            width: '100%',
                                                        }}>{item}</Typography>

                                                        <img style={{ marginLeft: '5px' }} src={MinusCloseIcon} alt="MinusCloseIcon" width={20} height={20}
                                                            onClick={() => removeItem(item, "columns")}
                                                        />
                                                    </Paper>
                                                ))}
                                                {provided.placeholder}
                                            </Paper>
                                        )}
                                    </Droppable>
                                </Box>
                            </Box>
                        </DragDropContext>
                    </div>
                </div>

                {/* bottom nav bar */}
                <div className="flex items-center justify-end gap-5 fixed bottom-0 right-0 bg-white w-full p-2 border-b border-gray-200">
                    <Button
                        variant="text"
                        size="small"
                        color="primary"
                        onClick={resetRows}
                        sx={{
                            fontSize: "12px",
                            textTransform: "none",
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "#1b2c4a",
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            fontSize: "14px",
                            textTransform: "none",
                            color: "#fff",
                            backgroundColor: "#1b2c4a",
                            padding: "5px 35px",
                            borderRadius: "10px",
                        }}
                    >
                        Generate
                    </Button>
                </div>
            </div>
        </>
    );
}

export default SalesAnalysis;
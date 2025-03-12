import { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TableViewIcon from "@mui/icons-material/TableView";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SearchIcon from "../../icons/manage_search_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";


import Popover from "@mui/material/Popover";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CloseIcon from "../../icons/do_not_disturb_on_25dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg";
import EditIcon from "../../icons/border_color_25dp_2854C5_FILL0_wght400_GRAD0_opsz24.svg";
import DragIndicatorIcon from "../../icons/drag_indicator_25dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg";
import SigmaIcon from "../../icons/functions_24dp_75FB4C_FILL0_wght400_GRAD0_opsz24.svg";
import UpDownArrawIcon from "../../icons/swap_vert_25dp_F19E39_FILL0_wght400_GRAD0_opsz24.svg";
import FilterIcon from "../../icons/filter_alt_25dp_48752C_FILL0_wght400_GRAD0_opsz24.svg";
function SalesAnalysis1() {
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
    const [controllers, setControllers] = useState([...initialItems].sort());
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [search, setSearch] = useState("");


    const [editPopoverAnchorEl, setEditPopoverAnchorEl] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [orderByChecked, setOrderByChecked] = useState({});
    const [subTotalChecked, setSubTotalChecked] = useState({});

    const handleEditClick = (event, item) => {
        setEditPopoverAnchorEl(event.currentTarget);
        setEditingItem(item);
    };

    const handleEditClose = () => {
        setEditPopoverAnchorEl(null);
        setEditingItem(null);
    };

    const handleSaveSettings = () => {
        // Save the current state for the item being edited
        // You might want to update your main data structure here
        handleEditClose();
    };



    // Add states to track dragging over rows or columns
    const [isDraggingOverRows, setIsDraggingOverRows] = useState(false);
    const [isDraggingOverColumns, setIsDraggingOverColumns] = useState(false);

    // Filter controllers based on search input
    const filteredItems = controllers.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    );

    const onDragEnd = (result) => {
        // Reset dragging states
        setIsDraggingOverRows(false);
        setIsDraggingOverColumns(false);

        const { source, destination } = result;
        if (!destination) return;

        // Only allow dragging FROM controllers TO rows/columns
        if (source.droppableId !== "controllers") {
            // If trying to drag from rows or columns, do nothing
            return;
        }

        // Get the actual item that was dragged based on the filtered list index
        const actualItem = filteredItems[source.index];

        // If destination is rows or columns, add the item and remove from controllers
        if (destination.droppableId === "rows") {
            const newRows = [...rows];
            newRows.splice(destination.index, 0, actualItem);
            setRows(newRows);

            // Remove from controllers
            setControllers(controllers.filter(item => item !== actualItem));
        }
        else if (destination.droppableId === "columns") {
            const newColumns = [...columns];
            newColumns.splice(destination.index, 0, actualItem);
            setColumns(newColumns);

            // Remove from controllers
            setControllers(controllers.filter(item => item !== actualItem));
        }
    };

    // Remove item from rows/columns and add back to controllers
    const removeItem = (item, sourceList) => {
        if (sourceList === "rows") {
            // Remove from rows
            setRows(rows.filter(rowItem => rowItem !== item));
            // Add back to controllers
            setControllers([...controllers, item].sort());
        } else if (sourceList === "columns") {
            // Remove from columns
            setColumns(columns.filter(colItem => colItem !== item));
            // Add back to controllers
            setControllers([...controllers, item].sort());
        }
    };

    // Track dragging state changes
    const onDragUpdate = (update) => {
        if (!update.destination) {
            setIsDraggingOverRows(false);
            setIsDraggingOverColumns(false);
            return;
        }

        setIsDraggingOverRows(update.destination.droppableId === "rows");
        setIsDraggingOverColumns(update.destination.droppableId === "columns");
    };

    // Reset button action
    const resetRows = () => {
        setControllers(
            (prev) => [...prev, ...rows].sort() // Always keep sorted order
        );
        setRows([]);
    };

    const resetColumns = () => {
        setControllers(
            (prev) => [...prev, ...columns].sort() // Always keep sorted order
        );
        setColumns([]);
    };

    return (
        <>
            <div style={{ backgroundColor: '#F4F6F8' }} className="flex flex-1 w-full h-[100%]">
                {/* Drag and Drop Component */}
                <div className="w-[75%] px-14" style={{ height: "100%", }}>
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
                                        <Typography variant="subtitle1" fontWeight="bold" mb={1} sx={{ paddingLeft: 2, fontSize: '14px' }}>
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
                                    width: "37%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    mr: 5,
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
                                                    <img src={SigmaIcon} alt="SigmaIcon" width={24} height={24} />
                                                    <img src={UpDownArrawIcon} alt="UpDownArrawIcon" width={24} height={24} />
                                                    <img src={FilterIcon} alt="FilterIcon" width={24} height={24} />
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
                                                {rows.map((item, index) => (
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
                                                        <img style={{ marginLeft: '5px', marginRight: '5px' }} src={CloseIcon} alt="CloseIcon" width={20} height={20}
                                                            onClick={() => removeItem(item, "rows")}
                                                        />
                                                        <img
                                                            src={EditIcon}
                                                            alt="EditIcon"
                                                            width={20}
                                                            height={20}
                                                            onClick={(event) => handleEditClick(event, item)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </Paper>
                                                ))}
                                            </Box>
                                            {provided.placeholder}
                                        </Paper>
                                    )}
                                </Droppable>

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
                                        width: 120,
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
                                                        }
                                                    }}
                                                    checked={orderByChecked[editingItem] || false}
                                                    onChange={(e) => setOrderByChecked({
                                                        ...orderByChecked,
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
                                                        }
                                                    }}
                                                    checked={subTotalChecked[editingItem] || false}
                                                    onChange={(e) => setSubTotalChecked({
                                                        ...subTotalChecked,
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

                                                    <img style={{ marginLeft: '5px' }} src={CloseIcon} alt="CloseIcon" width={20} height={20}
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
        </>
    );
}

export default SalesAnalysis1;
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import SearchIcon from "@mui/icons-material/Search";
import TableViewIcon from "@mui/icons-material/TableView";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import NotificationPage from '../pages/NotificationPage'
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
    const [controllers, setControllers] = useState([...initialItems].sort());
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [search, setSearch] = useState("");
    const [criteria, setCriteria] = useState("Select Filter");
    const [value, setValue] = useState("");

    // Filter controllers based on search input
    const filteredItems = controllers.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    );

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        // Fix: Get the actual item that was dragged based on the filtered list index
        let actualItem;
        let sourceList, setSourceList, destinationList, setDestinationList;

        if (source.droppableId === "controllers") {
            // Important: Use the filteredItems to get the actual item being dragged
            actualItem = filteredItems[source.index];
            sourceList = controllers;
            setSourceList = setControllers;
        } else if (source.droppableId === "rows") {
            actualItem = rows[source.index];
            sourceList = rows;
            setSourceList = setRows;
        } else {
            actualItem = columns[source.index];
            sourceList = columns;
            setSourceList = setColumns;
        }

        if (destination.droppableId === "controllers") {
            destinationList = controllers;
            setDestinationList = setControllers;
        } else if (destination.droppableId === "rows") {
            destinationList = rows;
            setDestinationList = setRows;
        } else {
            destinationList = columns;
            setDestinationList = setColumns;
        }

        // Fix: Remove the actual item, not the index-based item
        const newSourceList = sourceList.filter(item => item !== actualItem);

        const newDestinationList = [...destinationList];
        newDestinationList.splice(destination.index, 0, actualItem);

        setSourceList(newSourceList);
        setDestinationList(newDestinationList);
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

    const handleCriteriaChange = (e) => {
        setCriteria(e.target.value);
        setValue(""); // Reset value when criteria changes
    };


    return (
        <>

            <div style={{ backgroundColor: '#F4F6F8' }} className="flex flex-1 w-full">
                {/* Sales Filter Panel - Always visible */}
                <div className="w-80 bg-white shadow-md p-4 border-r border-gray-200 h-[calc(100vh-110px)] overflow-y-auto z-10 w-[25%]">
                    <div className="flex justify-between items-center mb-4 border-b pb-2">
                        <h2 className="text-sm font-semibold">Filter</h2> {/* Heading 14px */}
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                Consider
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg  text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8">
                                <option>Select option</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                Period
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8">
                                <option>Select option</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/2">
                                <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                    From
                                </label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8"
                                    placeholder="DD/MM/YYYY"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                    To
                                </label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8"
                                    placeholder="DD/MM/YYYY"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="grandTotal"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                            />
                            <label htmlFor="grandTotal" className="text-xs text-gray-700"> {/* Text 12px */}
                                Descending order of Grandtotal
                            </label>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                Sales For
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8">
                                <option>Select option</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                Output In
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8">
                                <option>Select option</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                Data Clause
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8">
                                <option>Select option</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                Having Clause
                            </label>
                            <div className="flex items-center gap-2">
                                <select className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8">
                                    <option>Select option</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                </select>
                                <input
                                    type="number"
                                    placeholder="1000"
                                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8 w-24"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                Top
                            </label>
                            <input
                                type="number"
                                placeholder="1000"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                Transfer
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8">
                                <option>Select option</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                Active
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8">
                                <option>Select option</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                            </select>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="Sales Additional Details"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                                />
                                <label htmlFor="includeValidation" className="text-xs text-gray-700"> {/* Text 12px */}
                                    Sales Additional Details
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="includeValidation"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                                />
                                <label htmlFor="includeValidation" className="text-xs text-gray-700"> {/* Text 12px */}
                                    Include Validation
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="includePromotion"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                                />
                                <label htmlFor="includePromotion" className="text-xs text-gray-700"> {/* Text 12px */}
                                    Include Promotion
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                Criteria
                            </label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8"
                                value={criteria}
                                onChange={handleCriteriaChange}
                            >
                                <option>Select Filter</option>
                                <option>Account</option>
                                <option>Business Unit</option>
                                <option>City</option>
                                <option>Company</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1"> {/* Text 12px */}
                                Value
                            </label>
                            {criteria === "City" ? (
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                >
                                    <option>Select value</option>
                                    <option>Malwarehiva</option>
                                    <option>Other City</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    placeholder="$0, Search Value"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-xs h-8"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Panel */}

                {/* Drag and Drop Component */}
                <div className="h-full w-[75%] px-14">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                p: 2,
                                width: "100%",
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
                                                        <SearchIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                maxHeight: 350,
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
                                }}
                            >
                                {/* Upper box - Rows Header */}
                                <Paper elevation={2} sx={{ p: 0.5 }}>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Box>
                                            <Typography variant="h9" fontWeight="bold">
                                                Rows
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Selected controllers ({rows.length})
                                            </Typography>
                                        </Box>
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
                                <Droppable droppableId="rows">
                                    {(provided) => (
                                        <Paper
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            elevation={2}
                                            sx={{
                                                flexGrow: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                overflowY: "auto",
                                                alignItems: "center",
                                                maxHeight: "200px",
                                                p: 0,
                                                backgroundColor: "#fafafa",
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
                                                        color: "text.disabled",
                                                    }}
                                                >
                                                    <TableViewIcon
                                                        sx={{ fontSize: 32, mb: 1, color: "#ccc" }}
                                                    />
                                                    <Typography variant="body2">Drag & Drop here</Typography>
                                                </Box>
                                            )}
                                            {rows.map((item, index) => (
                                                <Draggable key={item} draggableId={item} index={index}>
                                                    {(provided) => (
                                                        <Paper
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            elevation={0}
                                                            sx={{ paddingLeft: 2, width: "100%" }}
                                                        >
                                                            <Typography>{item}</Typography>
                                                        </Paper>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </Paper>
                                    )}
                                </Droppable>
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
                                <Paper elevation={2} sx={{ p: 0.5 }}>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Box>
                                            <Typography variant="h9" fontWeight="bold">
                                                Columns
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Selected controllers ({columns.length})
                                            </Typography>
                                        </Box>
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
                                <Droppable droppableId="columns">
                                    {(provided) => (
                                        <Paper
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            elevation={2}
                                            sx={{
                                                flexGrow: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                overflowY: "auto",
                                                alignItems: "center",
                                                maxHeight: "200px",
                                                p: 0,
                                                backgroundColor: "#fafafa",
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
                                                <Draggable key={item} draggableId={item} index={index}>
                                                    {(provided) => (
                                                        <Paper
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            elevation={0}
                                                            sx={{ paddingLeft: 2, width: "100%" }}
                                                        >
                                                            <Typography>{item}</Typography>
                                                        </Paper>
                                                    )}
                                                </Draggable>
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
            <div className="flex items-center justify-end fixed bottom-0 right-0 bg-white w-full p-2 border-b border-gray-200">
                <button className="flex items-center text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" style={{ backgroundColor: "#1b2c4a" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                    </svg>
                    Generate
                </button>
            </div>
        </>
    );
}

export default SalesAnalysis;
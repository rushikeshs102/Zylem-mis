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

function SalesAnalysis() {
  const initialItems = ["A", "D", "B", "C", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
  const [controllers, setControllers] = useState([...initialItems].sort());
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [search, setSearch] = useState("");

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

  return (
    <div className="flex flex-1">
      {/* Sales Filter Panel - Always visible */}
      <div className="w-80 bg-white shadow-md p-4 border-r border-gray-200 h-[calc(100vh-110px)] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold">Filter</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consider
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400">
              <option>Select option</option>
              <option>Select option</option>
              <option>Select option</option>
              <option>Select option</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400">
              <option>Select option</option>
              <option>Select option</option>
              <option>Select option</option>
              <option>Select option</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="DD/MM/YYYY"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
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
            <label htmlFor="grandTotal" className="text-sm text-gray-700">
              Descending order of Grandtotal
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sales For
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400">
              <option>Select option</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Output In
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400">
              <option>Select option</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Clause
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400">
              <option>Select option</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Having Clause
            </label>
            <div className="flex items-center gap-2">
              <select className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400">
                <option>Select option</option>
              </select>
              <input
                type="number"
                placeholder="1000"
                className="p-2 border border-gray-300 rounded-md w-24 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Panel */}
      <div className="w-[calc(100%-320px)] bg-[var(--primary-bg)] p-4 h-[calc(100vh-110px)] overflow-auto">
        {/* Drag and Drop Component */}
        <div className="bg-white h-full">
          <DragDropContext onDragEnd={onDragEnd}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                bgcolor: "background.default",
                width: "100%"
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
                      width: "33%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" mb={1} sx={{paddingLeft: 2}}>
                      Select Controllers
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
                  width: "33%",
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
                  width: "33%",
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
    </div>
  );
}

export default SalesAnalysis;
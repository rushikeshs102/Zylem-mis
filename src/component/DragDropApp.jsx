import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TableViewIcon from "@mui/icons-material/TableView";
import { FaSearch, FaRedo, FaTable } from "react-icons/fa";
import { Margin } from "@mui/icons-material";

const initialItems = [
  "A",
  "D",
  "B",
  "C",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
];

const DragDropApp = () => {
  const initialItems = [
    "A",
    "D",
    "B",
    "C",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
  ];
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          bgcolor: "background.default",
          maxWidth: "110vh",
          minHeight: "80vh",
          position: "absolute",
          right: "5vh",
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
                  p:1,
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
  );
};

export default DragDropApp;

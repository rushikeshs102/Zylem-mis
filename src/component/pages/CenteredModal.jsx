import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
//import close_icon from './Icons/close_icon.svg';
//import add_file_icon from './Icons/add_file.svg';
//import info_icon from './Icons/info.svg';
//import delete_icon from './Icons/delete.svg';
//import file_icon from './Icons/file.svg';

import close_icon from '../../icons/close_icon.svg';
import add_file_icon from '../../icons/add_file.svg';
import info_icon from '../../icons/info.svg';
import delete_icon from '../../icons/delete.svg';
import file_icon from '../../icons/file.svg';

import { useDropzone } from 'react-dropzone'; // Import the useDropzone hook

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function CenteredModal({ open, handleClose }) {
    const [selectedFiles, setSelectedFiles] = React.useState([]);

    const isButtonDisabled = selectedFiles.length === 0; // Disable button if no files are selected

    const removeFile = (fileName) => {
        setSelectedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };

    const height1 = selectedFiles.length === 0 ? '362px' : `${207 + ((selectedFiles.length - 1) * 50)}px`;

    // Drag-and-Drop functionality using react-dropzone
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            // Add dropped files to the selected files state
            setSelectedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
        },
        multiple: false,
        maxSize: 10 * 1024 * 1024, 
    });

    return (
        <div>
            <Modal
                open={open}
                onClose={(event, reason) => {
                    if (reason === 'backdropClick') {
                        return;
                    }
                    handleClose();
                }}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disableBackdropClick
            >
                <Paper
                    sx={{
                        width: '100%',
                        maxWidth: '453px',
                        height: selectedFiles.length === 0 ? '362px' : height1,
                        bgcolor: 'background.paper',
                        borderRadius: '8px',
                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column', 
                        overflow: 'hidden', 
                    }}
                >
                    {/* Modal Content */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid black',
                            p: 1,
                        }}
                    >
                        <Typography sx={{ fontSize: '14px', fontWeight: '600', marginLeft: 2 }}>Upload Files</Typography>
                        <Button
                            onClick={handleClose}
                            sx={{
                                padding: 0,
                                minWidth: 0,
                                backgroundColor: '#F1F1F1',
                                border: '4px solid #EDEDED',
                                marginRight: 2,
                            }}
                        >
                            <img src={close_icon} alt="Close" style={{ width: '20px', height: '20px' }} />
                        </Button>
                    </Box>

                    {/* File Selection */}
                    <Box
                        sx={{
                            flexGrow: 1, // Allow to grow and take up space
                            overflowY: 'auto', // Enable scrolling if content overflows
                            paddingBottom: 1, // Add padding for some space between files and button
                        }}
                    >
                        {/* Conditional Drag & Drop Box */}
                        {selectedFiles.length === 0 && (
                            <Box
                                {...getRootProps()} 
                                sx={{
                                    mt: 2,
                                    width: '398px',
                                    height: '207px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '8px',
                                    border: 2,
                                    borderColor: '#D1D5DB',
                                    borderStyle: 'dashed',
                                    textAlign: 'center',
                                    display: 'block',
                                    alignItems: 'center',
                                    marginLeft: 4,
                                }}
                            >
                                <input {...getInputProps()} />
                                <IconButton component="label" variant="outlined" sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: 'white',
                                            borderRadius: '8px',
                                            width: 65,
                                            height: 65,
                                            boxShadow: 2,
                                            mt: 2,
                                            mb: 2,
                                        }}
                                    >
                                        <img src={add_file_icon} alt="Add File" />
                                    </Box>
                                </IconButton>
                                <Box sx={{ mt: 2 }}>
                                    <Typography sx={{ fontSize: '12px', color: "#BEBEBE" }}>
                                        Drag & drop or click to choose files
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                                        <img src={info_icon} alt="Info" style={{ width: '12px', height: '12px', marginRight: '2px', marginLeft: '33%' }} />
                                        <Typography sx={{ fontSize: '12px', color: "#A7A7A7", fontWeight: 600 }}>
                                            Max file size is 10MB
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )}

                        {/* Display Selected Files */}
                        {selectedFiles.length > 0 && (
                            <Box sx={{
                                mt: 2,
                                ml: 3,
                                width: '398px',
                            }}>
                                {selectedFiles.map((file) => (
                                    <Box key={file.name} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        border: '1px solid #EDEDED',
                                        padding: 1,
                                        borderRadius: 2,
                                        mb: 2,
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}>
                                            <Box
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mr: 1,
                                                }}
                                            >
                                                {/* Icon representing file type */}
                                                <img src={file_icon} alt="File Icon" />
                                            </Box>
                                            <Box>
                                                <Typography sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 500,
                                                    wordBreak: 'break-word',
                                                    maxWidth: '200px',
                                                }}>
                                                    {file.name}
                                                </Typography>
                                                <Typography sx={{ fontSize: '10px', color: '#A7A7A7' }}>
                                                    {file.type} | {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Button
                                            variant="text"
                                            sx={{ fontSize: '12px', color: '#FF4D4D' }}
                                            onClick={() => removeFile(file.name)}
                                        >
                                            <img src={delete_icon} alt="Remove File" />
                                        </Button>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* Container for the upload button */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: 3 }}>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                width: '398px',
                                height: '40px',
                                backgroundColor: isButtonDisabled ? '#9a9a9a' : '#1b2c4a',
                                color: '#ffffff',
                            }}
                            disabled={isButtonDisabled}
                        >
                            Upload
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </div>
    );
}

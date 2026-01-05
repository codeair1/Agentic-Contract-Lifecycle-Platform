import { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
  Chip,
  IconButton,
} from '@mui/material';
import { CloudUpload, Close, InsertDriveFile, CheckCircle } from '@mui/icons-material';
import { useDropzone } from 'react-dnd';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function UploadDialog({ open, onClose }: UploadDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select a file to upload');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      toast.success('Contract uploaded successfully!');
      setTimeout(() => {
        setUploading(false);
        setFiles([]);
        onClose();
      }, 1000);
    }, 2500);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Upload Contract
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* Upload Area */}
        <Box
          sx={{
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            bgcolor: 'action.hover',
            cursor: 'pointer',
            transition: 'all 0.3s',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.selected',
            },
          }}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drop files here or click to browse
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Supported formats: PDF, DOCX (Max 10MB)
          </Typography>
          <input
            id="file-input"
            type="file"
            hidden
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            multiple
          />
        </Box>

        {/* File List */}
        <AnimatePresence>
          {files.length > 0 && (
            <Box sx={{ mt: 3 }}>
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      mb: 1,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <InsertDriveFile sx={{ color: 'primary.main', mr: 2 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {file.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Box>
                    {uploadProgress === 100 ? (
                      <CheckCircle sx={{ color: 'success.main' }} />
                    ) : (
                      <IconButton size="small" onClick={() => handleRemoveFile(index)}>
                        <Close fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </motion.div>
              ))}
            </Box>
          )}
        </AnimatePresence>

        {/* Upload Progress */}
        {uploading && (
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Uploading...
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {uploadProgress}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 8, borderRadius: 4 }} />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} disabled={uploading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={files.length === 0 || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

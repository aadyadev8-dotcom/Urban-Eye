const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001; // Backend will run on a different port

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Ensure complaints.json exists
const COMPLAINTS_FILE = path.join(__dirname, 'complaints.json');
if (!fs.existsSync(COMPLAINTS_FILE)) {
  fs.writeFileSync(COMPLAINTS_FILE, '[]');
}

// CORS middleware
app.use(cors());

// Body parser for JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory (for map.html and styles.css)
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Multer upload middleware with file size limit (50MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50 MB
});

// POST /api/upload endpoint
app.post('/api/upload', upload.single('media'), (req, res) => {
  console.log('Received upload request.');
  if (req.file) {
    const fileUrl = `/uploads/${req.file.filename}`;
    console.log('File uploaded:', fileUrl);
    return res.json({ success: true, fileUrl });
  } else if (req.body.url) {
    // Handle remote URL upload (no actual file upload, just return the URL)
    const remoteUrl = req.body.url;
    console.log('Remote URL provided:', remoteUrl);
    // Basic validation for URL format
    if (!remoteUrl.startsWith('http://') && !remoteUrl.startsWith('https://')) {
      return res.status(400).json({ success: false, message: 'Invalid URL format.' });
    }
    return res.json({ success: true, fileUrl: remoteUrl });
  } else {
    console.error('No file or URL provided for upload.');
    return res.status(400).json({ success: false, message: 'No file or URL provided.' });
  }
});

// POST /api/complaints endpoint
app.post('/api/complaints', (req, res) => {
  console.log('Received complaint submission:', req.body);
  const { category, description, fileUrl, coords } = req.body;

  if (!category || !description || !coords) {
    console.error('Missing required fields for complaint.');
    return res.status(400).json({ success: false, message: 'Missing required fields: category, description, and coordinates.' });
  }

  try {
    const complaintsData = JSON.parse(fs.readFileSync(COMPLAINTS_FILE, 'utf8'));
    const newComplaint = {
      id: Date.now().toString(),
      category,
      description,
      fileUrl: fileUrl || null, // fileUrl is optional
      coords,
      timestamp: new Date().toISOString()
    };
    complaintsData.push(newComplaint);
    fs.writeFileSync(COMPLAINTS_FILE, JSON.stringify(complaintsData, null, 2));
    console.log('Complaint submitted successfully:', newComplaint.id);
    res.json({ success: true, message: 'Complaint submitted successfully!' });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ success: false, message: 'Failed to submit complaint.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Static files served from ${path.join(__dirname, 'public')}`);
  console.log(`Uploaded media served from ${UPLOADS_DIR}`);
});
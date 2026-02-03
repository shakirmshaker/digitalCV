const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;

// Multer configuration for profile image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'images'));
  },
  filename: (req, file, cb) => {
    cb(null, 'profile.jpg');
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory during development
app.use(express.static('public'));

// Save CV data endpoint
app.post('/api/save-cv-data', async (req, res) => {
  try {
    const cvData = req.body;
    console.log('Saving CV data, name:', cvData.profileData?.name);

    // Save to both locations to keep them in sync
    const srcPath = path.join(__dirname, 'src', 'data', 'cvData.json');
    const publicPath = path.join(__dirname, 'public', 'data', 'cvData.json');

    console.log('Writing to:', srcPath);
    console.log('Writing to:', publicPath);

    const jsonData = JSON.stringify(cvData, null, 2);

    // Write to both files
    await fs.writeFile(srcPath, jsonData, 'utf8');
    await fs.writeFile(publicPath, jsonData, 'utf8');

    console.log('CV data saved successfully to both locations');
    console.log('Data size:', jsonData.length, 'bytes');

    res.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving CV data:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get CV data endpoint (optional - for fetching latest data)
app.get('/api/cv-data', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'src', 'data', 'cvData.json');
    console.log('Reading CV data from:', dataPath);

    const data = await fs.readFile(dataPath, 'utf8');
    const parsedData = JSON.parse(data);

    console.log('CV data loaded, name:', parsedData.profileData?.name);
    console.log('File size:', data.length, 'bytes');

    res.json(parsedData);
  } catch (error) {
    console.error('Error reading CV data:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', port: PORT });
});

// Upload profile image endpoint
app.post('/api/upload-profile-image', upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    console.log('Profile image uploaded:', req.file.filename);
    console.log('File size:', req.file.size, 'bytes');

    res.json({
      success: true,
      message: 'Profile image uploaded successfully',
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
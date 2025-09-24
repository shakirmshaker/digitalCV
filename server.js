const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
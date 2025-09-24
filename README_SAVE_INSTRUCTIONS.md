# How to Save CV Data

This application provides multiple ways to save your CV data:

## Method 1: Using the Express Server (Recommended)

This method saves directly to the JSON files in your project.

### Setup:
1. Open a terminal in the project directory
2. Run the server: `node server.js`
3. In another terminal, run the React app: `npm start`
4. The app will open at http://localhost:3000

### Saving:
1. Click the Edit button (pencil icon) when logged in
2. Make your changes
3. Click the Save button (disk icon)
4. Your changes will be saved to both:
   - `src/data/cvData.json`
   - `public/data/cvData.json`

## Method 2: Download and Replace JSON (No Server Required)

If you don't want to run the server:

1. Click the Edit button (pencil icon) when logged in
2. Make your changes
3. Click the Download JSON button (file download icon)
4. The `cvData.json` file will be downloaded
5. Manually replace these files with your downloaded file:
   - `src/data/cvData.json`
   - `public/data/cvData.json`

## Method 3: Browser Storage (Temporary)

Changes are automatically saved to browser localStorage. This is temporary and only visible in your current browser.

## Notes:

- The app fetches fresh data from `/public/data/cvData.json` on each page load
- To ensure changes persist, use Method 1 (server) or Method 2 (download)
- Browser storage (localStorage) is used as a fallback when the server is not running
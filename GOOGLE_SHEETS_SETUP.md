# Google Sheets Integration Setup Guide

This guide will help you set up automatic logging of waitlist submissions to Google Sheets.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it "ShopifyPromoHub Waitlist" and click "Create"

## Step 2: Enable Google Sheets API

1. In your project, go to "APIs & Services" → "Enable APIs and Services"
2. Search for "Google Sheets API"
3. Click on it and click "Enable"

## Step 3: Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Name: `shopifypromo-sheets`
4. Click "Create and Continue"
5. Skip optional steps and click "Done"

## Step 4: Create Service Account Key

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" → "Create New Key"
4. Choose "JSON" format
5. Click "Create" - a JSON file will download

## Step 5: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "ShopifyPromoHub Waitlist"
4. Add headers in the first row:
   - A1: `Timestamp`
   - B1: `Email`
   - C1: `Source Page`

## Step 6: Share Sheet with Service Account

1. Open the JSON key file you downloaded
2. Copy the `client_email` value (looks like: `shopifypromo-sheets@your-project.iam.gserviceaccount.com`)
3. In your Google Sheet, click "Share"
4. Paste the service account email
5. Give it "Editor" permissions
6. Click "Send"

## Step 7: Get Your Sheet ID

1. Look at your Google Sheet URL: 
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
2. Copy the SHEET_ID portion

## Step 8: Add Environment Variables to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add these two variables:

### GOOGLE_SHEET_ID
- Value: Paste your Sheet ID from Step 7

### GOOGLE_SHEETS_CREDENTIALS
- Value: Open the JSON key file and copy **THE ENTIRE CONTENTS** (it should be a single line of JSON)
- The JSON should look like:
  ```json
  {"type":"service_account","project_id":"your-project",...}
  ```

5. Make sure both variables are set for **Production**, **Preview**, and **Development**
6. Click "Save"

## Step 9: Redeploy Your Application

After adding the environment variables, you need to redeploy:

```bash
vercel --prod
```

## Testing

1. Visit your website
2. Submit a test email to the waitlist
3. Check your Google Sheet - a new row should appear with:
   - Timestamp
   - Email address
   - Source page

## Troubleshooting

### "Permission denied" error
- Make sure you shared the Google Sheet with the service account email
- Check that the service account has "Editor" permissions

### "Credentials not found" error
- Verify the GOOGLE_SHEETS_CREDENTIALS environment variable contains the full JSON
- Make sure there are no extra spaces or line breaks

### Sheet not updating
- Check Vercel function logs for errors
- Verify the GOOGLE_SHEET_ID is correct
- Make sure the sheet name in the code matches your sheet (default is "Sheet1")

### Wrong sheet range
- If you renamed "Sheet1", update the code in `api/join.js`:
  ```javascript
  range: 'YourSheetName!A:C',
  ```

## Notes

- The integration is designed to be non-blocking - if Google Sheets fails, the waitlist signup will still work
- All errors are logged but won't prevent the user from signing up
- The sheet will append new rows automatically

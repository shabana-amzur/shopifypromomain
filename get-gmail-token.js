const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

function getAccessToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      fs.writeFileSync('gmail-token.json', JSON.stringify(token));
      console.log('Token stored to gmail-token.json');
    });
  });
}

getAccessToken();
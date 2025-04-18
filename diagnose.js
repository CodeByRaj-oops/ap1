const http = require('http');

console.log('Running API connectivity test...');

// Test the health endpoint
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/health',
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('RESPONSE:', data);
    console.log('\nAPI server is running correctly!');
    
    // Now test the books endpoint
    console.log('\nTesting books endpoint...');
    testBooksEndpoint();
  });
});

req.on('error', (e) => {
  console.error('\n❌ SERVER CONNECTION ERROR:');
  console.error(`Could not connect to API server at http://localhost:5000`);
  console.error('Please make sure:');
  console.error('1. The server is running (cd server && npm run dev)');
  console.error('2. The server is running on port 5000');
  console.error('3. There are no firewall issues blocking the connection');
  console.error('\nError details:', e.message);
});

req.end();

function testBooksEndpoint() {
  const bookOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/books',
    method: 'GET',
  };

  const bookReq = http.request(bookOptions, (res) => {
    console.log(`BOOKS STATUS: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const books = JSON.parse(data);
        console.log(`Successfully fetched ${books.length} books`);
        console.log('\n✅ API CONNECTION TEST PASSED!');
      } catch (e) {
        console.error('Error parsing books response:', e.message);
      }
    });
  });

  bookReq.on('error', (e) => {
    console.error('\n❌ BOOKS ENDPOINT ERROR:');
    console.error(`Could not connect to books endpoint`);
    console.error('Error details:', e.message);
  });

  bookReq.end();
} 
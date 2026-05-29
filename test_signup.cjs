const http = require('http');

const data = JSON.stringify({
  email: 'test' + Date.now() + '@circuitron.io',
  full_name: 'Test Circuitron',
});

const req = http.request({
  hostname: 'localhost',
  port: 8000,
  path: '/api/method/frappe.core.api.signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', body));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();

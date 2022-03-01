const app = require('express')();
const port = process.env.PORT || 3000;

app.get('/*', (req, res) => {
  console.log('Serving request');
  console.log('Client IP: ', req.ip);
  console.log('Headers:', req.headers);

  res.send(`Served by ${port}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


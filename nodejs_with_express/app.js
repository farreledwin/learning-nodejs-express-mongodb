const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Accessing Root URL and testing sending response JSON', app: 'natours' });
});

app.listen(3000, () => {
	console.log('Farjun API Server Online With Port 3000!!!');
});

const http = require('http');
const fs = require('fs');
const url = require('url');

//server
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const overviewPage = fs.readFileSync(`${__dirname}/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template-card.html`, 'utf-8');
const productPage = fs.readFileSync(`${__dirname}/product.html`, 'utf-8');

const replaceTemplate = (temp, product) => {
	let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%FROM%}/g, product.from);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);
	output = output.replace(/{%ID%}/g, product.id);

	if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

	return output;
};

const server = http.createServer((req, res) => {
	const pathName = req.url;
	if (pathName === '/' || pathName === '/overview') {
		res.writeHead(200, {
			'Content-type': 'text/html'
		});
		const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
		const result = overviewPage.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
		res.end(result);
	} else if (pathName === '/product') {
		res.end('this is product page!');
	} else if (pathName === '/api') {
		res.writeHead(200, {
			'Content-type': 'application/json'
		});
		res.end(data);
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html'
		});
		res.end('<h2> NOT FOUND WITH HTML CODE </h2>');
	}
	// res.end('Hello this is from farjun server');
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Server is up bro!');
});

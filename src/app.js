import express from 'express';
import server from './server.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () =>
	console.log(
		`Running ${process.env.NODE_ENV?.toUpperCase()} environment on http://localhost:${PORT}`
	)
);

app.post('/object', server.postObject);
app.get('/object/:key', server.getObject);

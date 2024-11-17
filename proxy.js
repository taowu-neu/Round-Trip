import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // 引入cors中间件

const app = express();
const port = 3000;

// 启用CORS，允许来自所有来源的跨域请求
app.use(cors());

app.use(express.json());

app.get('/elevation', async (req, res) => {
    const { path, samples, key } = req.query;

    const url = `https://maps.googleapis.com/maps/api/elevation/json?path=${path}&samples=${samples}&key=${key}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching elevation data:', error);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});

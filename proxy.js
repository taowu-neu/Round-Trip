import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // 引入cors中间件

const app = express();
const port = 3000;

// 启用CORS，允许来自所有来源的跨域请求
app.use(cors());

app.use(express.json());

// 你的有效 Google API 密钥
const GOOGLE_API_KEY = 'AIzaSyDBpCjhtC6Ne9GqU84l4qLcMs4O_gzDwyM';

app.get('/elevation', async (req, res) => {
    const { path, samples } = req.query;

    if (!GOOGLE_API_KEY) {
        return res.status(500).json({ error: 'Google API Key is missing or invalid' });
    }

    const url = `https://maps.googleapis.com/maps/api/elevation/json?path=${path}&samples=${samples}&key=${GOOGLE_API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
            console.error('Error fetching elevation data:', data);
            return res.status(500).json({ error: 'Error fetching elevation data', details: data });
        }

        res.json(data);
    } catch (error) {
        console.error('Error fetching elevation data:', error);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});

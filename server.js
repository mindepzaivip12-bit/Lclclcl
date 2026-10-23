const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Cho phép gọi API từ mọi nguồn
app.use(cors());

// Phục vụ file giao diện tĩnh (index.html)
app.use(express.static(path.join(__dirname)));

// Tạo API trung gian (Proxy) để tránh lỗi CORS
app.get('/api/predict', async (req, res) => {
    try {
        const targetUrl = 'https://wtxmd52.tele68.com/v1/txmd5/lite-sessions?cp=R&cl=R&pf=web&at=ab36a88e2c9868ae0e8bc61adbd18dc';
        
        // Gọi API gốc từ phía Server
        const response = await axios.get(targetUrl, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // Giả lập trình duyệt
            }
        });

        // Trả dữ liệu về cho phía Frontend
        res.json(response.data);
    } catch (error) {
        console.error('Lỗi khi gọi API gốc:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Không thể lấy dữ liệu từ API gốc',
            details: error.message
        });
    }
});

// Khởi chạy server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

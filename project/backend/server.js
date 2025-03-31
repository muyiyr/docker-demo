const http = require('http');
const { Pool } = require('pg');

// 创建数据库连接池
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'database',
    database: process.env.DB_NAME || 'mydb',
    password: process.env.DB_PASSWORD || 'example',
    port: 5432
});

// 请求解析工具
const parseBody = (req) =>
    new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => (body += chunk.toString()));
        req.on('end', () => resolve(body));
        req.on('error', err => reject(err));
    });

// 创建 HTTP 服务器
// 新增路由处理
const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/test') {
        try {
            const body = await parseBody(req);
            const { name, description } = JSON.parse(body);

            const result = await pool.query(
                'INSERT INTO test (name, description) VALUES ($1, $2) RETURNING *',
                [name, description]
            );

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: "Data added successfully",
                data: result.rows[0]
            }));
        } catch (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: err.message }));
        }
    } else if (req.method === 'GET' && req.url === '/test') {
        try {
            const result = await pool.query('SELECT * FROM test');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.rows));
        } catch (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: err.message }));
        }
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// 启动服务器
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
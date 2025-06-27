const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MySQL
const db = mysql.createConnection({
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'OycGPAZERmnYtgfzkDYgrVfoPjPsMOBm',       // điền mật khẩu nếu có
  database: 'railway'
});

db.connect((err) => {
  if (err) {
    console.error('Kết nối thất bại:', err);
  } else {
    console.log('Đã kết nối MySQL');
  }
});

// API lấy tất cả liên hệ
app.get('/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// API thêm liên hệ mới
app.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Thiếu thông tin' });
  }
  db.query(
    'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, name, email, phone });
    }
  );
});

// API xoá liên hệ theo id
app.delete('/contacts/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM contacts WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.listen(5000, () => {
  console.log('Server chạy ở cổng 5000');
});

import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');

  // Hàm gọi API lấy danh bạ
  const fetchContacts = async () => {
    const res = await fetch('https://contact-react-app.onrender.com/contacts');
    const data = await res.json();
    setContacts(data);
  };

  // Gọi 1 lần duy nhất khi vào trang
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>📒 Danh bạ liên hệ</h1>
      <input
        type="text"
        placeholder="🔍 Tìm theo tên..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 20 }}
      />
      <ContactForm onAddSuccess={fetchContacts} />
      <ContactList
        contacts={contacts}
        search={search}
        onDeleteSuccess={fetchContacts}
      />
    </div>
  );
};

export default App;

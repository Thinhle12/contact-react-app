import React, { useState } from 'react';

const ContactForm = ({ onAddSuccess }) => {
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact),
    });
    setNewContact({ name: '', email: '', phone: '' });
    onAddSuccess(); // Reload lại danh bạ ở App.jsx
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        name="name"
        value={newContact.name}
        onChange={handleChange}
        placeholder="Tên"
        required
        style={{ padding: 10, marginRight: 10, width: 'calc(33% - 10px)' }}
      />
      <input
        type="email"
        name="email"
        value={newContact.email}
        onChange={handleChange}
        placeholder="Email"
        required
        style={{ padding: 10, marginRight: 10, width: 'calc(33% - 10px)' }}
      />
      <input
        type="text"
        name="phone"
        value={newContact.phone}
        onChange={handleChange}
        placeholder="Số điện thoại"
        required
        style={{ padding: 10, width: 'calc(33% - 10px)' }}
      />
      <button type="submit" style={{ padding: '10px 20px', marginLeft: 10, backgroundColor: '#4CAF50', color: 'white' }}>
        Thêm liên hệ
      </button>
    </form>
  );
};

export default ContactForm;

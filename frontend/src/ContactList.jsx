import React from 'react';

const ContactList = ({ contacts, search, onDeleteSuccess }) => {
  // Lọc theo từ khoá tìm kiếm
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xoá liên hệ này?')) {
      await fetch(`http://localhost:5000/contacts/${id}`, { method: 'DELETE' });
      onDeleteSuccess(); // Reload lại danh bạ
    }
  };

  return (
    <table border="1" width="100%" cellPadding="10">
      <thead>
        <tr>
          <th>Tên</th>
          <th>Email</th>
          <th>SĐT</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map(contact => (
          <tr key={contact.id}>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
            <td>
              <button onClick={() => handleDelete(contact.id)}>
                Xoá
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactList;

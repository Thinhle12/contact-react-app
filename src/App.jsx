import { useState } from 'react';

const App = () => {
  const [contacts, setContacts] = useState([
    { name: "An", email: "an@gmail.com", phone: "0901234567" },
    { name: "Bình", email: "binh@yahoo.com", phone: "0987654321" }
  ]);

  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (index) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📒 Danh bạ liên hệ</h1>

      <input
        type="text"
        placeholder="🔍 Tìm theo tên..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
      />

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
          {filteredContacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

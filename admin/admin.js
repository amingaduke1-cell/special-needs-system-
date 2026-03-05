

const API_URL = "https://special-needs-backend.onrender.com";

async function loadContacts() {

  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  try {

    const res = await fetch(`${API_URL}/api/contact`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!data.success) {
      alert('Session expired. Please login again.');
      localStorage.removeItem('token');
      window.location.href = 'login.html';
      return;
    }

    const table = document.getElementById('contactTable');
    table.innerHTML = '';

    data.data.forEach(contact => {

      const contactId = contact.id || contact._id;

      table.innerHTML += `
        <tr>
          <td>${contact.name}</td>
          <td>${contact.email}</td>
          <td>${contact.supportType}</td>
          <td>${contact.message}</td>
          <td>${new Date(contact.createdAt).toLocaleString()}</td>
          <td>
            <button onclick="deleteContact('${contactId}')">
              Delete
            </button>
          </td>
        </tr>
      `;

    });

  } catch (error) {

    console.error(error);
    alert('Failed to load contacts');

  }

}

async function deleteContact(id) {

  const token = localStorage.getItem('token');

  if (!token) return;

  if (!confirm('Delete this message?')) return;

  try {

    await fetch(`${API_URL}/api/contact/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    loadContacts();

  } catch (error) {

    console.error(error);
    alert('Delete failed');

  }

}

function logout() {

  localStorage.removeItem('token');
  window.location.href = 'login.html';

}

loadContacts();
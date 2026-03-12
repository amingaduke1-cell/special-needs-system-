const API_URL = "https://special-needs-backend.onrender.com/api/contact";

// Get token from localStorage
const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

const contactTable = document.getElementById("contactTable");
const messageCount = document.getElementById("messageCount");

// Load all messages
async function loadContacts() {
    try {
        const res = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();

        if (!data.success) {
            alert("Failed to fetch messages ❌");
            return;
        }

        contactTable.innerHTML = "";
        messageCount.innerText = data.data.length;

        data.data.forEach(contact => {
            const id = contact.id;

            contactTable.innerHTML += `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.supportType || "-"}</td>
                <td>${contact.message}</td>
                <td>${new Date(contact.createdAt).toLocaleString()}</td>
                <td>
                    <button class="delete-btn" onclick="deleteContact(${id})">Delete</button>
                </td>
            </tr>
            `;
        });

    } catch (err) {
        alert("Server error ❌");
        console.error(err);
    }
}

// Delete a message
async function deleteContact(id) {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        if (data.success) {
            loadContacts();
        } else {
            alert("Failed to delete ❌");
        }
    } catch (err) {
        alert("Server error ❌");
        console.error(err);
    }
}

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// Initial load
loadContacts();
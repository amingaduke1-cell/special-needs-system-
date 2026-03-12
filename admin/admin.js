const API_URL = "https://special-needs-backend.onrender.com/api/contact";
const token = localStorage.getItem("token");

if(!token) window.location.href="login.html";

const contactTable = document.getElementById("contactTable");
const messageCount = document.getElementById("messageCount");

async function loadContacts(){
    try{
        const res = await fetch(API_URL, { headers:{ Authorization:`Bearer ${token}` } });
        const data = await res.json();

        contactTable.innerHTML="";
        messageCount.innerText = data.data.length;

        data.data.forEach(contact=>{
            const id = contact.id;
            contactTable.innerHTML += `
                <tr>
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.supportType || "-"}</td>
                    <td>${contact.message}</td>
                    <td>${new Date(contact.createdAt).toLocaleString()}</td>
                    <td><button class="delete-btn" onclick="deleteContact(${id})">Delete</button></td>
                </tr>
            `;
        });
    }catch(err){
        alert("Server error ❌");
        console.error(err);
    }
}

async function deleteContact(id){
    if(!confirm("Are you sure?")) return;

    try{
        const res = await fetch(`${API_URL}/${id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` } });
        const data = await res.json();
        if(data.success) loadContacts();
        else alert("Failed to delete ❌");
    }catch(err){
        alert("Server error ❌");
        console.error(err);
    }
}

function logout(){
    localStorage.removeItem("token");
    window.location.href="login.html";
}

loadContacts();
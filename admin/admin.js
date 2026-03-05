const API_URL = "https://special-needs-backend.onrender.com";

/* Load Messages */

async function loadContacts(){

    const token = localStorage.getItem("token");

    if(!token){
        window.location.href="login.html";
        return;
    }

    const res = await fetch(`${API_URL}/api/contact`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    const data = await res.json();

    const table = document.getElementById("contactTable");
    const counter = document.getElementById("messageCount");

    table.innerHTML="";

    counter.innerText = data.data.length;

    data.data.forEach(contact=>{

        const id = contact.id || contact._id;

        table.innerHTML += `
        <tr>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.supportType}</td>
            <td>${contact.message}</td>
            <td>${new Date(contact.createdAt).toLocaleString()}</td>
            <td>
                <button onclick="deleteContact('${id}')">
                Delete
                </button>
            </td>
        </tr>
        `;
    });
}

/* Delete Message */

async function deleteContact(id){

    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/api/contact/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    loadContacts();
}

/* Logout */

function logout(){
    localStorage.removeItem("token");
    window.location.href="login.html";
}

loadContacts();
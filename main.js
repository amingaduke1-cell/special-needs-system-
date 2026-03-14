const API_URL = "https://special-needs-backend.onrender.com";

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document.querySelector("input[placeholder='Your Name']").value;
        const email = document.querySelector("input[placeholder='Your Email']").value;
        const supportType = document.querySelector("select").value;
        const message = document.querySelector("textarea").value;

        try {

            const res = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    supportType,
                    message
                })
            });

            const data = await res.json();

            if (data.success) {
                alert("Message sent successfully ✅");
                contactForm.reset();
            } else {
                alert("Failed to send message ❌");
            }

        } catch (error) {
            console.error(error);
            alert("Server error ❌");
        }

    });
}
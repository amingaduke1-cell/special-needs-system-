/* ================================
   BACKEND URL
================================ */

const API_URL = "https://special-needs-backend.onrender.com";

/* ================================
   ELEMENTS
================================ */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");

/* ================================
   MOBILE MENU TOGGLE
================================ */

if (mobileMenu) {

    mobileMenu.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = mobileMenu.querySelector("i");

        if (navMenu.classList.contains("active")) {
            icon.className = "bx bx-x";
        } else {
            icon.className = "bx bx-menu";
        }

    });

}

/* ================================
   THEME TOGGLE
================================ */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const root = document.documentElement;
        const isDark = root.getAttribute("data-theme") === "dark";

        if (isDark) {

            root.setAttribute("data-theme", "light");
            themeIcon.className = "bx bx-moon";
            localStorage.setItem("theme", "light");

        } else {

            root.setAttribute("data-theme", "dark");
            themeIcon.className = "bx bx-sun";
            localStorage.setItem("theme", "dark");

        }

    });

}

/* ================================
   LOAD SAVED THEME
================================ */

window.addEventListener("DOMContentLoaded", () => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.documentElement.setAttribute("data-theme", "dark");

        if (themeIcon) {
            themeIcon.className = "bx bx-sun";
        }

    }

});

/* ================================
   CLOSE MOBILE MENU ON LINK CLICK
================================ */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = mobileMenu.querySelector("i");
        if (icon) icon.className = "bx bx-menu";

    });

});

/* ================================
   CONTACT FORM SUBMISSION
================================ */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault(); // ⭐ Prevent page reload

        const name = document.getElementById("name")?.value;
        const email = document.getElementById("email")?.value;
        const supportType = document.getElementById("supportType")?.value;
        const message = document.getElementById("message")?.value;

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
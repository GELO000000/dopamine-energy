const video = document.getElementById("myVideo");
const cartModal = document.getElementById("cartModal");
const socialsModal = document.getElementById("socialsModal");
const aboutModal = document.getElementById("aboutModal");
const accountModal = document.getElementById("accountModal");

// Modal Functions
function openCart() { cartModal.style.display = "block"; }
function closeCart() { cartModal.style.display = "none"; }
function openSocials() { socialsModal.style.display = "block"; }
function closeSocials() { socialsModal.style.display = "none"; }
function openAbout() { aboutModal.style.display = "block"; }
function closeAbout() { aboutModal.style.display = "none"; }
function openAccount() { accountModal.style.display = "block"; checkLoginStatus(); }
function closeAccount() { accountModal.style.display = "none"; }

// Cart Logic & Heart Attack Risk
function updateQty(v) {
    let q = document.getElementById("qtyValue");
    let price = document.getElementById("totalPrice");
    let heart = document.getElementById("heartChance");
    
    let current = parseInt(q.innerText) + v;
    if (current < 1) current = 1;
    
    q.innerText = current;
    price.innerText = (current * 3.90).toFixed(2);
    heart.innerText = current + "%";

    // Change Risk Color
    heart.className = ""; 
    if (current <= 20) heart.classList.add("risk-white");
    else if (current <= 50) heart.classList.add("risk-yellow");
    else if (current <= 80) heart.classList.add("risk-orange");
    else heart.classList.add("risk-red");
}

// Account / Auth System
let isLoginMode = true;
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById("authTitle").innerText = isLoginMode ? "LOGIN" : "REGISTER";
    document.getElementById("toggleBtn").innerText = isLoginMode ? "REGISTER" : "LOGIN";
}

function handleAuth() {
    const email = document.getElementById("authEmail").value.trim().toLowerCase();
    const pass = document.getElementById("authPassword").value;
    const err = document.getElementById("authError");

    if (!email.includes("@gmail.com")) { err.innerText = "USE GMAIL!"; return; }
    if (pass.length < 4) { err.innerText = "SHORT PASSWORD!"; return; }

    if (isLoginMode) {
        if (localStorage.getItem("u_" + email) === pass) { login(email); } 
        else { err.innerText = localStorage.getItem("u_" + email) ? "WRONG PASSWORD!" : "NOT FOUND!"; }
    } else {
        localStorage.setItem("u_" + email, pass);
        login(email);
    }
}

function login(email) { localStorage.setItem("session", email); checkLoginStatus(); }
function logout() { localStorage.removeItem("session"); checkLoginStatus(); }

function checkLoginStatus() {
    const session = localStorage.getItem("session");
    document.getElementById("authContainer").style.display = session ? "none" : "block";
    document.getElementById("profileContainer").style.display = session ? "block" : "none";
    if (session) document.getElementById("userDisplay").innerText = session;
}

// Video Controls
function toggleMute() { video.muted = !video.muted; document.getElementById("muteBtn").innerText = video.muted ? "UNMUTE" : "MUTE"; }
function playPause() { video.paused ? video.play() : video.pause(); }
function restart() { video.currentTime = 0; video.play(); }

window.onclick = (e) => {
    if (e.target == cartModal) closeCart();
    if (e.target == socialsModal) closeSocials();
    if (e.target == aboutModal) closeAbout();
    if (e.target == accountModal) closeAccount();
}
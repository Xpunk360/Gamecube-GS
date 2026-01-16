const audio = document.getElementById("gc-audio");
const intro = document.getElementById("intro");
const memorySelect = document.getElementById("memory-select");
const gamesScreen = document.getElementById("games-screen");
const storageText = document.getElementById("storage-text");
const gamesList = document.getElementById("games-list");
const sendBtn = document.getElementById("send-btn");
const confirmModal = document.getElementById("confirm-modal");

let totalSpace = 0;
let remainingSpace = 0;
let selectedGames = [];

// ===== JUEGOS =====
const games = [
    { name: "Mario Sunshine", size: 1.35, region: "USA", image: "mario_sunshine.jpg" },
    { name: "Zelda Wind Waker", size: 1.42, region: "USA", image: "zelda_windwaker.jpg" },
    { name: "Metroid Prime", size: 1.55, region: "USA", image: "metroid_prime.jpg" },
    { name: "Super Smash Bros. Melee", size: 1.55, region: "USA", image: "smash_melee.jpg" }
];

// ===== INTRO =====
intro.addEventListener("click", () => {
    audio.currentTime = 0;
    audio.play();
});

audio.onended = () => {
    intro.classList.add("hidden");
    memorySelect.classList.remove("hidden");
};

// ===== SELECCIÓN DE MEMORIA =====
function selectMemory(size) {
    totalSpace = size;
    remainingSpace = size;

    memorySelect.classList.add("hidden");
    gamesScreen.classList.remove("hidden");

    updateStorage();
    renderGames();
}

// ===== ACTUALIZAR ESPACIO =====
function updateStorage() {
    storageText.textContent = `Espacio disponible: ${remainingSpace.toFixed(2)} GB`;
}

// ===== RENDER JUEGOS =====
function renderGames() {
    gamesList.innerHTML = "";

    games.forEach((game, index) => {
        const isSelected = selectedGames.includes(game);

        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
            <img src="assets/images/${game.image}">
            <h4>${game.name}</h4>
            <p>${game.region} - ${game.size} GB</p>
            <button onclick="toggleGame(${index})">
                ${isSelected ? "Quitar" : "Agregar"}
            </button>
        `;

        gamesList.appendChild(card);
    });
}

// ===== AGREGAR / QUITAR =====
function toggleGame(index) {
    const game = games[index];

    if (selectedGames.includes(game)) {
        selectedGames = selectedGames.filter(g => g !== game);
        remainingSpace += game.size;
    } else {
        if (remainingSpace < game.size) {
            alert("No hay suficiente espacio");
            return;
        }
        selectedGames.push(game);
        remainingSpace -= game.size;
    }

    updateStorage();
    renderGames();
}

// ===== MODAL CONFIRMACIÓN =====
function openConfirm() {
    if (selectedGames.length === 0) {
        alert("No has seleccionado juegos");
        return;
    }
    confirmModal.classList.remove("hidden");
}

function confirmNo() {
    confirmModal.classList.add("hidden");
}

function confirmYes() {
    confirmModal.classList.add("hidden");
    sendWhatsApp();
}

// ===== TXT =====
function generateTXT() {
    let text = `Micro SD: ${totalSpace}GB\n\nJuegos:\n`;

    selectedGames.forEach(g => {
        text += `- ${g.name} (${g.region}) - ${g.size}GB\n`;
    });

    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "lista_juegos.txt";
    link.click();
}

// ===== WHATSAPP =====
function sendWhatsApp() {
    let message = `🎮 Lista GameCube\n\n`;
    message += `Micro SD: ${totalSpace}GB\n`;
    message += `Espacio usado: ${(totalSpace - remainingSpace).toFixed(2)}GB\n\n`;
    message += `Juegos:\n`;

    selectedGames.forEach(g => {
        message += `• ${g.name} (${g.region}) - ${g.size}GB\n`;
    });

    const phone = "528682583401"; // ← TU NÚMERO
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

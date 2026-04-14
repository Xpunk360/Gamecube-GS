const PAGE_PASSWORD = "gamecube360";
let pendingMemory = null;

const audio = document.getElementById("gc-audio");
const intro = document.getElementById("intro");
const memorySelect = document.getElementById("memory-select");
const gamesScreen = document.getElementById("games-screen");
const storageText = document.getElementById("storage-text");
const gamesList = document.getElementById("games-list");
const confirmModal = document.getElementById("confirm-modal");

let totalSpace = 0;
let remainingSpace = 0;
let selectedGames = [];

// ===== JUEGOS =====
const games = [
{ name: "Mario Sunshine", size: 1.35, region: "USA", image: "mario_sunshine.jpg" },
    { name: "Zelda Wind Waker", size: 1.42, region: "USA", image: "zelda_windwaker.jpg" },
    { name: "Metroid Prime", size: 1.29, region: "USA", image: "metroid_prime.jpg" },
    { name: "Animal Crossing", size: .263, region: "USA", image: "g5.jpg" },
    { name: "Luigi's Mansion", size: .187, region: "USA", image: "g6.jpg" },
    { name: "The Legend of Zelda The Four Swords Adventure", size: .255, region: "USA", image: "g7.jpg" },
    { name: "Capcom vs SNK 2 EO", size: .282, region: "USA", image: "g8.jpg" },
    { name: "Mario Party 4", size: .571, region: "USA", image: "g9.jpg" },
    { name: "Mario Party 5", size: .952, region: "USA", image: "g10.jpg" },
    { name: "Mario Party 6", size: .752, region: "USA", image: "g11.jpg" },
    { name: "Mario Party 7", size: .571, region: "USA", image: "g12.jpg" },
    { name: "Super Mario Strickers", size: .619, region: "USA", image: "g13.jpg" },
    { name: "Pokemon Colosseum", size: .631, region: "USA", image: "g14.jpg" },
    { name: "Kirby Air Ride", size: .660, region: "USA", image: "g15.jpg" },
    { name: "Mega Man X Collection", size: .795, region: "USA", image: "g16.jpg" },
    { name: "Resident Evil disc 1 & 2", size: 2.49, region: "USA", image: "g17.jpg" },
    { name: "Resident Evil 2", size: 1.20, region: "USA", image: "g18.jpg" },
    { name: "Resident Evil 3", size: .866, region: "USA", image: "g19.jpg" },
    { name: "Resident Evil 4 disc 1 & 2", size: 2.60, region: "USA", image: "g20.jpg" },
    { name: "Simpson, Hit & Run", size: .868, region: "USA", image: "g21.jpg"},
    { name: "The Legend of Zelda Twilight Princess", size: 1.01, region: "USA", image: "g22.jpg" },
    { name: "Pokemon XD", size: 1.05, region: "USA", image: "g23.jpg" },
    { name: "Need for Speed Underground", size: 1.06, region: "USA", image: "g24.jpg" },
    { name: "The Legend of Zelda Ocarina of Time Master Quest", size: 1.08, region: "USA", image: "g25.jpg" },
    { name: "Dragon Ball Z Budokai 2", size: 1.13, region: "USA", image: "g26.jpg" },
    { name: "Def Jam Vendetta", size: 1.21, region: "USA", image: "g27.jpg" },
    { name: "The Legend of Zelda Collectors Edition", size: 1.24, region: "USA", image: "g28.jpg" },
    { name: "FIFA Street 2", size: 1.25, region: "USA", image: "g29.jpg" },
    { name: "Fire Emblem Path of Radiance", size: 1.25, region: "USA", image: "g30.jpg" },
    { name: "Def Jam Fight of New York", size: 1.26, region: "USA", image: "g31.jpg" },
    { name: "Dragon Ball Z Budokai", size: 1.27, region: "USA", image: "g32.jpg" },
    { name: "Need for Speed Underground 2", size: 1.29, region: "USA", image: "g33.jpg" },
    { name: "Need for Speed Most Wanted", size: 1.26, region: "USA", image: "g34.jpg" },
    { name: "Tony Hawk's Pro Skater 4", size: 1.26, region: "USA", image: "g35.jpg" },
    { name: "007 Nightfire", size: 1.29, region: "USA", image: "g37.jpg" },
    { name: "Mortal Kombat Deception", size: 1.29, region: "USA", image: "g36.jpg" },
    { name: "Spiderman 2", size: 1.30, region: "USA", image: "g38.jpg" },
    { name: "Mega Man Anniversary Collection", size: 1.34, region: "USA", image: "g39.jpg" },
    { name: "Crash Nitro Kart", size: 1.35, region: "USA", image: "g40.jpg" },
    { name: "Need for Speed Carbon", size: 1.36, region: "USA", image: "g41.jpg" },
    { name: "Metroid Prime 2 Echoes", size: 1.36, region: "USA", image: "g42.jpg" },
    { name: "True Crime Street of L.A.", size: 1.36, region: "USA", image: "g43.jpg" },
    { name: "Call of Duty Finest Hour", size: 1.37, region: "USA", image: "g44.jpg" },
    { name: "Simpson, Hit & Run", size: 1.37, region: "USA", image: "g45.jpg" },
    { name: "F-Zero GX", size: 1.37, region: "USA", image: "g46.jpg" },
    { name: "FIFA 07", size: 1.37, region: "USA", image: "g47.jpg" },
    { name: "The Legend of Zelda Wind Waker", size: 1.37, region: "USA", image: "g48.jpg" },
    { name: "Mario Kart Double Dash", size: 1.37, region: "USA", image: "g49.jpg" },
    { name: "Sonic Adventure 2 Battle", size: 1.37, region: "USA", image: "g50.jpg" },
    { name: "Spiderman", size: 1.37, region: "USA", image: "g51.jpg" },
    { name: "Star Fox Adventure", size: 1.37, region: "USA", image: "g52.jpg" },
    { name: "Star Fox Assault", size: 1.37, region: "USA", image: "g53.jpg" },
    { name: "Bomberman Generation", size: 1.35, region: "USA", image: "g54.jpg" },
    { name: "Custom Robo", size: 1.35, region: "USA", image: "g55.jpg" },
    { name: "Digimon Rumble Area 2", size: 1.35, region: "USA", image: "g56.jpg" },
    { name: "Digimon World 4", size: 1.35, region: "USA", image: "g57.jpg" },
    { name: "Metal Gear Solid The Twin Snakes solo disco 1", size: 1.35, region: "USA", image: "g58.jpg" },
    { name: "Beyond Good and Evil", size: 1.35, region: "USA", image: "g59.jpg" },
    { name: "Bloody Roar Primal Fury", size: 1.35, region: "USA", image: "g60.jpg" },
    { name: "Disney PK Out of the Shadows", size: 1.35, region: "USA", image: "g61.jpg" },
    { name: "Eternal Darkness Sanity's Requiem", size: 1.35, region: "USA", image: "g62.jpg" },
    { name: "Phantasy Star Online Episode l & Plus", size: 1.35, region: "USA", image: "g63.jpg" },
    { name: "Phantasy Star Online Episode lll", size: 1.35, region: "USA", image: "g64.jpg" },
    { name: "Gameboy Player Start-up", size: 0.233, region: "USA", image: "g67.jpg" },
    { name: "Super Smash Bros Melee AKANEIA", size: 1.35, region: "USA", image: "g66.jpg" },
    { name: "Super Smash Bros Melee", size: 1.35, region: "USA", image: "g65.jpg" }
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

// ===== CLICK MEMORIA (ABRE PASSWORD) =====
function selectMemory(size) {
    pendingMemory = size;
    document.getElementById("password-modal").classList.remove("hidden");
}

// ===== PASSWORD =====
function checkPassword() {
    const input = document.getElementById("password-input").value;
    const error = document.getElementById("password-error");

    if (input === PAGE_PASSWORD) {
        error.style.display = "none";
        document.getElementById("password-modal").classList.add("hidden");
        document.getElementById("password-input").value = "";
        startGames(pendingMemory);
    } else {
        error.style.display = "block";
    }
}

function closePasswordModal() {
    document.getElementById("password-modal").classList.add("hidden");
    document.getElementById("password-input").value = "";
}

// ===== ENTRAR A JUEGOS =====
function startGames(size) {
    totalSpace = size;
    remainingSpace = size;

    memorySelect.classList.add("hidden");
    gamesScreen.classList.remove("hidden");

    updateStorage();
    renderGames();
}

// ===== ESPACIO =====
function updateStorage() {
    storageText.textContent = `Espacio disponible: ${remainingSpace.toFixed(2)} GB`;
    updateStorageBar();
}

function updateStorageBar() {
    const used = totalSpace - remainingSpace;
    const percent = (used / totalSpace) * 100;
    const bar = document.getElementById("storage-fill");
    if (bar) bar.style.width = percent + "%";
}

// ===== RENDER JUEGOS =====
function renderGames() {
    gamesList.innerHTML = "";

    games.forEach((game, index) => {
        const selected = selectedGames.includes(game);

        const card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
            <img src="assets/images/${game.image}">
            <h4>${game.name}</h4>
            <p>${game.region} - ${game.size} GB</p>
            <button onclick="toggleGame(${index})">
                ${selected ? "Quitar" : "Agregar"}
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

// ===== CONFIRMACIÓN =====
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

// ===== WHATSAPP =====
function sendWhatsApp() {
    let message = `🎮 Lista GameCube\n\nMicro SD: ${totalSpace}GB\n\n`;

    selectedGames.forEach(g => {
        message += `• ${g.name} (${g.region}) - ${g.size}GB\n`;
    });

    const phone = "528682583401";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}

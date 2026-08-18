const i18n = {
  en: {
    subtitle: "Consuming RESTful API from Express backend",
    navLobby: "Main Lobby",
    navWorlds: "Worlds",
    navCharacters: "Characters",
    navEnemies: "Enemies",
    searchPlaceholder: "🔍 Search world or origin...",
    lblLanguage: "Language:",
    available: "Available",
    comingSoon: "Coming Soon",
    lobbyWorldsDesc: "Explore all the Disney and Original worlds across Kingdom Hearts games.",
    lobbyCharDesc: "Keyblade wielders, Organization XIII, Disney allies and Final Fantasy heroes.",
    lobbyEnemiesDesc: "Database of Heartless, Unversed, Nobodies and Dream Eaters.",
    loadingWorlds: "Loading worlds from API...",
    loadingDetail: "Loading world details...",
    noResultsTitle: "🔍 No worlds found",
    noResultsDesc: 'No world matched your search criteria: ',
    backToList: "← Back to Worlds List",
    backToLobby: "← Return to Main Lobby",
    originLabel: "ORIGIN / UNIVERSE",
    fieldTheme: "FIELD THEME",
    battleTheme: "BATTLE THEME",
    gameAppearances: "Game Appearances",
    worldTypeSuffix: "World",
    wipTitle: "Section Under Construction",
    wipDesc: "We are currently gathering data across Kingdom Hearts I, II, and III. Check back soon!",
    apiError: "Error connecting to API. Make sure your Node.js server is running!"
  },
  es: {
    subtitle: "Consumiendo API RESTful desde servidor Express",
    navLobby: "Lobby Principal",
    navWorlds: "Mundos",
    navCharacters: "Personajes",
    navEnemies: "Enemigos",
    searchPlaceholder: "🔍 Buscar mundo u origen...",
    lblLanguage: "Idioma:",
    available: "Disponible",
    comingSoon: "Próximamente",
    lobbyWorldsDesc: "Explora todos los mundos de Disney y Originales a través de Kingdom Hearts.",
    lobbyCharDesc: "Portadores de la Llave Espada, Organización XIII, aliados Disney y héroes de Final Fantasy.",
    lobbyEnemiesDesc: "Base de datos de Sincorazón, Incorpóreos, Nescientes y Devoradores de Sueños.",
    loadingWorlds: "Cargando mundos desde la API...",
    loadingDetail: "Cargando detalles del mundo...",
    noResultsTitle: "🔍 No se encontraron mundos",
    noResultsDesc: 'Ningún mundo coincide con tu búsqueda: ',
    backToList: "← Volver a la Lista de Mundos",
    backToLobby: "← Volver al Lobby Principal",
    originLabel: "ORIGEN / UNIVERSO",
    fieldTheme: "TEMA DE CAMPO",
    battleTheme: "TEMA DE BATALLA",
    gameAppearances: "Apariciones en Juegos",
    worldTypeSuffix: "Mundo",
    wipTitle: "Sección en Construcción",
    wipDesc: "Actualmente estamos recopilando datos de Kingdom Hearts I, II y III. ¡Vuelve pronto!",
    apiError: "Error al conectar con la API. ¡Asegúrate de que el servidor Node.js está encendido!"
  },
  ja: {
    subtitle: "ExpressバックエンドからRESTful APIを消費",
    navLobby: "メインロビー",
    navWorlds: "ワールド",
    navCharacters: "キャラクター",
    navEnemies: "エネミー",
    searchPlaceholder: "🔍 ワールドや作品を検索...",
    lblLanguage: "言語:",
    available: "利用可能",
    comingSoon: "近日公開",
    lobbyWorldsDesc: "キングダム ハーツシリーズのディズニーとオリジナルワールドを探索。",
    lobbyCharDesc: "キーブレード使い、XIII機関、ディズニーの仲間、FFヒーローたち。",
    lobbyEnemiesDesc: "ハートレス、ノーバディ、アンバース、ドリームイーターのデータベース。",
    loadingWorlds: "APIからワールドを読み込み中...",
    loadingDetail: "ワールドの詳細を読み込み中...",
    noResultsTitle: "🔍 ワールドが見つかりません",
    noResultsDesc: '検索条件に一致するワールドがありません: ',
    backToList: "← ワールド一覧に戻る",
    backToLobby: "← メインロビーに戻る",
    originLabel: "出展 / 世界観",
    fieldTheme: "フィールド曲",
    battleTheme: "バトル曲",
    gameAppearances: "登場作品",
    worldTypeSuffix: "ワールド",
    wipTitle: "準備中",
    wipDesc: "現在、キングダム ハーツ I、II、III などの データを収集中です。お楽しみに！",
    apiError: "API接続エラー。Node.jsサーバーが起動しているか確認してください。"
  }
};

let currentView = 'lobby';
let currentWorldId = null;
let currentSectionWip = '';
let loadedWorlds = [];

function getLang() {
  return document.getElementById('langSelect').value || 'en';
}

function updateStaticUI() {
  const t = i18n[getLang()];
  document.getElementById('headerSubtitle').innerText = t.subtitle;
  document.getElementById('txtNavLobby').innerText = t.navLobby;
  document.getElementById('txtNavWorlds').innerText = t.navWorlds;
  document.getElementById('txtNavCharacters').innerText = t.navCharacters;
  document.getElementById('txtNavEnemies').innerText = t.navEnemies;
  document.getElementById('lblLanguage').innerText = t.lblLanguage;
  document.getElementById('searchInput').placeholder = t.searchPlaceholder;
}

function toggleSearchInput(show) {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.style.display = show ? 'block' : 'none';
    if (!show) searchInput.value = '';
  }
}

function setActiveNav(buttonId) {
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  if (buttonId) document.getElementById(buttonId)?.classList.add('active');
}

// VIEW 1: Main Lobby
function showLobby() {
  currentView = 'lobby';
  setActiveNav('btnHome');
  toggleSearchInput(false);
  updateStaticUI();
  const t = i18n[getLang()];
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="lobby-grid">
      <div class="lobby-card" onclick="loadWorldsView()">
        <span class="lobby-icon">🌍</span>
        <h2>${t.navWorlds}</h2>
        <p>${t.lobbyWorldsDesc}</p>
        <span class="status-badge status-active">${t.available} (13)</span>
      </div>

      <div class="lobby-card" onclick="showWip('Characters')">
        <span class="lobby-icon">👤</span>
        <h2>${t.navCharacters}</h2>
        <p>${t.lobbyCharDesc}</p>
        <span class="status-badge status-wip">${t.comingSoon}</span>
      </div>

      <div class="lobby-card" onclick="showWip('Enemies')">
        <span class="lobby-icon">👾</span>
        <h2>${t.navEnemies}</h2>
        <p>${t.lobbyEnemiesDesc}</p>
        <span class="status-badge status-wip">${t.comingSoon}</span>
      </div>
    </div>
  `;
}

// VIEW 2: Worlds Grid
async function loadWorldsView() {
  currentView = 'worlds';
  setActiveNav('btnWorlds');
  toggleSearchInput(true);
  updateStaticUI();
  
  const lang = getLang();
  const t = i18n[lang];
  const app = document.getElementById('app');
  
  app.innerHTML = `<p style="text-align:center; padding: 3rem;">${t.loadingWorlds}</p>`;

  try {
    const response = await fetch(`http://localhost:3000/api/v1/worlds?lang=${lang}`);
    loadedWorlds = await response.json();
    filterWorlds();
  } catch (err) {
    app.innerHTML = `<p style="color:#f85149; text-align:center;">${t.apiError}</p>`;
  }
}

// Filter real-time worlds
function filterWorlds() {
  if (currentView !== 'worlds') return;

  const t = i18n[getLang()];
  const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
  const filtered = loadedWorlds.filter(w => 
    w.name.toLowerCase().includes(searchTerm) || 
    w.origin.toLowerCase().includes(searchTerm)
  );

  const app = document.getElementById('app');

  if (filtered.length === 0) {
    app.innerHTML = `
      <div class="wip-screen" style="border: 1px dashed #30363d;">
        <h2>${t.noResultsTitle}</h2>
        <p>${t.noResultsDesc} "<strong>${searchTerm}</strong>"</p>
      </div>
    `;
    return;
  }

  let gridHtml = '<div class="grid">';
  filtered.forEach(w => {
    const badgeClass = w.type.toLowerCase() === 'disney' ? 'badge-disney' : 'badge-original';
    gridHtml += `
      <div class="card" onclick="loadWorldDetail('${w.id}')">
        <img class="card-img" src="${w.image_url}" alt="${w.name}" onerror="this.src='https://via.placeholder.com/300x160?text=No+Image'">
        <div class="card-content">
          <span class="badge ${badgeClass}">${w.type}</span>
          <h3>${w.name}</h3>
          <div style="font-size: 0.85rem; color: #8b949e;">${t.originLabel}: ${w.origin}</div>
        </div>
      </div>
    `;
  });
  gridHtml += '</div>';

  app.innerHTML = gridHtml;
}

// VIEW 3: World Detail Card
async function loadWorldDetail(id) {
  currentView = 'world-detail';
  currentWorldId = id;
  setActiveNav('btnWorlds');
  toggleSearchInput(false);
  updateStaticUI();

  const lang = getLang();
  const t = i18n[lang];
  const app = document.getElementById('app');

  app.innerHTML = `<p style="text-align:center; padding: 3rem;">${t.loadingDetail}</p>`;

  try {
    const response = await fetch(`http://localhost:3000/api/v1/worlds/${id}?lang=${lang}`);
    const world = await response.json();

    const badgeClass = world.type.toLowerCase() === 'disney' ? 'badge-disney' : 'badge-original';
    const gamesHtml = world.games.map(g => `<span class="game-tag">${g}</span>`).join('');

    app.innerHTML = `
      <button class="back-btn" onclick="loadWorldsView()">${t.backToList}</button>
      
      <div class="detail-container">
        <img class="detail-header-img" src="${world.image_url}" alt="${world.name}" onerror="this.src='https://via.placeholder.com/800x320?text=No+Image'">
        
        <div class="detail-body">
          <div class="detail-title-group">
            <div>
              <span class="badge ${badgeClass}">${world.type} ${t.worldTypeSuffix}</span>
              <h2>${world.name}</h2>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 0.8rem; color: #8b949e; display: block;">WORLD ID</span>
              <code style="color: #58a6ff; background: #0d1117; padding: 0.2rem 0.5rem; border-radius: 4px;">${world.id}</code>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-box">
              <span>${t.originLabel}</span>
              <strong>${world.origin}</strong>
            </div>
            <div class="info-box">
              <span>${t.fieldTheme}</span>
              <strong>🎶 ${world.field_theme}</strong>
            </div>
            <div class="info-box">
              <span>${t.battleTheme}</span>
              <strong>⚔️ ${world.battle_theme}</strong>
            </div>
          </div>

          <div class="detail-section">
            <h4>${t.gameAppearances}</h4>
            <div class="games-list">${gamesHtml}</div>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    app.innerHTML = `<p style="color:#f85149; text-align:center;">${t.apiError}</p>`;
  }
}

// VIEW 4: WIP Screen
function showWip(sectionName) {
  currentView = 'sectionName';
  currentSectionWip = sectionName;
  toggleSearchInput(false);
  updateStaticUI();

  if (sectionName === 'Characters') setActiveNav('btnCharacters');
  if (sectionName === 'Enemies') setActiveNav('btnEnemies');

  const t = i18n[getLang()];
  const translatedSection = sectionName === 'Characters' ? t.navCharacters : t.navEnemies;
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="wip-screen">
      <h2>🚧 ${translatedSection} - ${t.wipTitle}</h2>
      <p>${t.wipDesc}</p>
      <button class="back-btn" style="margin-bottom:0;" onclick="showLobby()">${t.backToLobby}</button>
    </div>
  `;
}

function handleLanguageChange() {
  updateStaticUI();
  if (currentView === 'lobby') showLobby();
  else if (currentView === 'worlds') loadWorldsView();
  else if (currentView === 'world-detail' && currentWorldId) loadWorldDetail(currentWorldId);
  else if (currentView === 'wip' && currentSectionWip) showWip(currentSectionWip);
}

// Inicializar la vista al cargar
showLobby();
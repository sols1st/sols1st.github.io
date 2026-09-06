const LIMIT = 30;

const PLAYLISTS = [
    { id: "327175538", name: "All" },
    { id: "806337469", name: "Chinese" },
    { id: "806320668", name: "English" },
    { id: "783077831", name: "Japanese" },
    { id: "17605356033", name: "2025" },
    { id: "13049027605", name: "2024" },
    { id: "7975016336", name: "2022" },
];


let PLAYLIST_ID = "327175538";
let currentPage = 0;
let hasNextPage = true;
let isLoading = false;

const API_BASE = "https://apis.netstart.cn/music/playlist/track/all";
const SONG_URL_API_BASE = "https://api.qijieya.cn/meting/";

const tableBody = document.getElementById("table-body");
const loadingMoreEl = document.getElementById("loading-more");
const noMoreEl = document.getElementById("no-more");
const mainAudio = document.getElementById("main-audio");
const playlistMenuEl = document.getElementById("playlist-menu");

let currentSongIndex = -1;
let currentlyPlayingLink = null;
let allPlaylists = PLAYLISTS;

async function loadUserPlaylists() {
    renderPlaylistMenu();
    playlistMenuEl.style.display = "flex";

    if (allPlaylists.length > 0) {
        const firstId = String(allPlaylists[0].id);
        const firstName = allPlaylists[0].name;
        PLAYLIST_ID = firstId; // 明确赋值
        loadNextPage(); // 直接加载，不通过 switchPlaylist 避免判断
    }
}

function renderPlaylistMenu() {
    playlistMenuEl.innerHTML = "";
    allPlaylists.forEach((pl) => {
        const a = document.createElement("a");
        a.href = "javascript:void(0)";
        a.textContent = pl.name;
        a.dataset.id = pl.id;
        if (String(pl.id) === PLAYLIST_ID) {
            a.classList.add("active");
        }
        a.addEventListener("click", () => switchPlaylist(pl.id, pl.name));
        playlistMenuEl.appendChild(a);
    });
}

function switchPlaylist(id, name) {
    if (String(id) === PLAYLIST_ID) return;

    // 更新当前歌单
    PLAYLIST_ID = String(id);
    // 清空表格和状态
    tableBody.innerHTML = "";
    currentPage = 0;
    hasNextPage = true;
    isLoading = false;
    currentSongIndex = -1;
    currentlyPlayingLink = null;
    mainAudio.src = "";
    mainAudio.load();

    // 重新加载第一页
    loadNextPage();

    // 更新菜单激活状态
    playlistMenuEl.querySelectorAll("a").forEach((a) => {
        a.classList.toggle("active", a.dataset.id === PLAYLIST_ID);
    });
}

// ========== 原有播放逻辑（保持不变，仅微调） ==========

async function playSongAtIndex(index) {
    const row = tableBody.children[index];
    if (!row) return false;

    const link = row.querySelector(".song-link");
    if (!link) return false;

    const id = link.getAttribute("data-id");
    if (!id) return false;

    if (!link.hasAttribute("data-original-name")) {
        link.setAttribute("data-original-name", link.textContent);
    }

    if (currentlyPlayingLink) {
        currentlyPlayingLink.style.color = "";
        currentlyPlayingLink.style.opacity = "";
    }

    link.textContent = "Loading...";
    link.style.color = "#888";
    link.style.opacity = "0.8";

    try {
        const url = await getMusicUrl(id, "standard");
        if (url) {
            mainAudio.src = url;
            await mainAudio.play();
            link.textContent = link.getAttribute("data-original-name");
            link.style.color = "#888";
            link.style.opacity = "1";
            currentlyPlayingLink = link;
            currentSongIndex = index;
            return true;
        } else {
            throw new Error("No valid URL");
        }
    } catch (err) {
        // alert("Failed to play this song");
        alert("feature is temporarily unavailable");
        console.warn("Failed to play song at index", index, err);
        link.textContent = link.getAttribute("data-original-name");
        link.style.color = "";
        link.style.opacity = "";
        currentlyPlayingLink = null;
        return false;
    }
}

async function tryPlayNextFrom(currentIndex) {
    const total = tableBody.children.length;
    let attempts = 0;
    let nextIndex = currentIndex + 1;

    while (attempts < total) {
        if (nextIndex >= total) {
            console.log("Reached end of playlist.");
            return;
        }

        const success = await playSongAtIndex(nextIndex);
        if (success) {
            return;
        }
        nextIndex++;
        attempts++;
    }
    console.log("No playable songs found after index", currentIndex);
}

// ========== 加载歌曲分页 ==========
async function loadNextPage() {
    if (isLoading || !hasNextPage) return;

    isLoading = true;
    loadingMoreEl.style.display = "block";
    noMoreEl.style.display = "none";

    currentPage += 1;
    const offset = (currentPage - 1) * LIMIT;
    const url = `${API_BASE}?id=${PLAYLIST_ID}&limit=${LIMIT}&offset=${offset}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network request failed");

        const data = await response.json();
        if (!data || !Array.isArray(data.songs)) {
            throw new Error("Invalid response format");
        }

        const songs = data.songs;
        hasNextPage = songs.length === LIMIT;

        if (songs.length > 0) {
            appendSongs(songs);
        }

        if (!hasNextPage) {
            loadingMoreEl.style.display = "none";
            noMoreEl.style.display = "block";
        }
    } catch (error) {
        console.error(error);
        loadingMoreEl.textContent = `Load failed: ${error.message}`;
        loadingMoreEl.style.color = "red";
    } finally {
        isLoading = false;
        if (hasNextPage) {
            loadingMoreEl.style.display = "none";
        }
    }
}

function appendSongs(songs) {
    songs.forEach((song) => {
        const name = song.name || "Unknown";
        const id = song.id || "";
        const artists =
            song.ar && Array.isArray(song.ar)
                ? song.ar.map((artist) => artist.name).join(" / ")
                : "Unknown";
        const album = song.al?.name || "Unknown";

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><a href="javascript:void(0)" class="song-link" data-id="${id}">${name}</a></td>
            <td>${artists}</td>
            <td>${album}</td>
        `;
        tableBody.appendChild(row);
    });
}

// ========== 事件监听 ==========
window.addEventListener("scroll", () => {
    if (!hasNextPage || isLoading) return;
    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
    ) {
        loadNextPage();
    }
});

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        document.querySelectorAll(".song-link").forEach((link) => {
            const original = link.getAttribute("data-original-name");
            if (original) {
                link.textContent = original;
                link.style.opacity = "";
                link.style.color = "";
            }
        });
    }
});

tableBody.addEventListener("click", async function (e) {
    if (e.target.classList.contains("song-link")) {
        e.preventDefault();
        const row = e.target.closest("tr");
        const index = Array.from(tableBody.children).indexOf(row);
        if (index === -1) return;

        await playSongAtIndex(index);
    }
});

mainAudio.addEventListener("ended", () => {
    tryPlayNextFrom(currentSongIndex);
});

// ========== 获取音乐 URL ==========
function getMusicUrl(id) {
    return `${SONG_URL_API_BASE}?type=url&id=${id}`;
}

loadUserPlaylists(); // 先加载菜单

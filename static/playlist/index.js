const PLAYLIST_ID = "327175538";
const LIMIT = 30;
let currentPage = 0;
let hasNextPage = true;
let isLoading = false;

const API_BASE = "https://apis.netstart.cn/music/playlist/track/all";
const SONG_URL_API_BASE = "https://wyapi.toubiec.cn/api/music/url";
const tableBody = document.getElementById("table-body");
const loadingMoreEl = document.getElementById("loading-more");
const noMoreEl = document.getElementById("no-more");
const mainAudio = document.getElementById("main-audio");

let currentSongIndex = -1;
let currentlyPlayingLink = null;

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
        alert("Failed to play this song");
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

loadNextPage();

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

async function getMusicUrlByWyapi(id, level = "standard") {
    try {
        const response = await fetch(SONG_URL_API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: String(id), level }),
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (data.code === 200 && data.data?.[0]?.url) {
            return data.data[0].url;
        } else {
            throw new Error(data.msg || "No URL returned");
        }
    } catch (error) {
        console.error("getMusicUrl error:", error);
        return null;
    }
}

async function getMusicUrlByNxvav(id) {
    const apiUrl = "https://api.nxvav.cn/api/music/?type=url&id=";
    try {
        const response = await fetch(apiUrl + id);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.url;
        return data;
    } catch (error) {
        console.error("getMusicUrl error:", error);
        return null;
    }
}

async function getMusicUrl(id) {
    return getMusicUrlByWyapi(id);
}

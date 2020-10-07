const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const API_URL = "https://api.lyrics.ovh";

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${API_URL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

// Show song and artist in DOM
function showData(data) {
  let output = "";

  result.innerHTML = `
  <ul class="songs">
    ${data.data
      .map(
        (song) => `<li>
    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
      )
      .join("")}
  </ul>
  `;

  // Display Previous & Next Buttons, if applicable
  if (data.prev || data.next) {
    more.innerHTML = `
        ${
          data.prev
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Previous</button>`
            : ""
        }
        ${
          data.next
            ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            : ""
        }
      `;
  } else {
    more.innerHTML = "";
  }
}

// Get previous and next results
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${API_URL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, `<br>`);

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;

  more.innerHTML = "";
}

// Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent submission to a file

  const searchTerm = search.value.trim();

  // Check for empty search input
  if (!searchTerm) {
    alert("Type in an artist or song name.");
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});

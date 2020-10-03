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

  //   data.data.forEach((song) => {
  //     output += `
  //       <li>
  //         <span><strong><${song.artist.name}</strong> - <strong>${song.title}</strong></span>
  //         <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  //       </li>
  //       `;
  //   });

  //   result.innerHTML = `
  //     <ul class="songs">
  //         ${output}
  //     </ul>
  //   `;

  result.innerHTML = `
  <ul class="songs>
    ${data.data
      .map(
        (song) => `<li>
    <span><strong><${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
      )
      .join("")}
  </ul>
  `;
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

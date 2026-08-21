const vibes=[
{name:"Bhojpuri",emoji:"🔴",songs:[
  ["Pala Satake","Your Artist","audio/Pala Satake.mp3"],
  ["Raja Ji","Your Artist","audio/Raja Ji.mp3"],
  ["Dhamaka","Your Artist","audio/Dhamaka.mp3"],
  ["Babuaan","Pawan Singh","audio/Babuaan.mp3"],
  ["Samiyana","Pawan Singh","audio/Samiyana.mp3"],
  ["Patli Kamariya","Antra Singh Priyanka","audio/Patli Kamariya.mp3"],
  ["King VS Queen","Your Artist","audio/King_VS_Queen.mp3"],
  ["Aaho Raja","Your Artist","audio/Aaho Raja.mp3"],
  ["Patna Ke Daku","Your Artist","audio/Patna Ke Daku.mp3"],
  ["E Dhan Licensee Bate","Your Artist","audio/E Dhan Licensee Bate.mp3"],
  ["Kamariya Pa Kata","Your Artist","audio/Kamariya Pa Kata.mp3"],
  ["JanuabSe Jeet Jai","Your Artist","audio/JanuabSe Jeet Jai.mp3"],
  ["Case Teri Rani Ladegi","Your Artist","audio/Case Teri Rani Ladegi.mp3"],
  ["Lut Gayani Pyaar Mai","Your Artist","audio/Lut Gayani Pyaar Mai.mp3"],
  ]}, 
{name:"Haryanvi",emoji:"🟡",songs:[
  ["Ram Bachaye","Your Artist","audio/Ram Bachaye.mp3"],
  ["Mukadma","Your Artist","audio/Mukadma.mp3"],
  ["Pistol Premi","Your Artist","audio/Pistol Premi.mp3"],
  ["Rohtak 3","Your Artist","audio/Rohtak 3.mp3"],
  ["Gaadi 150","Your Artist","audio/Gaadi 150.mp3"],
  ["Madam Ji","Your Artist","audio/Madam Ji.mp3"],
  ["Bau Ji","Your Artist","audio/Bau Ji.mp3"],
  ["Cheli","Your Artist","audio/Cheli.mp3"],
  ["CIRCLE","Your Artist","audio/CIRCLE.mp3"],
  ["La La La","Your Artist","audio/La La La.mp3"],
  ["Degree","your Artist","audio/Degree.mp3"],
  ["Pistol 4-5 Ka","Your Artist","audio/Pistol 4-5 Ka.mp3"],
  ["Vakaalat","Your Artist","audio/Vakaalat.mp3"],
  ["Blender","Your Artist","audio/Blender.mp3"],
  ["4 Aadmi","Your Artist","audio/4 Aadmi.mp3"],
  ["Naami Gunde","Your Artist","audio/Naami Gunde.mp3"],
  ["Number Plate Refixed Beretta","Your Artist","audio/Number Plate Refixed Beretta.mp3"],
  ["Warrning","Your Artist","audio/Warrning.mp3"],
  ["No Time","Your Artist","audio/No Time.mp3"],
  ["2 Ghode","Your Artist","audio/2 Ghode.mp3"],
  ["Rola Yaara Kaa","Your Artist","audio/Rola Yaara Kaa.mp3"]
]},
{name:"Punjabi",emoji:"🔵",songs:[]},
{name:"Hindi",emoji:"🟣",songs:[]},
{name:"Gym",emoji:"🔴",songs:[]},
{name:"Sad",emoji:"🌙",songs:[]},
{name:"Romantic",emoji:"💗",songs:[]},
{name:"Party",emoji:"⚡",songs:[]}
];
const audio=document.querySelector("#audio"), vibesEl=document.querySelector("#vibes"), songsEl=document.querySelector("#songs");
let currentVibe=0,currentSong=0;
vibes.forEach((v,i)=>{const b=document.createElement("button");b.className="vibe";b.innerHTML=`${v.emoji} ${v.name}`;b.onclick=()=>selectVibe(i);vibesEl.appendChild(b)});
function selectVibe(i){currentVibe=i;currentSong=0;document.querySelectorAll(".vibe").forEach((b,j)=>b.classList.toggle("active",j===i));document.querySelector("#listName").textContent=vibes[i].name;document.querySelector("#count").textContent=`${vibes[i].songs.length} tracks`;renderSongs();loadSong(0,false)}
function renderSongs(){songsEl.innerHTML=vibes[currentVibe].songs.map((s,i)=>`<div class="song" onclick="loadSong(${i},true)"><span class="num">${String(i+1).padStart(2,"0")}</span><div><b>${s[0]}</b><small>${s[1]}</small></div><span class="arrow">▶</span></div>`).join("")}
function loadSong(i,autoplay=true){currentSong=i;const s=vibes[currentVibe].songs[i];audio.src=s[2];document.querySelector("#title").textContent=s[0];document.querySelector("#artist").textContent=s[1];if(autoplay)audio.play().catch(()=>{});document.querySelector("#play").textContent=audio.paused?"▶":"Ⅱ"}
document.querySelector("#play").onclick=()=>{if(!audio.src)return;if(audio.paused)audio.play();else audio.pause();document.querySelector("#play").textContent=audio.paused?"▶":"Ⅱ"};
document.querySelector("#next").onclick=()=>loadSong((currentSong+1)%vibes[currentVibe].songs.length,true);
document.querySelector("#prev").onclick=()=>loadSong((currentSong-1+vibes[currentVibe].songs.length)%vibes[currentVibe].songs.length,true);
audio.addEventListener("ended",()=>document.querySelector("#next").click());
audio.addEventListener("play",()=>document.querySelector("#play").textContent="Ⅱ");
audio.addEventListener("pause",()=>document.querySelector("#play").textContent="▶");
audio.addEventListener("loadedmetadata",()=>document.querySelector("#duration").textContent=fmt(audio.duration));
audio.addEventListener("timeupdate",()=>{document.querySelector("#progress").value=audio.duration?audio.currentTime/audio.duration*100:0;document.querySelector("#current").textContent=fmt(audio.currentTime)});
document.querySelector("#progress").oninput=e=>{if(audio.duration)audio.currentTime=e.target.value/100*audio.duration};
document.querySelector("#share").onclick=async()=>{try{await navigator.share({title:"VIBE",text:"Pick a vibe. Press play.",url:location.href})}catch(e){await navigator.clipboard?.writeText(location.href);alert("Link copied!")}};
function fmt(s){if(!isFinite(s))return"0:00";return Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0")}
selectVibe(0);
const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();

  // Search empty hai to current category normal dikhao
  if (!query) {
    renderSongs();
    return;
  }

  // Sabhi categories ke songs search karo
  const results = [];

  vibes.forEach((vibe, vibeIndex) => {
    vibe.songs.forEach((song, songIndex) => {
      const songName = song[0].toLowerCase();
      const artistName = song[1].toLowerCase();

      if (
        songName.includes(query) ||
        artistName.includes(query) ||
        vibe.name.toLowerCase().includes(query)
      ) {
        results.push({
          vibeIndex,
          songIndex,
          vibeName: vibe.name,
          song
        });
      }
    });
  });

  // Results screen par dikhao
  songsEl.innerHTML = results.length
    ? results.map((result, index) => `
        <div class="song" onclick="playSearchResult(${result.vibeIndex},${result.songIndex})">
          <div>
            <strong>${String(index + 1).padStart(2, "0")}</strong>
          </div>
          <div>
            <b>${result.song[0]}</b>
            <small>${result.song[1]} • ${result.vibeName}</small>
          </div>
          <span>▶</span>
        </div>
      `).join("")
    : `
      <div class="song">
        <div>
          <b>No song found</b>
          <small>Try another song or artist</small>
        </div>
      </div>
    `;

  document.querySelector("#listName").textContent = "Search Results";
  document.querySelector("#count").textContent =
    `${results.length} ${results.length === 1 ? "track" : "tracks"}`;
});

function playSearchResult(vibeIndex, songIndex) {
  currentVibe = vibeIndex;
  currentSong = songIndex;

  renderSongs();
  loadSong(songIndex);
}

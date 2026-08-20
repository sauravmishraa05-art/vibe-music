const vibes=[
{name:"Bhojpuri",emoji:"🔴",songs:[
  ["Pala Satake","Your Artist","audio/Pala Satake.mp3"],
  ["Raja Ji","Your Artist","audio/Raja Ji.mp3"],
  ["Dhamaka","Your Artist","audio/Dhamaka.mp3"],
  ["Babuaan","Pawan Singh","audio/Babuaan.mp3"],
]}, 
{name:"Haryanvi",emoji:"🟡",songs:[
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

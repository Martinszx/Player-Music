let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
    img: "./assets/images/Juncao-Venenosa.webp",
    name: "Junção Venenosa",
    artist: "Mc Kevin",
    music: "./Junção Venenosa.mp3",
    gradient: "linear-gradient(to right, #1C1C1C, #800000)",
    textColor: "#ffff",
  },
    {
    img: "./assets/images/Doutora.webp",
    name: "Doutora",
    artist: "Mc Kevin",
    music: "./Doutora.mp3",
    gradient: "linear-gradient(to right, #708090, #F8F8FF)",
    textColor: "#ffff",
  },    {
    img: "./assets/images/Doutora-2.webp",
    name: "Doutora 2",
    artist: "Mc Kevin",
    music: "./Doutora 2.mp3",
    gradient: "linear-gradient(to right, #87CEEB, #00BFFF)",
    textColor: "#ffff",
  },
     {
    img: "./assets/images/Doutora-3.webp",
    name: "Doutora 3",
    artist: "Mc Kevin",
    music: "./Doutora 3.mp3",
    gradient: "linear-gradient(to right, #87CEFA, #4F4F4F)",
    textColor: "#ffff",
  },

    {
    img: "./assets/images/Juncao-Venenosa.webp",
    name: "Opção",
    artist: "Mc Kevin",
    music: "./Opção.mp3",
    gradient: "linear-gradient(to right, #1C1C1C, #800000)",
    textColor: "#ffff",
  },
   {
    img: "./assets/images/cupido.webp",
    name: "Cupido",
    artist: "Mc Hariel",
    music: "./assets/cupido.mp3",
    gradient: "linear-gradient(to right, #F8F8FF, #F0E68C)",
    textColor: "#ffff",
  },
  {
    img: "./assets/images/topgun.jpg",
    name: "Top Gun: Maverick",
    artist: "One Republic",
    music: "./assets/musics/maverick.mp3",
    gradient: "linear-gradient(to right, #9A6A34, #000000)",
    textColor: "#ffff",
  },
  {
    img: "./assets/images/skyfall.jpg",
    name: "Skyfall",
    artist: "Adele",
    music: "./assets/musics/skyfall.mp3",
    gradient: "linear-gradient(to right, #183025, #000000)",
    textColor: "#ffff",
  },
  {
    img: "./assets/images/superman.jpg",
    name: "Superman",
    artist: "EMINEM",
    music: "./assets/musics/superman.mp3",
    gradient: "linear-gradient(to right, #b81616, #1f4bbb,#000000)",
    textColor: "#FFFFFF",
  },
  {
    img: "./assets/images/mockingbird.jpg",
    name: "Mockingbird",
    artist: "EMINEM",
    music: "./assets/musics/mockingbird.mp3",
    gradient: "linear-gradient(to right, #000000, #74218a, #691d69,#000000)",
    textColor: "#FFFFFF",
  },
  {
    img: " ./assets/images/vivalavida.jpg",
    name: " Viva la Vida",
    artist: "The Coldplay",
    music: "./assets/musics/vivalavida.mp3",
    gradient: "linear-gradient(to right, #E08E63, #A25D42, #543D43,#111214)",
  },
  {
    img: "./assets/images/lose.webp",
    name: "Lose Yourself",
    artist: "Eminem",
    music: "./assets/musics/LoseYourself.mp3",
    gradient: " linear-gradient(to right, #B19413, ##857566, #543D43,#111214)",
  },
  {
    img: "./assets/images/Stars.jpeg",
    name: "Counting Stars",
    artist: "One Republic",
    music: "./assets/musics/CountingStars.mp3",
    gradient:
      "linear-gradient(to right, #160923,#391E4D,#672A70,#BE646E,#E8998A,#07060E)",
  },
  {
    img: "./assets/images/Stan.webp",
    name: "Stan",
    artist: "Eminem",
    music: "./assets/musics/Stan.mp3",
    gradient:
      "linear-gradient(to right, #020C04, #041103, #543D43,#111214)",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);

  random_bg_color(
    music_list[track_index].gradient,
    music_list[track_index].textColor
  );
}
function random_bg_color(gradient, textColor) {
  document.body.style.background = gradient;
  document.querySelector(".wrapper").style.color = textColor;
}

// metodo antigo de backgrounds

function reset() {
  curr_time.textContent = "00:00";
  seek_slider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}

function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);

  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  playpause.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  playpause.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
  random_bg_color();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
  random_bg_color();
}

function seekto() {
  let seekTo = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekTo;
  random_bg_color.color = textColor;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime;
    seek_slider.value = (seekPosition / curr_track.duration) * 100;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
  seek_slider.addEventListener("input", function () {
    let seekPosition = curr_track.duration * (seek_slider.value / 100);

    curr_track.currentTime = seekPosition;
  });
}

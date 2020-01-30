window.onload = function() {
    //------ Global Variables ------//
  
    var back_menu = document.getElementById("backmenu"),
      beep = document.getElementById("beep"),
  
      music_frame = document.getElementById("bg_music"),
      music = document.getElementById("sound_ico");
  
  
    //------ Function to turn on/off background music ------//
  
    music.addEventListener("click", function() {
      beep.play();
      music_frame.play();
      music.classList.toggle("do_wave");
      music.style.left = "calc(100% - 20px)";
  
      if (music.classList.contains("do_wave")) {
        music.innerHTML = '<i class="fas fa-volume-up fa-lg"></i>';
      } else {
        console.log("Sound Off");
        music.innerHTML = '<i class="fas fa-pause fa-lg"></i>';
        music_frame.pause();
      }
    });
  
   
  
  
  };
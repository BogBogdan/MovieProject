function onLoad(data) {
    const vplayer = document.querySelector('.videoplayer');
    const opis = document.querySelector('.opis');
    const name = document.querySelector('.name');
    const date = document.querySelector('.date');
    const slika= document.querySelector('.slika');
    const select = document.getElementById("my-select");
    vplayer.src=data.link;
    episodehistory.push(vplayer.src);
    opis.innerHTML=data.opis;
    name.innerHTML="Name:  "+data.title;
    date.innerHTML="Date:  "+data.date;
    slika.src=data.src;
    if(data.isMovie)
    {
      select.style.display = "none";
      return;
    }
      
    //IF ITS TV SHOW
    
    loadEpisodes(vplayer,data,data.seasons[data.link.split("-")[1]-1].numEpisodes);
  
    
    
    for(let i=0;i<data.seasons.length;i++)
    {
      const option = document.createElement("option");
      option.text = "Season "+(i+1);
      option.value = i+1;
      select.appendChild(option);
    }

    select.options[data.link.split("-")[1]-1].selected = true;


    select.addEventListener("change", function() {
      const selectedOption = this.options[this.selectedIndex];
      loadEpisodes(vplayer,data,data.seasons[selectedOption.value-1].numEpisodes);
      let arr = data.link.split("-"); 
      arr[1] = selectedOption.value;
      arr[2] = "1"; 
      data.link = arr.join("-"); 
      vplayer.src=data.link;
      episodehistory.push(vplayer.src);
    })
  }

function loadEpisodes(vplayer,data,numEpisodes)
  {
    const episodes = document.getElementById("episodes");

    episodes.innerHTML = "";
    for(let i=1;i<=numEpisodes;i++)
    {
      // Create a new button element
      const movieButton = document.createElement("button");
      movieButton.innerHTML = "Episode "+i;
      movieButton.setAttribute('class', 'episodeButton');
      movieButton.onclick = function() {
        let arr = data.link.split("-"); 
        arr[2] = i; 
        data.link = arr.join("-");
        document.querySelectorAll(".episodeButton").forEach(btn =>  btn.style.backgroundColor = "");
        vplayer.src=data.link;
        if(i==vplayer.src.split("-")[2])
          movieButton.style.backgroundColor = "#D9EB52"; 

          episodehistory.push(vplayer.src);
      };
      movieButton.id = "ep"+i;
      if(i==vplayer.src.split("-")[2])
        movieButton.style.backgroundColor = "#D9EB52"; 
      episodes.appendChild(movieButton);
    }
  }


var episodehistory=new Array;
window.onload=onLoad(JSON.parse(localStorage.show));

var vplayer = document.querySelector('.videoplayer');


/*
vplayer.onload = async function() {
  

   // let prevep=episodehistory.pop()
   if(vplayer.src!=episodehistory[episodehistory.length - 1])
    {
      let prevep=episodehistory.pop()
      alert("usao"+ prevep);
    }
}*/
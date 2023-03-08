export function onLoad(data) {
    const thiss=this;
    const container = document.querySelector('.l-container');
    const sort = document.getElementById("sort");
    sortByPopularity(data);
    loadcards(container,data,this);
      sort.addEventListener("change", function() {
        const selectedOption = this.options[this.selectedIndex];
        switch (selectedOption.value) {
          case '1':
          sortByPopularity(data);
          loadcards(container,data,thiss);
            break;
          case '2':
          sortByDate(data);
          loadcards(container,data,thiss);
            break;
          case '3':
          sortByName(data);
          loadcards(container,data,thiss);
            break;
        }
    });
}

async function loadcards(container,data,thiss)
{
container.innerHTML = "";
const size=data.length;
for (let i = 0; i < size; i++) {

const finalDiv=document.createElement('div'); 
const newDiv = document.createElement('div'); 
newDiv.setAttribute('class', 'b-game-card'); // Set the class attribute of the new div
newDiv.textContent = `New div ${i+1}`; // Set the text content of the new div   b-game-card


const newImg = document.createElement('div'); 
newImg.setAttribute('class', 'b-game-card__cover'); // Set the class attribute of the new div
newImg.style.backgroundImage = 'url('+data[i].src+')';

const name=document.createElement('p');
name.innerHTML=data[i].title;
name.style="text-align: center;";
const date=document.createElement('p');
date.innerHTML="("+data[i].date+")";
newDiv.appendChild(newImg);
finalDiv.appendChild(newDiv);
finalDiv.appendChild(name);
finalDiv.appendChild(date);
// Use an arrow function to pass the data to the event handler
newDiv.addEventListener("click", () => {
// Emit the data to the parent component


localStorage.setItem('show',JSON.stringify(data[i]));
window.location.href = '/html/watchpg.html';
});


container.appendChild(finalDiv); // Append the new div to the container div
}
}
function sortByPopularity(data)
{
data.sort((a, b) => b.popularity - a.popularity);
}

function sortByDate(data)
{
data.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function sortByName(data)
{
data.sort(sortBy("title"));
}


function sortBy(field) {
return function(a, b) {
if (a[field] < b[field]) {
return -1;
} else if (a[field] > b[field]) {
return 1;
} else {
return 0;
}
}
}

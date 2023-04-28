let searchText ="";
let apiKey = "c1fc722a844541148e8b47c1e1e37fb0";
let lat ="";
let lon ="";
let list = document.querySelector(".cities");

document.querySelector(".submitBtn").addEventListener("click",(e)=>{
    e.preventDefault();
    searchText = document.querySelector('input').value;
    fetch('city.list.json')
      .then(response => response.json())
      .then(json => {
        json.forEach(element => {
            if(searchText === element.name){
                lat = element.coord.lat
                lon = element.coord.lon
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                    .then(response => response.json())
                    .then(json => {
                        const {main,name,sys,weather} = json;
                        const li = document.createElement("li");
                        li.classList.add("city");
                        const markup =
                        `<h2 class="cirt-name=${name},${sys.country}" data-name>
                            <span>${name}</span>
                            <span>${sys.country}</span>
                        </h2>
                        <div class="city-temp">${Math.round(main.temp)}</div>
                        <p>${weather[0]["description"]}</p>
                        `;
                        li.innerHTML = markup;
                        list.appendChild(li);
                        document.querySelector(".msg").innerHTML = "";
                    });
            }else{
                document.querySelector(".msg").innerHTML = "Search Valid City";
            }

        });

    });

})



async function collectWheatherData(city) {

    const options = {
        method: 'GET',
        url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
        params: { city: city },
        headers: {
            'X-RapidAPI-Key': '8cc2b2f165msh5cd6e3ba9c00677p1ab7b6jsn9f4a7a354a14',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };


    let data;
    try {
        const response = await axios.request(options);
        data = response.data;

    } catch (error) {
        console.error(error);
    }
    return data;
}

submit.addEventListener("click", async () => {
    const data = await collectWheatherData(city.value)
    if(data!=''){
    city_name.innerHTML = city.value;
    localStorage.setItem('recent_city', city.value)
    humidity.innerHTML = data.humidity;
    max_temp.innerHTML = data.max_temp
    min_temp.innerHTML = data.min_temp
    temp.innerHTML = `${data.temp}<span>&deg;c</span>`
    city.value = '';
    }
})

btn_favorite.addEventListener("click", () => {

    if (localStorage.getItem('recent_city') != '') {
        const recent_city = localStorage.getItem('recent_city')
        localStorage.setItem('recent_city', '')
        let fav_cities = JSON.parse(localStorage.getItem('fav_cities'))

        const val = fav_cities.find((ele) => ele === recent_city)
        console.log(val)
        if (val === undefined) {
            fav_cities.push(recent_city)
            localStorage.setItem('fav_cities', JSON.stringify(fav_cities))

            fav_cities = JSON.parse(localStorage.getItem('fav_cities'))
            table_body.innerHTML = "";
            fav_cities.forEach(async (ele) => {
                let data = await collectWheatherData(ele)
                addRow(ele, data);
            })
        }
    }

})

function addRow(city, element) {

    var row = table_body.insertRow(0)
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = `<span style="font-weight:500">${city}</span>`
    cell2.innerHTML = element.humidity
    cell3.innerHTML = element.max_temp;
    cell4.innerHTML = element.temp
    cell5.innerHTML = element.min_temp
}

btn_favorite_clear.addEventListener("click", () => {
    localStorage.clear('fav_cities');
    localStorage.setItem('fav_cities', "[]")
    console.log(localStorage)
    table_body.innerHTML = ""
})

function onPageLoad(){
        fav_cities = JSON.parse(localStorage.getItem('fav_cities'))
        table_body.innerHTML = "";
        fav_cities.forEach(async (ele) => {
            let data = await collectWheatherData(ele)
            addRow(ele, data);
        })

}

window.onload=()=>{
    onPageLoad();
    console.log("completed")
}



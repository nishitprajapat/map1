//dynamically retrieve updated list of countries
let suggestions = []

//map each country name to its code 
let reverseCountryMap = {}

for ([key, value] of Object.entries(regSummary)){
    suggestions.push(value.name.text)
    reverseCountryMap[value.name.text] = key
}


// getting all required elements
const searchInput = document.querySelector(".searchInput");
const input = searchInput.querySelector("input");
const resultBox = searchInput.querySelector(".resultBox");
const icon = searchInput.querySelector(".icon");
let linkTag = searchInput.querySelector("a");
let webLink;

// if user press any key and release
input.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data =  `<li>${data}</li>`
        });
        searchInput.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = resultBox.querySelectorAll("li");
        allList.forEach((i) => {
            i.addEventListener('click', () => {
                displayRegInfoBox(reverseCountryMap[i.innerText])
            })
        })
        // for (let i = 0; i < allList.length; i++) {
        //     //adding onclick attribute in all li tag
        //     allList[i].setAttribute("onclick", "select(this)");
        // }
    }else{
        searchInput.classList.remove("active"); //hide autocomplete box
    }
}

function showSuggestions(list){
    let listData;
    userValue = input.value;
    if(!list.length && suggestions.includes(userValue)){
         listData = `<li>${userValue}</li>`
    }else{
        listData = list.join('');
    }
    resultBox.innerHTML = listData;
}
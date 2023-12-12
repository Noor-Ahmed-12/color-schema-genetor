const GenerateSchema = (e) => {
    e.preventDefault();

    const chooseColor = document.getElementById("choose-color").value;
    const colorCount = document.getElementById("colorCount").value;
    const modeDropdown = document.getElementById("mode");
    const mode = modeDropdown.options[modeDropdown.selectedIndex].value;

    let loadbtn = document.getElementById("btn");
    let loadingspin = document.getElementById("loading");
    loadingspin.classList.add("active");
    loadbtn.disabled=true;

    const apiUrl = `https://www.thecolorapi.com/scheme?hex=${chooseColor.substr(1)}&mode=${mode}&count=${colorCount}`;
    console.log("API URL:", apiUrl); // Log the API URL to check if it's constructed correctly

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            loadingspin.classList.remove("active");
            loadbtn.disabled=false;
            handleDataColor(data);
        })
        .catch(error => {
            loadingspin.classList.remove("active");
            loadbtn.disabled=false;
            console.error("Error fetching color scheme:", error)
        });
}



// 

handleDataColor = (data) =>{
const mainSec = document.getElementById("schema-color-sec");

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log(`Copied to clipboard: ${text}`);
        })
        .catch(err => {
            console.error('Unable to copy to clipboard', err);
        });
}

for (let i = 0; i < data.colors.length; i++) {
    let colorImg = document.createElement("img");
    colorImg.src = data.colors[i].image.bare;

    colorImg.addEventListener("click",()=>{
        copyToClipboard(data.colors[i].hex.value);
        alert(`You color ${data.colors[i].hex.value} is copy to clipboard`);
    })
    mainSec.appendChild(colorImg);
}

}


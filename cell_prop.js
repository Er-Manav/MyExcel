let sheetDB = []

for(let i = 0; i <rows; i++) {
    let sheetRow = []
    for(let j = 0; j < cols; j++) {
        let cellProp = {
            bold : false,
            italic : false,
            underline : false,
            alignment : "left",
            fontFamily: "monospace",
            fontSize : 14,
            fontColor : '#000000',
            BGcolor: '#ffffff', //just for indication purpose
            value : "",
            formula: "",
            children: []
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}
//selectors for cell properties
// let addressBar = document.querySelector(".addressBar");
let bold = document.querySelector(".bold")
let italic = document.querySelector(".italic")
let underline = document.querySelector(".underline")
let alignment = document.querySelectorAll(".alignment")
let fontSize = document.querySelector(".font-size-prop")
let fontFamily = document.querySelector(".font-family-prop")
let fontColor = document.querySelector(".font-color-input")
// let fontColor1 = document.querySelector(".color-prop")
let BGcolor = document.querySelector(".cell-bg-color-input")
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let formulaBar = document.querySelector(".formula-bar");



let activeColorProp = "#808e9b"
let inActiveColorProp = "#d1d8e0"

//application of two way binding -> data chnge bhi yhi se and UI mein change bhi yhi se 
//attach property listeners

bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell,cellProp] = getActiveCell(address);

    //Modification 
    cellProp.bold = !cellProp.bold; //data change 
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inActiveColorProp;
})

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell,cellProp] = getActiveCell(address);

    //Modification 
    cellProp.italic = !cellProp.italic; //data change 
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inActiveColorProp;
})

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell,cellProp] = getActiveCell(address);

    //Modification 
    cellProp.underline = !cellProp.underline; //data change 
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; //UI change
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inActiveColorProp;
})

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell,cellProp] = getActiveCell(address);

    cellProp.fontSize = fontSize.value; //Data change
    cell.style.fontSize = cellProp.fontSize + "px"; //UI change
    fontSize.value = cellProp.fontSize
})

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell,cellProp] = getActiveCell(address);

    cellProp.fontFamily = fontFamily.value; //Data change
    cell.style.fontFamily = cellProp.fontFamily; //UI change
    fontFamily.value = cellProp.fontFamily

})

fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell,cellProp] = getActiveCell(address);

    cellProp.fontColor = fontColor.value; //Data change
    cell.style.color = cellProp.fontColor; //UI change
    fontColor.value = cellProp.fontColor;
    // fontColor1.style.backgroundColor =  cellProp.fontColor;

})

BGcolor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell,cellProp] = getActiveCell(address);

    cellProp.BGcolor = BGcolor.value; //Data change
    cell.style.backgroundColor = cellProp.BGcolor; //UI change
    BGcolor.value = cellProp.BGcolor

})

alignment.forEach((alignElem)=>{
    alignElem.addEventListener("click",(e)=>{
        let address = addressBar.value;
        let [cell,cellProp] = getActiveCell(address);
        let alignValue = e.target.classList[2];  // left right center is 3rd class property in respective element in index
        cellProp.alignment = alignValue; //data change
        cell.style.textAlign = cellProp.alignment; //UI change
        switch(alignValue){ //UI2 change that is button activeness
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inActiveColorProp;
                rightAlign.style.backgroundColor = inActiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inActiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inActiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inActiveColorProp;
                centerAlign.style.backgroundColor = inActiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
        
    })
})

let allCells = document.querySelectorAll(".cell");
for(let i = 0; i < allCells.length; i++){
    updateUIcell(allCells[i]);
}

function updateUIcell(cell){
    cell.addEventListener("click", (e) =>{
        //cell property apply
        let address = addressBar.value;
        let [rid,cid] = decodeRidCid(address);
        let cellProp = sheetDB[rid][cid];
        
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none"; 
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;

        
        //Apply UI to containers/buttons
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inActiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inActiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inActiveColorProp;
        fontSize.value = cellProp.fontSize
        fontFamily.value = cellProp.fontFamily
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor
        switch(cellProp.alignment){ //UI2 change that is button activeness
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inActiveColorProp;
                rightAlign.style.backgroundColor = inActiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inActiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inActiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inActiveColorProp;
                centerAlign.style.backgroundColor = inActiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }

        formulaBar.value = cellProp.formula ? cellProp.formula : cellProp.value 
    
        



    })
}

function getActiveCell(address){
    let [rid,cid] = decodeRidCid(address);
    //access cell and storage object
    let cell = document.querySelector(`.cell[rid = "${rid}"][cid = "${cid}"]`)
    let cellProp = sheetDB[rid][cid];
    return [cell,cellProp];
}

function decodeRidCid(address){
    let rid = Number(address.slice(1))-1 ;
    let cid = Number(address.charCodeAt(0))-65;
    return [rid,cid];
}
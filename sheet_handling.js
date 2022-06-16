let addSheetBtn = document.querySelector(".sheet-add-icon");
let sheetsFolderCont = document.querySelector(".sheets-folder-cont")

addSheetBtn.addEventListener("click",(e)=>{
    let sheet = document.createElement("div");
    sheet.setAttribute("class","sheet-folder");
    
    let allSheetsFolders = document.querySelectorAll(".sheet-folder")
    sheet.setAttribute("id",allSheetsFolders.length)
    
    sheet.innerHTML = `
    <div class="sheet-content" >Sheet${allSheetsFolders.length+1}</div>
    `;
    sheetsFolderCont.appendChild(sheet);
    sheet.scrollIntoView();

    //Storage DB
    createSheetDB();
    createGraphComponentMatrix();
    handleActiveSheet(sheet);
    handleSheetRemove(sheet);
    sheet.click();
})


function createSheetDB(){
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
    collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix(){
    let graphComponentMatrix = [];
    for(let i = 0; i<rows;i++){
        let row=[];
        for(let j = 0; j<cols; j++){
            //why array?
            //more tham one parent child relation bnega 
            row.push([]);
        }
        graphComponentMatrix.push(row);
    }
collectedGraphComponentMatrix.push(graphComponentMatrix);

}

function handleSheetProperties(){
    for(let i = 0; i <rows; i++){
        for(let j = 0; j <cols; j++){
          let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
          cell.click();
        }
    }
    //by default active first cell via DOM
    let firstCell = document.querySelector(".cell");
    firstCell.click();
}

function handleSheetUI(sheet){
    let allSheetsFolders = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i < allSheetsFolders.length;i++){
        allSheetsFolders[i].style.backgroundColor = "#d1d8e0"
    }
    sheet.style.backgroundColor = "#a5b1c2"
}

function handleSheetDB(sheetIdx){
    sheetDB = collectedSheetDB[sheetIdx];
    graphComponentMatrix = collectedGraphComponentMatrix[sheetIdx]

}

function handleActiveSheet(sheet){
    sheet.addEventListener("click",(e) => {
        let sheetNumber = Number(sheet.getAttribute("id"))
        handleSheetDB(sheetNumber);
        handleSheetProperties();
        handleSheetUI(sheet);
    })
}

function handleSheetRemove(sheet){
    sheet.addEventListener("mousedown",(e) => {
        if(e.button !== 2) return; //e.button = 2 represents right click
        let allSheetsFolders = document.querySelectorAll(".sheet-folder");
        if(allSheetsFolders.length === 1 ){
            alert("You need to have atleast one sheet to remove!!")
            return;
        }

        let response = confirm("Your Sheet will be permanently removed, Are you sure?")
        if(!response) return;

        let sheetNumber = Number(sheet.getAttribute("id"))
        collectedSheetDB.splice(sheetNumber, 1);
        collectedGraphComponentMatrix.splice(collectedGraphComponentMatrix,1);
        
        handleSheetRemoveUI(sheet)

        //After removing sheet bring to sheet 1 to user
        handleSheetDB(0);
        handleSheetProperties();

    })
}
function handleSheetRemoveUI(sheet){
    sheet.remove();
    let allSheetsFolders = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i <allSheetsFolders.length; i++){
        allSheetsFolders[i].setAttribute("id",i);
        let sheetContent = allSheetsFolders[i].querySelector(".sheet-content");
        sheetContent.innerText = `Sheet${i+1}`
        allSheetsFolders[i].style.backgroundColor = "#d1d8e0";
    }
    allSheetsFolders[0].style.backgroundColor ="#a5b1c2";

}
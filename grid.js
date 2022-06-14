let rows = 100;
let cols = 26;

let addressCols = document.querySelector(".address-col");
let addressRows = document.querySelector(".address-row");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");


for(let i=0;i<rows;i++){
    let rowElement = document.createElement("div");
    rowElement.innerHTML = i+1;
    rowElement.setAttribute("class",`rows row${i+1}`);
    addressCols.appendChild(rowElement);
    
}

for(let i=0;i<cols;i++){
    let colElement = document.createElement("div");
    colElement.innerHTML = String.fromCharCode(65+i);
    colElement.setAttribute("class",`cols col${String.fromCharCode(65+i)}`);
    addressRows.appendChild(colElement);
    
}

for(let i=0;i<rows;i++){
    let row = document.createElement("div");
    row.setAttribute("class","row-cont")
    for(let j=0;j<cols;j++){
        let cell = document.createElement("input");
        cell.setAttribute("class","cell");
        cell.setAttribute("id",`${String.fromCharCode(65+j)+(i+1)}`)
        //cell identification for cell properties
        cell.setAttribute("rid",i)
        cell.setAttribute("cid",j)
        // cell.innerHTML = String.fromCharCode(65+j)+(i+1)
        row.appendChild(cell);
        displayCell(cell,i,j);
    }
    cellsCont.appendChild(row);

}

function displayCell(cell,i,j){
    cell.addEventListener("click",(e)=>{
        let cellValue = String.fromCharCode(65+j) + (i+1);
        addressBar.value = cellValue;
    })
}

// storage k liye matrix 
// for each cell we can use object

//by default active first cell via DOM
let firstCell = document.querySelector(".cell");
firstCell.click();
//To select ctrl + click 

let ctrlKey;

document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey;
})
document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey;
})

for(let i = 0; i <rows;i++){
    for(let j = 0; j<cols; j++){
        let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`)
        handleSelectedCell(cell);
    }
}

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");



rangeStorage=[];
function handleSelectedCell(cell){
    cell.addEventListener("click",() => {
        if(!ctrlKey) return;

        if(rangeStorage.length >= 2) {
            handleDefaultSelectedCellUI();
            rangeStorage=[];
        }

        cell.style.border = "2px solid grey"
        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        // let [rid,cid] = decodeRidCid()
        rangeStorage.push([rid,cid])
    })
}

function handleDefaultSelectedCellUI(){
    for(let i=0; i<rangeStorage.length; i++){
        let cell = document.querySelector(`.cell[rid = "${rangeStorage[i][0]}"][cid = "${rangeStorage[i][1]}"]`)
        cell.style.border = "1px solid #a5b1c2";

    }
}

let copyData = [];
//startRow = rangeStorage[0][0]
//endRow = rangeStorage[1][0]
//startColumn = rangeStorage[0][1]
//endColumn = rangeStorage[1][1]
copyBtn.addEventListener("click",()=>{
    if(rangeStorage.length < 2) 
    {   
        alert("Select two cells from where to copy and to which cell")
        handleDefaultSelectedCellUI();
        return;
    }
    copyData = [];
    let [strow, stcol, endrow, endcol] = [ rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0], rangeStorage[1][1] ];
    
    for(let i=strow; i<=endrow; i++){  
        let copyRow=[]
        for(let j=stcol; j<=endcol;j++){
            let cellProp = sheetDB[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }
    handleDefaultSelectedCellUI();
})



pasteBtn.addEventListener("click",()=>{
    //pasteCell of from copyData
    if(rangeStorage.length<2) return;


    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0])
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1])


    let address = addressBar.value;
    let [sRow,sCol] = decodeRidCid(address);

    for(let i=sRow,r=0; i <= sRow+rowDiff; i++,r++){   //r and c is used to represent copyData indexing
        for(let j=sCol, c=0; j <= sCol+colDiff; j++,c++){
        let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
        
        if(!cell) {
            continue;
        }   //out of index cell access
        //DB change

        let cellProp = sheetDB[i][j];
        let data = copyData[r][c];

        cellProp.value = data.value;
        cellProp.bold = data.bold;
        cellProp.italic = data.italic;
        cellProp.underline = data.underline;
        cellProp.alignment = data.alignment;
        cellProp.fontFamily = data.fontFamily;
        cellProp.fontSize = data.fontSize;
        cellProp.fontStyle = data.fontStyle;
        cellProp.fontColor = data.fontColor;
        cellProp.BGcolor = data.BGcolor;

        //UI change
        cell.click();
        }
    }
})

cutBtn.addEventListener("click", (e) => {
    if(rangeStorage.length < 2) 
    {   
        alert("Select two cells from where to cut and upto which cell")
        handleDefaultSelectedCellUI();
        return;
    }
    copyData = [];
    // let [strow, stcol, endrow, endcol] = [ rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0], rangeStorage[1][1] ];
    
    for(let i=rangeStorage[0][0]; i<=rangeStorage[1][0]; i++){  
        let copyRow=[]
        for(let j=rangeStorage[0][1]; j<=rangeStorage[1][1];j++){
        let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
            copyRow.push(JSON.parse(JSON.stringify(sheetDB[i][j])));

            let cellProp = sheetDB[i][j];
            
            cellProp.bold = false
            cellProp.italic = false
            cellProp.underline = false
            cellProp.alignment = "left"
            cellProp.fontFamily= "monospace"
            cellProp.fontSize = 14
            cellProp.fontColor = '#000000'
            cellProp.BGcolor= '#ffffff'
            cellProp.value = ""

            cell.click();
        }
        copyData.push(copyRow);
       
    }
    handleDefaultSelectedCellUI();
})
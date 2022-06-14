for(let i = 0;i<rows;i++){
    for(let j = 0;j < cols;j++){
        let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`)
        
        cell.addEventListener("blur",(e)=>{
            let address = addressBar.value;
            let [activeCell,cellProp] = getActiveCell(address);
            let enteredData = activeCell.value;
            cellProp.value = enteredData
        })
    }
}


// let formulaBar = document.querySelector(".formula-bar"); // already initialized in cell+prop.js

formulaBar.addEventListener("keydown", (e)=>{
    let expression = formulaBar.value
    if(e.key == "Enter" && expression){
        
        //if change in formula , break old parent-child rltnship
        //and add new relation of parent child
        let address = addressBar.value;
        let [cell,cellProp] = getActiveCell(address)
        if(expression !== cellProp.formula){
            removeChildFromParent(cellProp.formula)
        }
        
        //update UI and sheetDB
        let evaluatedValue = evaluateFormula(expression)
        setCellUIandCellProp(evaluatedValue, expression) 
        addChildtoParent(expression);
        // console.log(sheetDB)
    } 
})

function updateChildrenCells(parentAddress){
    let [parentCell,parentCellProp] = getActiveCell(parentAddress);
    let children = parentCellProp.children;

    for(let i=0;i<children.length;i++){
        let childAddress = children[i];
        let [childCell,childCellProp] = getActiveCell(childAddress);
        let 
    }
}
function addChildtoParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <=90){
            let [parentCell,parentCellProp] = getActiveCell(encodedFormula[i]);
            if(!parentCellProp.children.includes(childAddress)){
                parentCellProp.children.push(childAddress);
            }
        }
    }
}

function removeChildFromParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <=90){
            let [parentCell,parentCellProp] = getActiveCell(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress)
                parentCellProp.children.splice(idx,1);
        }
    }
}


function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <=90){
            let [cell,cellProp] = getActiveCell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value
        }
    }
    let decodedFormula = encodedFormula.join(" ")
    return eval(decodedFormula);
}
function setCellUIandCellProp(evaluatedValue, formula){
    let address = addressBar.value;
    let [cell,cellProp] = getActiveCell(address);
    cell.value = evaluatedValue         //UI update
    cellProp.value = evaluatedValue     //DB update
    cellProp.formula = formula;
}
for(let i = 0; i<rows; i++){
    for(let j = 0; j<cols; j++){
        let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`)
        
        cell.addEventListener("blur",async (e)=>{
            let address = addressBar.value;
            let [activeCell,cellProp] = getActiveCell(address);
            let enteredData = activeCell.value;
            if(enteredData === cellProp.value) {
                return;
            }
            cellProp.value = enteredData;

            //if cell data modifies we have to 
            //remove Parent child relationship
            //empty cellProp formula 
            //update children with modified hardcoded value in cell
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);
        })
        cell.addEventListener("keydown", async (e)=>{
            let address = addressBar.value;
            let [activeCell,cellProp] = getActiveCell(address);
            let expression = activeCell.value;
           
            if(e.key == "Enter" && expression){
                if(expression.startsWith("=")){
                    expression = expression.substring(1);
                }
                else{
                alert("To evaluate any formula start with '='")
                }
                
                //if change in formula , break old parent-child rltnship
                //and add new relation of parent child
                if(expression !== cellProp.formula){
                    removeChildFromParent(cellProp.formula)

                }
                //update UI and sheetDB
                let evaluatedValue = evaluateFormula(expression)
                setCellUIandCellProp(evaluatedValue, expression, address) 
                addChildtoParent(expression);
                updateChildrenCells(address);
            } 
        })
    }
}


// let formulaBar = document.querySelector(".formula-bar"); // already initialized in cell+prop.js

formulaBar.addEventListener("keydown", async (e)=>{
    let expression = formulaBar.value
    if(e.key == "Enter" && expression){
        
        //if change in formula , break old parent-child rltnship
        //and add new relation of parent child
        let address = addressBar.value;
        let [cell,cellProp] = getActiveCell(address)
        if(expression !== cellProp.formula){
            removeChildFromParent(cellProp.formula)
        }
      
        addChildToGraphComponent(expression, address);

        //check formula is cyclic or not active
        let cycleResponse = isGraphCyclic(graphComponentMatrix);
        if(cycleResponse){
            let res = confirm("Entered formula is cyclic! Do you wanna trace where cycle is forming?");
            while(res){
                //keep on tracing path until users cancel
                await isGraphCyclicTracePath(graphComponentMatrix,cycleResponse);
                //to see color tracking we have to sunc this code also so that same result is visible;

                res = confirm("Entered formula is cyclic! Do you wanna trace where cycle is forming?");
            }
            removeChildFromGraphComponent(expression,address);

            return;
        }


        //update UI and sheetDB
        let evaluatedValue = evaluateFormula(expression)

        setCellUIandCellProp(evaluatedValue, expression, address) 
        addChildtoParent(expression);
        updateChildrenCells(address);
    } 
})

function updateChildrenCells(parentAddress){
    let [parentCell,parentCellProp] = getActiveCell(parentAddress);
    let children = parentCellProp.children;
    
    for(let i=0;i<children.length;i++){
        let childAddress = children[i];
        if(parentAddress === childAddress){
            return;
        }
        let [childCell,childCellProp] = getActiveCell(childAddress);
        let childFormula = childCellProp.formula;
        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIandCellProp(evaluatedValue, childFormula, childAddress)
        updateChildrenCells(childAddress);
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

function addChildToGraphComponent(formula,childAddress){

    let [crid,ccid] = decodeRidCid(childAddress); //child rowID and child colID
    let encodedFormula = formula.split(" ");
    for(let i = 0; i <encodedFormula.length ; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <=90){
            let [parentRID,parentCID]= decodeRidCid(encodedFormula[i]);
            // B1 : A1 + 10
            graphComponentMatrix[parentRID][parentCID].push([crid,ccid]);
        }
    }
}
function removeChildFromGraphComponent(formula,childAddress){
    let [crid,ccid] = decodeRidCid(childAddress); //child rowID and colID
    let encodedFormula = formula.split(" ");
    for(let i = 0; i <encodedFormula.length ; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <=90){
            let [parentRID,parentCID]= decodeRidCid(encodedFormula[i]);
            graphComponentMatrix[parentRID][parentCID].pop();
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
function setCellUIandCellProp(evaluatedValue, formula, address){
    let [cell,cellProp] = getActiveCell(address);
    cell.value = evaluatedValue         //UI update
    cellProp.value = evaluatedValue     //DB update
    cellProp.formula = formula;
}
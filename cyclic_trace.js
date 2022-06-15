function colorPromise(){                    //for delay and wait 
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve();
        },800);
    })
}
async function isGraphCyclicTracePath(graphComponentMatrix,cycleResponse){
    let [srcRow, srcCol] = cycleResponse
    //dependency -> visited array and DFSvisited (2D Array)
    let visited = [];   //to trace node visited or not
    let dfsVisited = []; //to trace stack

    for(let i=0;i<rows;i++){
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let j=0;j<cols;j++){
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    // for(let i = 0; i<rows;i++){
    //     for(let j = 0; j<cols; j++){
    //         if(!visited[i][j])
    //         return dfsCycleDetectionTracePath(graphComponentMatrix, i, j, visited, dfsVisited);
    //     }
    // } 
    // return false; 
    let response = await dfsCycleDetectionTracePath(graphComponentMatrix, srcRow, srcCol, visited, dfsVisited);
    if(response) return Promise.resolve(true);

    return Promise.resolve(false);
}


//coloring cell for tracking

async function dfsCycleDetectionTracePath(graphComponentMatrix, srcRow, srcCol, visited, dfsVisited){
    visited[srcRow][srcCol] = true;
    dfsVisited[srcRow][srcCol] = true;

    let cell = document.querySelector(`.cell[rid = "${srcRow}"][cid = "${srcCol}"]`)
   
        cell.style.backgroundColor = "lightblue";
        await colorPromise();  //delay providing
        
        
        // A1 = [[0,1],[1,0],[5,10],......]
        
        for(let children = 0;children < graphComponentMatrix[srcRow][srcCol].length;children++){
            let [childRow,childCol] = graphComponentMatrix[srcRow][srcCol][children];  
            if((visited[childRow][childCol])==false){
                let response = await dfsCycleDetectionTracePath(graphComponentMatrix, childRow,childCol,visited,dfsVisited)
                if(response) {
                        cell.style.backgroundColor =  sheetDB[srcRow][srcCol].BGcolor;
                        await colorPromise();  
    
                return Promise.resolve(true); 
            }
            
        }
        else if(visited[childRow][childCol]==true && dfsVisited[childRow][childCol]==true){
            let cyclicCell = document.querySelector(`.cell[rid = "${srcRow}"][cid = "${srcCol}"]`)
            let cyclicCellProp = sheetDB[srcRow][srcCol];
            cyclicCell.style.backgroundColor = "lightcoral"
            await colorPromise();
            
            cyclicCell.style.backgroundColor = cyclicCellProp.BGcolor;
            await colorPromise();
            return Promise.resolve(true); 
            
        }
    }
    dfsVisited[srcRow][srcCol] = false;
    return Promise.resolve(false);
}
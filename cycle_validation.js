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

function isGraphCyclic(graphComponentMatrix){
    //dependency -> visited array and DFSvisited (2D Array)
    let visited = [];
    let dfsVisited = [];

    for(let i=0;i<rows;i++){
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let j=0;j<cols;j++){
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
    }

    for(let i = 0; i<rows;i++){
        for(let j = 0; j<cols; j++){
        
        }
    }  

}

function dfsCycleDetection(graphComponentMatrix)
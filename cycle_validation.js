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

    for(let i = 0; i<rows;i++){
        for(let j = 0; j<cols; j++){
            if(!visited[i][j]){
            let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
            if(response) return [i,j];
            }
        }
    } 
    return null; 

}
//start -> visited(true) and dfsvisited(true) 
//End -> dfsvisited(false) 
// if(vis[i][j] = true) => already explored path no need to visit again
//condition for cycle detection -> if(vis[i][j]==dfsvis[i][j]==true) =>  cycle is present

function dfsCycleDetection(graphComponentMatrix, srcRow, srcCol, visited, dfsVisited){
    visited[srcRow][srcCol] = true;
    dfsVisited[srcRow][srcCol] = true;

    // A1 = [[0,1],[1,0],[5,10],......]

    for(let children = 0;children < graphComponentMatrix[srcRow][srcCol].length;children++){
        let [childRow,childCol] = graphComponentMatrix[srcRow][srcCol][children];  //neighbour row and neighbour column
        if((visited[childRow][childCol])==false){
            let response = dfsCycleDetection(graphComponentMatrix, childRow,childCol,visited,dfsVisited)
            if(response) return true; // found cycle no need to explore more

            
        }
        else if(visited[childRow][childCol]==true && dfsVisited[childRow][childCol]==true){
            return true;
        }
    }
    dfsVisited[srcRow][srcCol] = false;
    return false;
}
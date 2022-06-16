let downloadBtn = document.querySelector(".download")
let uploadBtn = document.querySelector(".upload")

//download 
downloadBtn.addEventListener("click",(e) => {
    let jsonData = JSON.stringify([sheetDB,graphComponentMatrix]);
    let file = new Blob([jsonData], { type: "application/json" })
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
})


uploadBtn.addEventListener("click",(e) => {

    //opens file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change",(e) => {
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];
        fr.readAsText(fileObj);
        fr.addEventListener("load", (e) => {
            let readSheetData = JSON.parse(fr.result);

            //basic sheet will be creatwd with default(new) data
            addSheetBtn.click();

            sheetDB = readSheetData[0];
            graphComponentMatrix = readSheetData[1];
            collectedSheetDB[collectedSheetDB.length-1] = sheetDB;
            collectedGraphComponentMatrix[collectedGraphComponentMatrix.length-1] = graphComponentMatrix;
            handleSheetProperties();

        })
    })

})
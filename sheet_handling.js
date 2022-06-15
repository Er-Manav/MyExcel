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

})


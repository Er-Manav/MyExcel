let selectedAction = document.querySelector(".page-action-selected")

let pageAction = document.querySelectorAll(".page-action")


// pageAction.forEach((pageaction)=>{
//     pageaction.addEventListener("blur",(e)=>{
//         pageaction.classList.add("page-action-selected")
//     })
// })

for(let i=0; i<pageAction.length; i++){
    pageAction[i].addEventListener("click",(e)=>{
        let current = document.querySelector(".page-action-selected");
        current.classList.remove("page-action-selected");
        pageAction[i].classList.add("page-action-selected");
    })
}

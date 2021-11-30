let urlCode = window.location.pathname.substr(8)
console.log(urlCode)

window.onload = function(){  
  let insList = document.querySelector(".questionListIns")
  let providerList = document.querySelector(".questionListProvider")
    fetch("/api.json")
      .then(res => res.json())
      .then(data => {
        let invis = document.createElement("input")
        invis.name = "procedureCode"
        invis.classList.add("hiddenInput")
        invis.value = urlCode
        document.querySelector(".proCodeAndDesc").appendChild(invis)
        invis.style.visibility = "hidden"

        let invis2 = document.createElement("input")
        invis2.name = "procedureDescription"
        invis2.classList.add("hiddenInput")
        document.querySelector(".proCodeAndDesc").appendChild(invis2)
        invis2.style.visibility = "hidden"

        for (let i = 0; i < data.length; i++) {
          document.querySelector(".procCode").innerText = urlCode
          
          invis2.value = data[i].description

          if (urlCode === data[i].dentalCode) {
            document.querySelector(".procDescription").innerText = data[i].description
            let proArr = document.querySelectorAll('.proQInput') 
            let insArr = document.querySelectorAll('.insQInput') 
            
            for (let x = 0; x < data[i].providerQuestions.length; x++) {
              proArr.forEach(el => {
                if(Number(el.name.substr(el.name.length - 1)) === x){
                  el.parentElement.childNodes[1].innerText = data[i].providerQuestions[x]
                }
              })
            }
            for (let y = 0; y < data[i].insuranceQuestions.length; y++) {
              insArr.forEach(el => {
                if(Number(el.name.substr(el.name.length - 1)) === y){
                  el.parentElement.childNodes[1].innerText = data[i].insuranceQuestions[y]
                }
              })
            }
            
          }
        }
    })
}





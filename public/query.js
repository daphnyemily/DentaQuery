let urlCode = window.location.pathname.substr(7)
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

        for (let i = 0; i < data.length; i++) {
          document.querySelector(".procCode").innerText = urlCode
          document.querySelector(".procDescription").innerText = data[i].description

          if (urlCode === data[i].dentalCode) {
            for (let x = 0; x < data[i].providerQuestions.length; x++) {
              let proQ = document.createElement("li")
              let proQInput = document.createElement("input")
              proQInput.type = "text"
              proQInput.name = "proQAnswer" + x
              proQInput.placeholder = "Type answer here ..."
              proQInput.classList.add("proQInput")
              proQ.innerText = data[i].providerQuestions[x]
              proQ.classList.add("proQ")
              proQ.appendChild(proQInput)
              providerList.appendChild(proQ)
            }
            for (let y = 0; y < data[i].insuranceQuestions.length; y++) {
              let insQ = document.createElement("li")
              let insQInput = document.createElement("input")
              insQInput.type = "text"
              insQInput.name = "insQAnswer" + y
              insQInput.placeholder = "Type answer here ..."
              insQInput.classList.add("InsQInput")
              insQ.innerText = data[i].insuranceQuestions[y]
              insQ.classList.add("insQ")
              insQ.appendChild(insQInput)
              insList.appendChild(insQ)
            }
            
          }
        }
    })
}





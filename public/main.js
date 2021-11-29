console.log("im linked")
console.log(window.location.pathname.substr(7))

document.querySelector("#searchBtn").addEventListener("click", () => {
  document.querySelectorAll('.resultList').forEach(element => element.remove())

  let search = document.querySelector("#searchBar").value
  console.log(search)
  fetch("api.json")
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        for (let x = 0; x < data[i].Related.length; x++) {
          if (search.toLowerCase() === data[i].Related[x]) {
            let listItem = document.createElement("li")
            let link = document.createElement('a')
            let list = document.querySelector('#searchList')

            link.classList.add('resultLink')
            listItem.classList.add("resultList")
            link.innerText = data[i].dentalCode + " - " + data[i].description
            link.href = `/query/${data[i].dentalCode}`

            listItem.appendChild(link)
            list.appendChild(listItem)
          }
        }
        if (search.toUpperCase() === data[i].dentalCode || search === data[i].dentalCode.substr(1, data[i].dentalCode.length - 1)) {
          let listItem = document.createElement("li")
          let link = document.createElement('a')
          let list = document.querySelector('#searchList')

          link.classList.add('resultLink')
          listItem.classList.add("resultList")
          link.innerText = data[i].dentalCode + " - " + data[i].description
          link.href = `/query/${data[i].dentalCode}`

          listItem.appendChild(link)
          list.appendChild(listItem)
        }
      }
      // console.log(data)
    })
})



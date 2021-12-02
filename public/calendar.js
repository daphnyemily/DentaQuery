window.onload = function () {
  let titleArr = document.querySelectorAll(".appointmentTitle");
  let descArr = document.querySelectorAll(".appointmentDesc");
  let dateArr = document.querySelectorAll(".appointmentDate");
  console.log(titleArr, descArr, dateArr)
  let selectedDate = document.querySelector(".selectedDate");
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      selectedDate = mutation.target.data;
      console.log(selectedDate);
      
      let month = selectedDate.split(" ")[0];
      let day = selectedDate.split(" ")[1].replace(",", "");
      if (day.length === 1) {
        day = "0" + day;
      }
      let year = selectedDate.split(" ")[2];
      let monthNumber =
        [
          "january",
          "february",
          "march",
          "april",
          "may",
          "june",
          "july",
          "august",
          "september",
          "october",
          "november",
          "december",
        ].indexOf(month.toLowerCase()) + 1;
      let date = `${monthNumber}-${day}-${year}`;
      document.querySelector(".inputDate").value = date 
      dateArr.forEach(function(el, i){
         if(el.innerHTML.split(" ")[0] == date){
            el.style.display = "block";
            titleArr[i].style.display = "block";
            descArr[i].style.display = "block"
         }else{
            el.style.display = "none";
            titleArr[i].style.display = "none" 
            descArr[i].style.display = "none"
         }
    });
  })
});

  var config = { characterData: true, subtree: true };
  observer.observe(selectedDate, config);
  //observer.disconnect();
  let month = selectedDate.innerHTML.split(" ")[0];
  let day = selectedDate.innerHTML.split(" ")[1].replace(",", "");
  if (day.length === 1) {
    day = "0" + day;
  }
  let year = selectedDate.innerHTML.split(" ")[2];
  let monthNumber =
    [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ].indexOf(month.toLowerCase()) + 1;
  let date = `${monthNumber}-${day}-${year}`;

  dateArr.forEach(function(el, i){
    if(el.innerHTML.split(" ")[0] == date){
       el.style.display = "block";
       titleArr[i].style.display = "block";
       descArr[i].style.display = "block"
    }else{
       el.style.display = "none";
       titleArr[i].style.display = "none" 
       descArr[i].style.display = "none"
    }
});
   document.querySelector(".inputDate").value = date
  dateArr.forEach((el) => console.log(el.innerHTML.split(" ")[0]));
  // titleArr.forEach(el => console.log(el.innerHTML ))
  // descArr.forEach(el => console.log(el.innerHTML))
  console.log(date);
};

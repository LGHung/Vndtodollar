
import {
    getDatabase,
    ref,
    update,
    get,
    child,
  } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
  
  const db = getDatabase();
  var rollbox = document.getElementById("Rollbox");
  var cash_box = document.getElementById("cash")
  var getvnd
  var getdo
  var transferall = document.getElementById("transferall")
  var transferall2 = document.getElementById("transferall2")
  var getyourvnd
  var getyourdo
 
  
  function selectData() {
    const dbref = ref(db);
    get(child(dbref, "TheStudents/" + rollbox.value))
      .then((snapshot) => {
        if (snapshot.exists()) {
            getyourdo = snapshot.val().cashesdollar
            getyourvnd = snapshot.val().cashes
          getdo = (( Number(snapshot.val().cashes) - (Number(snapshot.val().cashes) - cash_box.value))/23)
        } else {
          alert("No data found");
        }
      })
      .catch((error) => {
        alert("unsuccessful, error: " + error);
      });
  }
  function updateData() {
    selectData()
    update(ref(db, "TheStudents/" + rollbox.value), {
      cashesdollar : Number( getyourdo) + Number(getdo),
      cashes : Number( getyourvnd) - cash_box.value,
    })
      .then(() => {
        alert("data stored successfully");
      })
      .catch((error) => {
        alert("unsuccessful, error: " + error);
      });
  }



  function selectData2() {
    const dbref = ref(db);
    get(child(dbref, "TheStudents/" + rollbox.value))
      .then((snapshot) => {
        if (snapshot.exists()) {
            getyourdo = snapshot.val().cashesdollar
            getyourvnd = snapshot.val().cashes
          getvnd = (( Number(snapshot.val().cashesdollar) - (Number(snapshot.val().cashesdollar) - cash_box.value))*23)
        } else {
          alert("No data found");
        }
      })
      .catch((error) => {
        alert("unsuccessful, error: " + error);
      });
  }
  function updateData2() {
    selectData()
    update(ref(db, "TheStudents/" + rollbox.value), {
      cashesdollar : Number( getyourdo) - cash_box.value,
      cashes : Number( getyourvnd) + Number(getvnd),
    })
      .then(() => {
        alert("data stored successfully");
      })
      .catch((error) => {
        alert("unsuccessful, error: " + error);
      });
  }
  
  transferall.addEventListener("click", transfers);
  transferall2.addEventListener("click", transfers2);
  function transfers(){
    selectData()
    updateData()
  }

  function transfers2(){
    selectData2()
    updateData2()
  }

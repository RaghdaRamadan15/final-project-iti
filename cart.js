let tabledata;
let shoppingFeas = 10;
function getdatastore() {
  tabledata = JSON.parse(localStorage.getItem("addcort")) || [];
}
getdatastore();
showdata();
function showdata() {
  // document.addEventListener("DOMContentLoaded", function () {
  // الحصول على tbody العنصر
  const tableBody = document.querySelector("#toble_data tbody");

  // مسح البيانات الموجودة في tbody باستثناء الصف الأول
  tableBody.innerHTML = "";

  // إضافة الصفوف الجديدة من tabledata
  for (const data of tabledata) {
    tableBody.innerHTML += `
        <tr>
          <td>
            <img
              src="${data.imag}"
              alt=""
              height="70px"
            />
          </td>
          <td>${data.price}</td>
          <td>
            <div class="number-Quantity">
              <button class="add" id="increment">+</button>
              <span class="value" id="counter" style="margin-top: 10px">${data.Quantity}</span>
              <button class="sub" id="decrement">-</button>
            </div>
          </td>
          <td>${data.total}</td>
          
          <td >
           <div class="elementDelete"> 
            <button
             id="delete-btn"
              class="circular button-delete"

              style="background-color: red; color: white"
              
            >
              <span class="material-symbols-outlined">delete</span>
            </button>
              </div>
          </td>
        
         
        </tr>
      `;
  }

  // إضافة مستمعين للأحداث للأزرار
  addEventListeners();
}

function addEventListeners() {
  const products = document.querySelectorAll(".number-Quantity");
  const elementDelete = document.querySelectorAll(".elementDelete");
  //number-Quantity
  products.forEach((product, index) => {
    const addButton = product.querySelector(".add");
    const subButton = product.querySelector(".sub");
    const counterElement = product.querySelector(".value");

    addButton.addEventListener("click", function () {
      let count = parseInt(counterElement.innerHTML);
      count += 1;
      counterElement.innerHTML = count;
      tabledata[index].Quantity = count;
      tabledata[index].total = count * tabledata[index].price;
      localStorage.setItem("addcort", JSON.stringify(tabledata));
      showdata();
      total();
    });

    subButton.addEventListener("click", function () {
      let count = parseInt(counterElement.innerHTML);
      if (count > 1) {
        count -= 1;
        counterElement.innerHTML = count;
        tabledata[index].Quantity = count;
        tabledata[index].total = count * tabledata[index].price;
        localStorage.setItem("addcort", JSON.stringify(tabledata));
        showdata();
        total();
      }
    });
  });
  // delete element;
  elementDelete.forEach((element, index) => {
    const deleteElement = element.querySelector(".button-delete");
    deleteElement.addEventListener("click", function () {
      let conf = confirm(
        "DO you want to delete thiAre you sure you want to delete the item?"
      );
      if (conf) {
        tabledata.splice(index, 1);
        localStorage.setItem("addcort", JSON.stringify(tabledata));
        Swal.fire({
          icon: "success",
          title: "The product has been delete successfully",
          background: "rgb(146, 218, 104)",
          showConfirmButton: false,
          timer: 1500,
          titleColor: "#ffffff",
          iconColor: "#5cb85c",
        });
        showdata();
      }
    });
  });
}

//display total amount

total();
function total() {
  let totalAmount = 0;
  tabledata.forEach((data) => {
    totalAmount += data.Quantity * data.price;
  });
  // return totalAmount;
  document.getElementById("money").innerHTML = `${totalAmount}$`;
  document.getElementById("totalmoney").innerHTML = `${
    parseInt(document.getElementById("money").innerHTML) + shoppingFeas
  }$`;
}

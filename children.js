let datachildern = JSON.parse(localStorage.getItem("itemChildern")) || [];

// After loading HTML
document.addEventListener("DOMContentLoaded", function () {
  display("section_children", datachildern);
});

function display(id, alldata) {
  // clear old data
  document.getElementById(id).innerHTML = "";
  alldata.forEach((contents, index) => {
    let sectionHTML = `<section class="section1clothes">`;
    contents.forEach((content) => {
      sectionHTML += `
            <div class="product">
              <img src="${content.imag}" alt="Product Image" />
              <p class="price">Price: ${content.price}</p>
              <button class="details-button">Show Details</button>
              <button class="addcart-button">Add to Cart</button>
              <div class="details" style="display: none;">
                <table style="width: 90%; height: 400px">
                  <tr>
                    <td>ID</td>
                    <td class="id">${content.ID}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>${content.Name}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>${content.Category}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>${content.Description}</td>
                  </tr>
                  <tr>
                    <td>Color</td>
                    <td>${
                      Array.isArray(content.color)
                        ? content.color.join(", ")
                        : content.color
                    }</td>
                  </tr>
                  <tr>
                    <td>Size</td>
                    <td>${
                      Array.isArray(content.size)
                        ? content.size.join(", ")
                        : content.size
                    }</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>${content.weigh}</td>
                  </tr>
                  <tr>
                    <td>Temperature</td>
                    <td>${content.temperature}</td>
                  </tr>
                </table>
                <button class="back-button" style="display: none;">Back</button>
              </div>
            </div>
          `;
    });
    sectionHTML += `</section>`;
    document.getElementById(id).innerHTML += sectionHTML;
  });

  // Add event listeners for the buttons after elements are created
  addEventListeners();
}

let tabledata;
function getdatastore() {
  tabledata = JSON.parse(localStorage.getItem("addcort")) || [];
}
getdatastore();
//Create event listeners for each button for element creation
function addEventListeners() {
  const products = document.querySelectorAll(".product");
  products.forEach((product) => {
    const showDetailsButton = product.querySelector(".details-button");
    const addcartButton = product.querySelector(".addcart-button");
    const backButton = product.querySelector(".back-button");

    showDetailsButton.addEventListener("click", function () {
      product.querySelector("img").style.display = "none";
      product.querySelector(".price").style.display = "none";
      addcartButton.style.display = "none";
      showDetailsButton.style.display = "none";
      product.querySelector(".details").style.display = "block";
      backButton.style.display = "block";
    });

    backButton.addEventListener("click", function () {
      product.querySelector("img").style.display = "";
      product.querySelector(".price").style.display = "";
      showDetailsButton.style.display = "";
      addcartButton.style.display = "";
      product.querySelector(".details").style.display = "none";
      backButton.style.display = "none";
    });

    // تهيئة مصفوفة فارغة في البداية

    // إضافة مستمع الحدث للزر
    addcartButton.addEventListener("click", function () {
      // استرجاع الصورة والسعر من المنتج
      let image = product.querySelector("img").src;
      let price = product.querySelector(".price").innerHTML;
      let id = product.querySelector(".id").innerText; // استرجاع النص الداخلي للعنصر ID
      let Quantity = 1;

      price = price.substring(6, price.indexOf("$"));

      // إنشاء كائن جديد يحتوي على الصورة والسعر
      let table = {
        id: id,
        imag: image,
        price: price,
        total: price,
        Quantity: Quantity,
      };
      // التحقق مما إذا كان العنصر موجود بالفعل في السلة
      let itemExists = tabledata.find((item) => item.imag === image);

      if (itemExists) {
        // عرض رسالة التحذير
        Swal.fire({
          icon: "warning",
          title: "The item is already in your cart",
          titleColor: "yellow",
          background: "#f0ad4e",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // إضافة العنصر إلى مصفوفة tabledata
        tabledata.push(table);

        // تحويل المصفوفة إلى نص JSON وتخزينها في localStorage
        localStorage.setItem("addcort", JSON.stringify(tabledata));

        // عرض رسالة النجاح
        Swal.fire({
          icon: "success",
          title: "The product has been added successfully",
          background: "rgb(146, 218, 104)",
          showConfirmButton: false,
          timer: 1500,
          titleColor: "#ffffff",
          iconColor: "#5cb85c",
        });
      }
    });
  });
}

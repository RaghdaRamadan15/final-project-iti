let datamen;
let datachildern;
let datawomen;
document.addEventListener("DOMContentLoaded", function () {
  getdata();
  getdata2();
  getdata3();
});

async function getdata() {
  try {
    // حاول استرجاع البيانات من localStorage
    let dataMen = JSON.parse(localStorage.getItem("itemsMen"));

    // تحقق مما إذا كانت البيانات موجودة في localStorage
    if (!dataMen || dataMen.length === 0) {
      // إذا لم تكن البيانات موجودة، جلبها من ملف JSON
      let respons = await fetch("http://localhost:5500/data.json");
      let data = await respons.json();

      // خزن البيانات في localStorage
      datamen = data.sectionMen;
      localStorage.setItem("itemsMen", JSON.stringify(datamen));
      dataMen = datamen;
    } else {
      datamen = dataMen;
    }

    // عرض البيانات
    display("#men tbody", datamen);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getdata2() {
  try {
    let dataChildern = JSON.parse(localStorage.getItem("itemChildern"));
    if (!dataChildern || dataChildern.length == 0) {
      let respons = await fetch("http://localhost:5500/childern.json");
      let data = await respons.json();
      datachildern_section = data.childern_section;
      localStorage.setItem(
        "itemChildern",
        JSON.stringify(datachildern_section)
      );
      dataChildern = datachildern_section;
    } else {
      datachildern = dataChildern;
    }
    display("#childern tbody", datachildern);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getdata3() {
  try {
    let dataWomen = JSON.parse(localStorage.getItem("itemwomen"));
    if (!dataWomen || dataWomen.length == 0) {
      let respons = await fetch("http://localhost:5500/women.json");
      let data = await respons.json();
      datawomen = data.womensection;
      localStorage.setItem("itemwomen", JSON.stringify(datawomen));
      dataWomen = datawomen;
    } else {
      datawomen = dataWomen;
    }

    display("#women tbody", datawomen);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function display(id, datas) {
  const tableBody = document.querySelector(id);
  tableBody.innerHTML = ""; // مسح البيانات الموجودة في tbody
  let index = 0;
  for (const data of datas) {
    let index2 = 0;
    data.forEach((element) => {
      tableBody.innerHTML += `
      <tr>
        <td>
            <img
              src="${element.imag}"
              alt=""
              height="70px"
            />
          </td>
        <td class="elementId">${element.ID}</td>
        <td>${element.Category}</td>
        <td>${element.Name}</td>
        <td>${element.price}</td>
        <td>${element.Description}</td>
        <td>${element.color}</td>
        <td>${element.size}</td>
        <td>${element.weigh}</td>
        <td>${element.temperature}</td>
       <td>
        <button id="edit-button" class="circular" onclick="editButton('${id}', ${index}, ${index2} )" style="background-color: rgb(0, 174, 255); color: white">
            <a href="update.html" style=" text-decoration: none;"><span class="material-symbols-outlined">edit</span></a>
        </button>
        
    </td>

        <td class="del">
          <button id="delete-btn" class="circular button-delete" onclick="deleteButton('${id}', ${index}, ${index2})" style="background-color: red; color: white">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </td>
      </tr>`;
      index2++;
    });
    index++;
  }
}

function deleteButton(tableId, i, j, value) {
  let data;
  let localStorageKey;

  if (tableId === "#men tbody") {
    data = datamen;
    localStorageKey = "itemsMen";
  } else if (tableId === "#childern tbody") {
    data = datachildern;
    localStorageKey = "itemChildern";
  } else if (tableId === "#women tbody") {
    data = datawomen;
    localStorageKey = "itemwomen";
  }
  if (data) {
    data[i].splice(j, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    display(tableId, data);
  }
}

function editButton(tableId, i, j) {
  let data;
  let localStorageKey;

  if (tableId === "#men tbody") {
    data = datamen;
    localStorageKey = "itemsMen";
  } else if (tableId === "#childern tbody") {
    data = datachildern;
    localStorageKey = "itemChildern";
  } else if (tableId === "#women tbody") {
    data = datawomen;
    localStorageKey = "itemwomen";
  }
  let updatable = data[i][j];

  // تخزين البيانات في localStorage
  localStorage.setItem("editData", JSON.stringify(updatable));
  localStorage.setItem("editTableId", tableId);
  localStorage.setItem("editIndex", i);
  localStorage.setItem("editIndex2", j);
}

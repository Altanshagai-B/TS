var uiController = (function () {
  var DOMstrings = {
    inputSAP: ".search__field",
    searchBtn: ".search__btn",
    nameP: ".name",
    nameCom: ".companyName",
    incomeList: ".list",
    loaderDiv: ".results",
  };

  return {
    medee: function (a) {
      // a ajiltnii surgaltiin medeelel massive bdlaar irj bga
      this.a = a;
      console.log(a);
      if (a.length == 0) {
        const loader = document.querySelector(".loader");
        if (loader) loader.parentElement.removeChild(loader);
        document.querySelector(DOMstrings.nameCom).textContent =
          "Илэрц олдсонгүй...";
        console.log("hooson utga");
      } else {
        document.querySelector(DOMstrings.nameP).textContent = a[0].Employee;
        document.querySelector(DOMstrings.nameCom).textContent = a[0].Vendor;
        console.log(a[0].Employee);
        console.log(a);
        //   for (const { Qualification } of a) {
        //     console.log(Qualification);
        //   }2
        var html = "",
          list = "";
        list = DOMstrings.incomeList;
        for (let i = 0; i < a.length; i++) {
          const loader = document.querySelector(".loader");
          if (loader) loader.parentElement.removeChild(loader);
          document.querySelector(DOMstrings.nameP).textContent = a[0].Employee;
          document.querySelector(DOMstrings.nameCom).textContent = a[0].Vendor;
          var today = new Date();
          var n = today.toLocaleDateString();
          var expiryDate = new Date(a[i].ExpiryDate);
          var dc = expiryDate.toLocaleDateString();
          var expiryTime = expiryDate.getTime();
          var todayTime = today.getTime();

          console.log(expiryTime);
          console.log(todayTime);
          var z = todayTime - expiryTime;
          var zz = z + 7776000000;
          console.log(zz);
          console.log(z / 86400000);
          console.log(n);
          if (z > 0) {
            console.log("Hugatsaaa duussan!!!!!!");
            html =
              '<div id="delete" class="list_duussan clearfix"><div class="qualification">$$qua$$</div><div class="right clearfix"><div class="expiry_date">$$date$$</div></div></div>';
            html = html.replace("$$qua$$", a[i].Qualification);
            html = html.replace("$$date$$", a[i].ExpiryDate);
            document.querySelector(list).insertAdjacentHTML("beforeend", html);
          } else {
            if (zz > 0) {
              html =
                '<div id="delete" class="list_duusaj clearfix"><div class="qualification">$$qua$$</div><div class="right clearfix"><div class="expiry_date">$$date$$</div></div></div>';
              html = html.replace("$$qua$$", a[i].Qualification);
              html = html.replace("$$date$$", a[i].ExpiryDate);
              document
                .querySelector(list)
                .insertAdjacentHTML("beforeend", html);
              console.log("baga");
            } else {
              html =
                '<div id="delete" class="list_heviin clearfix"><div class="qualification">$$qua$$</div><div class="right clearfix"><div class="expiry_date">$$date$$</div></div></div>';
              html = html.replace("$$qua$$", a[i].Qualification);
              html = html.replace("$$date$$", a[i].ExpiryDate);
              document
                .querySelector(list)
                .insertAdjacentHTML("beforeend", html);
              console.log("baga");
            }
          }
        }
      }
    },

    getInput: function () {
      return {
        sap: document.querySelector(DOMstrings.inputSAP).value,
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

var financeController = (function () {})();

// surgaltiin medeelel excel file naas unshij hereglegchiin oruulsan SAP aar shuugeed massive bdlaar butsaana
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //SAP dugaar shalgah
    var sapP = uiController.getInput().sap;

    // excel file unshih heseg
    var url = "./test.xlsx";

    var oReq = new XMLHttpRequest();

    oReq.open("GET", url, true);

    oReq.responseType = "arraybuffer";

    oReq.onload = function (e) {
      var arraybuffer = oReq.response;

      /* convert data to binary string */

      var data = new Uint8Array(arraybuffer);

      var arr = new Array();

      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);

      var bstr = arr.join("");

      /* Call XLSX */

      var workbook = XLSX.read(bstr, { type: "binary" });

      /* DO SOMETHING WITH workbook HERE */

      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */

      var worksheet = workbook.Sheets[first_sheet_name];
      var dataT = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      var result = dataT.filter((x) => x.SAP === sapP);
      console.log(result);
      uiController.medee(result);
    };

    oReq.send();
  };

  var setupEventListeners = function () {
    var DOM = uiController.getDOMstrings();
    var html1, loader;
    loader = DOM.loaderDiv;
    html1 =
      '<div class="loader"><svg><use href="icons.svg#icon-cw"</use></svg></div>';
    document
      .querySelector(DOM.searchBtn)
      .addEventListener("click", function () {
        var sapCheck = uiController.getInput().sap;
        if (isNaN(sapCheck)) {
          window.alert("Зөвхөн тоо оруулна уу!!!");
        } else {
          if (sapCheck.length < 7) {
            window.alert("САП дугаар алдаатай байна!!!");
          } else {
            if (sapCheck.length > 7) {
              window.alert("САП дугаар алдаатай байна!!!");
            } else {
              document.getElementById("nemeh").innerHTML = "";
              document.querySelector(DOM.nameP).textContent = "";
              document.querySelector(DOM.nameCom).textContent = "";
              document
                .querySelector(loader)
                .insertAdjacentHTML("beforeend", html1);
              ctrlAddItem();
            }
          }
        }
      });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        var sapCheck = uiController.getInput().sap;
        if (isNaN(sapCheck)) {
          window.alert("Зөвхөн тоо оруулна уу!!!");
        } else {
          if (sapCheck.length < 7) {
            window.alert("САП дугаар алдаатай байна!!!");
          } else {
            if (sapCheck.length > 7) {
              window.alert("САП дугаар алдаатай байна!!!");
            } else {
              document.getElementById("nemeh").innerHTML = "";
              document.querySelector(DOM.nameP).textContent = "";
              document.querySelector(DOM.nameCom).textContent = "";
              document
                .querySelector(loader)
                .insertAdjacentHTML("beforeend", html1);
              ctrlAddItem();
            }
          }
        }
      }
    });
  };

  return {
    init: function () {
      console.log("Application started...");
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();

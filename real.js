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
        html =
          '<div id="delete" class="list_view clearfix"><div class="qualification">$$qua$$</div><div class="right clearfix"><div class="expiry_date">$$date$$</div></div>';
        html = html.replace("$$qua$$", a[i].Qualification);
        html = html.replace("$$date$$", a[i].ExpiryDate);
        const loader = document.querySelector(".loader");
        if (loader) loader.parentElement.removeChild(loader);
        document.querySelector(list).insertAdjacentHTML("beforeend", html);
        document.querySelector(DOMstrings.nameP).textContent = a[0].Employee;
        document.querySelector(DOMstrings.nameCom).textContent = a[0].Vendor;
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
    var sapP = uiController.getInput().sap;
    var url = "/test.xlsx";

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
        document.getElementById("nemeh").innerHTML = "";
        document.querySelector(DOM.nameP).textContent = "";
        document.querySelector(DOM.nameCom).textContent = "";
        document.querySelector(loader).insertAdjacentHTML("beforeend", html1);
        ctrlAddItem();
      });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        document.getElementById("nemeh").innerHTML = "";
        document.querySelector(DOM.nameP).textContent = "";
        document.querySelector(DOM.nameCom).textContent = "";
        document.querySelector(loader).insertAdjacentHTML("beforeend", html1);
        ctrlAddItem();
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

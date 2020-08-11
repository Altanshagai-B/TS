// Ð”ÑÐ»Ð³ÑÑ†Ñ‚ÑÐ¹ Ð°Ð¶Ð¸Ð»Ð»Ð°Ñ… ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»Ð»ÐµÑ€
var uiController = (function () {
  var DOMstrings = {
    inputSAP: ".search__field",
    searchBtn: ".search__btn",
  };

  return {
    medee: function (medeeList) {
      this.medeeList = medeeList;
      console.log(medeeList);
    },

    //format

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

// tsalin tsootsooloh
var financeController = (function () {})();

// tsalin bodoh
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
    // gartOlgoh = niitTsalin - nd - haoat - uridchilgaa;
  };

  var setupEventListeners = function () {
    var DOM = uiController.getDOMstrings();

    document
      .querySelector(DOM.searchBtn)
      .addEventListener("click", function () {
        console.log("start");
        ctrlAddItem();
      });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
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

var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
var xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();

xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        // 加上 var 宣告變數
        var dataset = JSON.parse(this.responseText);
        addNewData(dataset);
    }
};

function addNewData(dataset) {
    var myTable = document.getElementById("csie");
    dataset.forEach(function(data, index) {
        var row = myTable.insertRow(-1);
        row.insertCell(0).innerHTML = data['title'];
        
        // 加上安全檢查，確保 showInfo[0] 存在
        if (data['showInfo'] && data['showInfo'].length > 0) {
            row.insertCell(1).innerHTML = data['showInfo'][0]['location'];
            row.insertCell(2).innerHTML = data['showInfo'][0]['price'];
        } else {
            row.insertCell(1).innerHTML = "暫無資訊";
            row.insertCell(2).innerHTML = "-";
        }
    }); 
}

// 補上刪除資料的函數 (對應 HTML 的 del0ldData)
function del0ldData() {
    var myTable = document.getElementById("csie");
    // 保留第一列標題，刪除其餘所有列
    while (myTable.rows.length > 1) {
        myTable.deleteRow(1);
    }
}
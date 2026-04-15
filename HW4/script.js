var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
var allData = [];      // 儲存原始所有資料
var filteredData = []; // 儲存搜尋過濾後的資料
var currentPage = 1;   // 目前頁碼
const itemsPerPage = 10; // 每頁顯示 10 筆

var xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();

xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        allData = JSON.parse(this.responseText);
        filteredData = allData; // 初始狀態下，過濾後的資料等於全部資料
        renderTable();
    }
};

// 渲染表格的核心函數
function renderTable() {
    var tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // 清空現有表格內容

    // 計算分頁範圍
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var pageData = filteredData.slice(startIndex, endIndex);

    // 填入資料
    pageData.forEach(function(data) {
        var row = tableBody.insertRow(-1);
        row.insertCell(0).innerHTML = data['title'];
        
        if (data['showInfo'] && data['showInfo'].length > 0) {
            row.insertCell(1).innerHTML = data['showInfo'][0]['location'];
            row.insertCell(2).innerHTML = data['showInfo'][0]['price'];
        } else {
            row.insertCell(1).innerHTML = "暫無資訊";
            row.insertCell(2).innerHTML = "-";
        }
    });

    updatePageInfo();
}

// 更新頁碼資訊顯示
function updatePageInfo() {
    var totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    document.getElementById("pageDisplay").innerText = `第 ${currentPage} / ${totalPages} 頁`;
    
    // 更新跳頁輸入框的限制與目前數值
    var pageInput = document.getElementById("pageInput");
    pageInput.max = totalPages;   // 設定最大值為總頁數
    pageInput.value = currentPage; // 顯示目前頁碼
}

// 新增：直接跳轉頁碼函數
function jumpToPage() {
    var pageInput = document.getElementById("pageInput");
    var targetPage = parseInt(pageInput.value);
    var totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

    // 驗證輸入的頁碼是否合法
    if (targetPage >= 1 && targetPage <= totalPages) {
        currentPage = targetPage;
        renderTable();
    } else {
        alert("請輸入有效的頁碼！");
        pageInput.value = currentPage; // 復原為目前的頁碼
    }
}

// 搜尋處理函數 (對應 Onchange event)
function handleSearch() {
    var keyword = document.getElementById("searchInput").value.trim().toLowerCase();
    
    // 只呈現和關鍵字相關的資料
    filteredData = allData.filter(function(item) {
        return item.title.toLowerCase().includes(keyword);
    });

    currentPage = 1; // 搜尋後回到第一頁
    renderTable();
}

// 上一頁按鈕邏輯
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

// 下一頁按鈕邏輯
function nextPage() {
    var totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}
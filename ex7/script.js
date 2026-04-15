var container = document.getElementById('container');
var counter = 0; // 錯誤計數器

window.onload = function() {
    // 初始生成 1~3 個字元
    container.textContent = add_new_chars(3, true); 
}

function add_new_chars(x, b = true) {
    var n = x;
    if(b) {
        // b 為 true 時，隨機生成 1 到 x 個字元
        n = Math.floor(Math.random() * x) + 1;
    }
    var str = '';
    for(let i = 0; i < n; i++) {
        str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return str;
};

window.addEventListener("keyup", function(e) {
    var currentText = container.textContent;
    
    // 如果畫面上已經沒字了，直接補字並跳出，防止後續報錯
    if (currentText.length === 0) {
        container.textContent = add_new_chars(3, true);
        return;
    }

    var firstone = currentText.substring(0, 1);

    if(e.key === firstone) {
        // --- 情況 A：打對了 ---
        // 1. 移除第一個字元
        var remainingText = currentText.substring(1);
        
        // 2. 檢查移除後是否變空了
        if (remainingText === '') {
            // 如果變空，重新生成 1~3 個字元
            container.textContent = add_new_chars(3, true);
        } else {
            // 如果還有剩，就更新為剩餘的字元
            container.textContent = remainingText;
        }
        
        // 選項：打對時可以重置錯誤計數
        counter = 0; 

    } else {
        // --- 情況 B：打錯了 ---
        counter++; 
        
        if(counter >= 3) {
            // 打錯三次後，額外增加 3 個字元（這裡設為 false 確保固定加 3 個）
            container.textContent += add_new_chars(3, false);
            counter = 0; // 重置計數器
        }
    }
});
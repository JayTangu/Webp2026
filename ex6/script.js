var container = document.getElementById('container');

window.onload = function() {
    // 初始化時，我們強制產生 1~2 個字，避免畫面空白
    init_game(); 
};

window.addEventListener("keyup", function(e) {
    var str = container.textContent;

    // 加上 .toLowerCase() 可以避免大小寫打錯的問題（選用）
    if (str.length > 0 && e.key.toLowerCase() === str.charAt(0).toLowerCase()) {
        container.textContent = str.substring(1);
        add_new_chars();
    } else {
        console.log("打錯囉！目前目標是:", str.charAt(0), "你按的是:", e.key);
    }
});

function init_game() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    // 第一次強迫產生 1 或 2 個字
    var numToAdd = Math.floor(Math.random() * 2) + 1; 
    var newChars = "";
    for (var i = 0; i < numToAdd; i++) {
        newChars += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    container.textContent = newChars;
}

function add_new_chars() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var numToAdd = Math.floor(Math.random() * 3); // 0~2 個
    var newChars = "";
    for (var i = 0; i < numToAdd; i++) {
        newChars += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    container.textContent += newChars;

    // 額外保險：如果消到最後沒字了，強迫補一個字，不然遊戲會玩不下去
    if (container.textContent.length === 0) {
        add_new_chars();
    }
}
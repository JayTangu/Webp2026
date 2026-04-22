// 1. 取得照片清單的 URL (講義 Page 61)[cite: 3]
var imglist_Url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&nojsoncallback=1';

function getimg() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', imglist_Url, true);
    xhr.send();
    xhr.onload = function () {
        var data = JSON.parse(this.responseText);
        // 抓到清單後，傳給 add_new_img 處理
        add_new_img(data.photos.photo);
    }
}

function add_new_img(dataset) {
    var gal = document.getElementById("gallery");
    gal.innerHTML = ""; // 清空內容

    // 針對清單中的前幾張照片，分別去抓取它們的尺寸
    dataset.forEach(function(item) {
        // 2. 取得個別照片尺寸的 URL (講義 Page 62)[cite: 3]
        // 注意：這裡要把講義中的 photo_id 替換成動態的 item.id
        var img_size_Url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ca370d51a054836007519a00ff4ce59e&photo_id=' + item.id + '&format=json&nojsoncallback=1';

        var sizeXhr = new XMLHttpRequest();
        sizeXhr.open('GET', img_size_Url, true);
        sizeXhr.send();
        sizeXhr.onload = function() {
            var sizeData = JSON.parse(this.responseText);
            // 這裡從回傳的 sizes 中挑選一項（例如第 4 個尺寸 "Small 320"）
            var imgSource = sizeData.sizes.size[4].source; 
            
            var img = document.createElement("img");
            img.setAttribute("src", imgSource);
            gal.appendChild(img);
        };
    });
}
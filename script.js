let title = document.querySelector('h1').textContent;

fetch("ogp_template.png",{
    method: "GET",
}).then(response => response.blob())
.then(img => {
    console.log(img);
    //imgにtitleを埋め込む
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let imgObj = new Image();
    imgObj.src = URL.createObjectURL(img);
    imgObj.onload = function(){
        canvas.width = imgObj.width;
        canvas.height = imgObj.height;
        ctx.drawImage(imgObj, 0, 0);

        let fontSize = 60;
        ctx.font = `bold ${fontSize}px 'Arial'`;
        ctx.fillStyle = "black";
        ctx.textAlign = "center";

        //画像の中央にtitleを描画
        //h1の先頭から32文字までを取得
        let titleText = title.slice(0,31);
        //titleが32文字以上の場合は...を付ける
        if(title.length > 32){
            titleText += "...";
        }
        if(titleText.length > 16){
            ctx.fillText(titleText.slice(0,16), canvas.width / 2, canvas.height / 2 - (fontSize * 0.75));
            ctx.fillText(titleText.slice(16), canvas.width / 2, canvas.height / 2 + (fontSize * 0.75));
        }else{
            ctx.fillText(titleText, canvas.width / 2, canvas.height / 2);
        }
        
        let exportOgp = document.getElementById("exportOgp");
        exportOgp.appendChild(canvas);

        

        //ogp:titleを設定
        let ogpTitle = document.createElement("meta");
        ogpTitle.setAttribute("property", "og:title");
        ogpTitle.setAttribute("content", title);
        document.head.appendChild(ogpTitle);

        //ogp:urlを設定
        let ogpUrl = document.createElement("meta");
        ogpUrl.setAttribute("property", "og:url");
        ogpUrl.setAttribute("content", location.href);
        document.head.appendChild(ogpUrl);

        //作成したcanvasを、headerのogpに設定
        let ogpImage = document.createElement("meta");
        ogpImage.setAttribute("property", "og:image");
        ogpImage.setAttribute("content", canvas.toDataURL("image/png"));
        document.head.appendChild(ogpImage);
    }
});
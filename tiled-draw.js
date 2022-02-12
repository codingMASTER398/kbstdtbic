const tiledDraw = function(canvasId){

    const canvas = document.getElementById(canvasId)
    const ctx = canvas.getContext("2d");
    const imagesLoadedBefore = {}

    const imageAt=((href,x,y,sizex,sizey)=>{
        if(imagesLoadedBefore[href]){
            ctx.drawImage(imagesLoadedBefore[href], x, y, sizex, sizey);
        }else{
            var img = new Image();
            img.addEventListener('load', function() {
                ctx.drawImage(img, x, y, sizex, sizey);
                imagesLoadedBefore[href] = img
            }, false);
            img.src = href
        }
    })

    return {
        draw:function(todo){
            const data=JSON.parse(JSON.stringify(todo)) //Make a copy

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            imgDefaultSize = data.camera.zoom*50

            data.camera.x = (data.camera.x*imgDefaultSize)*(-1)
            data.camera.y = (data.camera.y*imgDefaultSize)*(-1)

            for (let i = 0; i < data.layers.length; i++) {
                const layer = data.layers[i];
                layer.forEach(element => {
                    element.x = (element.x*imgDefaultSize)
                    element.y = (element.y*imgDefaultSize)

                    imageAt(element.img,data.camera.x+element.x,data.camera.y+element.y,imgDefaultSize,imgDefaultSize)
                });
            }
        }
    }
}
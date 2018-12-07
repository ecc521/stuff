function GetId(n){return document.getElementById(n)}

GetId("input").addEventListener("change", genimg)

async function genimg() {
    var elem = GetId("input")
    var files = elem.files
    
    var images = []
    for (var i=0;i<files.length;i++) {
        //Lets make sure the user only gave us images...
        if (files[i].type.indexOf("image/") === 0) {
            images.push(files[i])
        }
    }
    
    var dataurls = []
    
    for (var i=0;i<images.length;i++) {
    var img = await createImageBitmap(images[i])
    
    var canvas = document.getElementById("canvas");
        
    canvas.hidden = ""
        
    canvas.height = img.height
    canvas.width = img.width
    
    var context = canvas.getContext("2d");
    
    //Draw the image, flipped horizontally
    context.save();
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(img, 0, 0);
    context.restore();
    
    dataurls.push(canvas.toDataURL(images[i].type));
    }
    console.log(dataurls)
    
    
    
    var zip = new JSZip();
    var folder = zip.folder("Horizontally Flipped Images");
    console.log(dataurls.length)
    for (var c=0;c<dataurls.length;c++) {
    var base64String = dataurls[c].slice(dataurls[c].indexOf("base64,")+7);
    folder.file("hflipped-" + images[c].name, base64String, {base64: true});
    }
    
    var content = await folder.generateAsync({
        type:"blob",
        compression: "DEFLATE",
        compressionOptions: {
            level: 9
        }
    })
    
    canvas.hidden = "hidden"
    
    var link = document.createElement("a");
    document.body.appendChild(link);

    link.download = "flippedimages.zip"
    link.href = URL.createObjectURL(content);
    link.click();
    
    document.body.removeChild(link);
    
    
}

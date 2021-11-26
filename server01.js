var express = require("express")
var app = express()
const PORT = 5000;
var formidable = require('formidable');
var hbs = require('express-handlebars');

//nasłuch na określonym porcie
var path = require("path");
const { pbkdf2 } = require("crypto");
var context={
    pliki:[]
}
var idpliku= 1;
app.get("/", function (req, res) {
    res.render('upload.hbs');   // nie podajemy ścieżki tylko nazwę pliku
    // res.render('index.hbs', { layout: "main.hbs" }); // opcjonalnie podajemy konkretny layout dla tego widoku
})
app.get("/upload", function (req, res) {
    res.render('upload.hbs');   // nie podajemy ścieżki tylko nazwę pliku
    // res.render('index.hbs', { layout: "main.hbs" }); // opcjonalnie podajemy konkretny layout dla tego widoku
})
app.post("/filemanager", function (req, res) {
    //console.log(context)
    let form = formidable({});

    form.keepExtensions = true   // zapis z rozszerzeniem pliku
    form.multiples = true
    form.uploadDir = __dirname + '/static/upload/'       // folder do zapisu zdjęcia

    form.parse(req, function (err, fields, files) {
   // console.log(files.imageupload.length);
    if(files.imageupload.length==undefined){
        //var picture = __dirname +"/static/gfx/"
        var picture = "/gfx/"
       // console.log(files.imageupload.type);
      if(files.imageupload.type=="application/pdf"){
          picture+="pdf.jpg"
      }
      else if(files.imageupload.type=="video/msvideo"){
          picture+="avi.jpg"
      }
      else if(files.imageupload.type=="text/plain"){
          picture+="txt.jpg"
      }
  
      else if(files.imageupload.type=="application/x-zip-compressed"){
          picture+="zip.jpg"
      }
      else if(files.imageupload.type=="application/msword"){
          picture+="doc.jpg"
      }
      else if(files.imageupload.type=="image/jpeg"){
          picture+="jpg.jpg"
      }
      else if(files.imageupload.type=="audio/x-mpeg.mp3"){
          picture+="mp3"
      }
      else if(files.imageupload.type=="image/png"){
          picture+="png.jpg"
      }
      else if(files.imageupload.type=="application/vnd.ms-excel"){
          picture+="xls.jpg"
      }
      else if(files.imageupload.type=="text/csv"){
          picture+="csv.jpg"
      }
      else if(files.imageupload.type=="application/vnd.ms-powerpoint"){
          picture+="ppt.jpg"
      }
      else if(files.imageupload.type=="application/vnd.rar"){
          picture+="rar.jpg"
      }
      else{
          picture+="pytajnik.jpg"
      }
   var tab={
      id: idpliku,
      name:files.imageupload.name,
      obraz: picture,
      size:files.imageupload.size,
      type:files.imageupload.type,
      path:files.imageupload.path,
      data:Date.parse(files.imageupload.lastModifiedDate)
  }
 // console.log(tab)
       context.pliki.push(tab)
      idpliku++;  
     // console.log(context)
    }
  for(var i=0 ; i<files.imageupload.length; i++){
     // var picture = __dirname +"/static/gfx/"
     var picture =`/gfx/`
      //console.log(files.imageupload[i].type);
    if(files.imageupload[i].type=="application/pdf"){
        picture+="pdf.jpg"
    }
    else if(files.imageupload[i].type=="video/msvideo"){
        picture+="avi.jpg"
    }
    else if(files.imageupload[i].type=="text/plain"){
        picture+="txt.jpg"
    }

    else if(files.imageupload[i].type=="application/x-zip-compressed"){
        picture+="zip.jpg"
    }
    else if(files.imageupload[i].type=="application/msword"){
        picture+="doc.jpg"
    }
    else if(files.imageupload[i].type=="image/jpeg"){
        picture+="jpg.jpg"
    }
    else if(files.imageupload[i].type=="audio/x-mpeg.mp3"){
        picture+="mp3"
    }
    else if(files.imageupload[i].type=="image/png"){
        picture+="png.jpg"
    }
    else if(files.imageupload[i].type=="application/vnd.ms-excel"){
        picture+="xls.jpg"
    }
    else if(files.imageupload[i].type=="text/csv"){
        picture+="csv.jpg"
    }
    else if(files.imageupload[i].type=="application/vnd.ms-powerpoint"){
        picture+="ppt.jpg"
    }
    else if(files.imageupload[i].type=="application/vnd.rar"){
        picture+="rar.jpg"
    }
    else{
        picture+="pytajnik.jpg"
    }
 var tab={
    id: idpliku,
    name:files.imageupload[i].name,
    obraz: picture,
    size:files.imageupload[i].size,
    type:files.imageupload[i].type,
    path:files.imageupload[i].path,
    data: Date.parse(files.imageupload[i].lastModifiedDate)
}
//console.log(tab)
     context.pliki.push(tab)
    idpliku++;  
   // console.log(context)
  }

        //console.log(files);

       
        
     res.render('filemanager.hbs', context); 
        
    });
  
     

})
app.get("/filemanager", function (req, res) {
  if(req.query.a=="del"){
    
      for(var j=0; j<idpliku-1; j++){
         if(context.pliki[j]!=undefined){
  if(req.query.i==context.pliki[j].id){
context.pliki.splice(j,1);
          }
         }
       
      }
      res.render('filemanager.hbs', context); 
  }
  else if(req.query.a=="inf"){
    
    for(var j=0; j<idpliku-1; j++){
       if(context.pliki[j]!=undefined){
if(req.query.i==context.pliki[j].id){
res.render('info.hbs', context.pliki[j])
        }
       }
     
    }
}
else if(req.query.a=="dow"){
    
    for(var j=0; j<idpliku-1; j++){
       if(context.pliki[j]!=undefined){
if(req.query.i==context.pliki[j].id){
    const file = context.pliki[j].path
    res.download(file); // Set disposition and send it.
        }
       }
     
    }
}
else{
    res.render('filemanager.hbs', context); 
}
     

})
app.get("/info", function (req, res) {
    res.render('info.hbs');   // nie podajemy ścieżki tylko nazwę pliku
    // res.render('index.hbs', { layout: "main.hbs" }); // opcjonalnie podajemy konkretny layout dla tego widoku
})
app.get("/reset", function (req, res) {
    
    context={
        pliki:[]
    }
    idpliku=1;
    res.render('filemanager.hbs');   // nie podajemy ścieżki tylko nazwę pliku
    // res.render('index.hbs', { layout: "main.hbs" }); // opcjonalnie podajemy konkretny layout dla tego widoku
})
app.get("/login", function (req, res) {
    res.render('login.hbs');   // nie podajemy ścieżki tylko nazwę pliku
    // res.render('index.hbs', { layout: "main.hbs" }); // opcjonalnie podajemy konkretny layout dla tego widoku
})


app.use(express.static(__dirname + '/static'));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)

})

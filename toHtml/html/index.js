const MarkdownIt = require("markdown-it");
const fs = require("fs");
const path = require("path");
 let md = new MarkdownIt();



class toHtml {
    constructor(){
       
    }
    readFile(path){
       return fs.readFileSync(path,"utf-8")
    }
    tostring(text){
      return  md.render(text)
    }
    tohtml(htmlpath,mdpath){
       this.writehtml(htmlpath,this.tostring(this.readFile(mdpath)))
    }
    writehtml(path,html){
        fs.writeFileSync(path,html,"utf-8")
    }

}
var a = new toHtml()

a.tohtml(__dirname+"/index.html",path.join(__dirname,"../md/index.md"))
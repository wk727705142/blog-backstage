var express = require('express');
var router = express.Router();
var methods = require("../mysql/index");
let {select,insert} = methods
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.set("Access-Control-Allow-Origin","*")
  res.json({type:"GET"});
});

router.post('/login', function(req, res, next) {
  res.set("Access-Control-Allow-Origin","*");
  let {name,pwd} = req.body;
  select("select * from users where user_name=?",name).then((data)=>{
      if(data.rows[0].user_password === pwd){
        console.log(data.rows[0].user_level)
        
        // if(data.rows[0].user_level == 0){ //进入管理员判断
        
        //   select("select * from level where user_level=?",0).then((response)=>{ //获取管理员对应数据

        //      res.json({status:"ok",aside:response});
        //   })
          
        // }
        res.json({status:"ok",user_level:data.rows[0].user_level});
      }else{
        res.json({status:"no"});
      }
      
  },(err)=>{
      res.json({status:"err"});
  })
  
});

router.post("/zhuye",function(req,res,next){
  res.set("Access-Control-Allow-Origin","*");
  let {id} = req.body;
  console.log(req.body)
  console.log(id);
  console.log("请求成功")
  select("select * from level where user_level=?",id).then((data)=>{
        let asidearr = data.rows
       
        function fn(arr,id){
          let obj = {};
          let userarr = arr.filter(item=>item.user_level===Number(id));
         
          obj.show_name = userarr.find(item=>item.level_name==="show_name").level_value
          obj.level = [];
          userarr.forEach(item=>{
          if(item.group_name===null){return}
          if(obj.level.length===0){
              obj.level.push({
                  group_name:item.group_name,
                  sub_name:[{name:item.sub_name,path:item.path}]
              })
              return
          }
          let commonGroup = obj.level.find(val=>item.group_name===val.group_name);
              if(commonGroup){
                  commonGroup.sub_name.push({name:item.sub_name,path:item.path});
              }else{
                  obj.level.push({
                      group_name:item.group_name,
                      sub_name:[{name:item.sub_name,path:item.path}]
                  })
              }
            })
            return obj
        }
     var arr = fn(asidearr,id)
        res.json({status:"ok",aside:arr})
  })
})

router.get("/yibiao",function(req,res,next){
    console.log("仪表盘请求成功")
    res.set("Access-Control-Allow-Origin","*");
    select("select * from yibiaopan").then((data)=>{
        console.log(data)
        let arr = data.rows;
        function yibiaodata(arr){
            let newarr = []
            arr.forEach((item,index)=>{
    
                if(item.showname==="showname"){
                    newarr.push({name:item.name,list:[]})
                    return 
                }
                let bol4 = newarr.find(val=>val.name===item.name);
                   if(bol4){
                        bol4.list.push(item.cont_one)
                   }
              
                
            })
            return newarr
        }
        let yibiao = yibiaodata(arr)
        
        res.json(yibiao)
    })
})
module.exports = router;

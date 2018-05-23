const mysql = require("mysql");


function createconnection(){
    const connection = mysql.createConnection({
        url:"localhost",
        port:3306,
        user:"root",
        password:"987654",
        database:"main"
    });
    return connection
}


// connection.query("select * from users",(err,rows)=>{
//     if(err) throw err
//     console.log(rows)
// })
let methods = {
    select(sql,query=[]){
        let connection = createconnection();
           return new Promise((reslove,reject)=>{
                connection.query(sql,query,(err,rows)=>{
                    if(err){
                        reject({msg:"查询错误",err,status:"no"})
                    }else{
                        reslove({msg:"查询成功",rows,status:"ok"})
                    }
                })
           })     
    },
    insert(sql,query=[]){
        let connection = createconnection();
        return new Promise((reslove,reject)=>{
             connection.query(sql,query,(err)=>{
                 if(err){
                     reject({msg:"插入失败",status:"no"})
                 }else{
                     reslove({msg:"插入成功",status:"ok"})
                 }
             })
        })     
    }
   
}



module.exports = methods


var body_parser= require('body-parser')

var  urlencodedParser=body_parser.urlencoded({extended:false})
var data=[
{
    item:'get milk'
},
{
    item:'walking dog'
},
{
    item:'footing'
}
]

module.exports=function(app){

    app.get('/todo',(req,res)=>{
        res.render('todo',{todos:data})

    })

    app.post('/todo',urlencodedParser,(req,res)=>{
        data.push(req.body)
        res.json(data)  

    })

    app.delete('/todo/:item',(req,res)=>{
        data=data.filter(function(todo){
            return todo.item.replace(/ /g,'-') !== req.params.item;
        }) ;       
        res.json(data);
    })
};
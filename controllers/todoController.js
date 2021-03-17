var body_parser= require('body-parser')
var mongoose= require('mongoose')
var  urlencodedParser=body_parser.urlencoded({extended:false})
mongoose.connect( "mmongodb+srv://HACHEM:Hachemfst.1@clusterhachem.4ao8v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true })

var todoSchema= new mongoose.Schema({item:String});

var Todo=mongoose.model('Todo',todoSchema);
var itemOne=Todo({item:'Hachem'}).save(function(err){
    if(err){
        throw err;
    }else{
        console.log("Ok : row saved");
    }

})


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
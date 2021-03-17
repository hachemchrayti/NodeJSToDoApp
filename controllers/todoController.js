var body_parser= require('body-parser')
var mongoose= require('mongoose')
var  urlencodedParser=body_parser.urlencoded({extended:false})

mongoose.connect( "mmongodb+srv://HACHEM:Hachemfst.1@clusterhachem.4ao8v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true })
var todoSchema= new mongoose.Schema({item:String});
var Todo=mongoose.model('Todo',todoSchema);
// var itemOne=Todo({item:'Hachem'}).save(function(err){
//     if(err){
//         throw err;
//     }else{
//         console.log("Ok : row saved");
//     }

// })


// var data=[
// {
//     item:'get milk'
// },
// {
//     item:'walking dog'
// },
// {
//     item:'footing'
// }
// ]

module.exports=function(app){

    app.get('/todo',(req,res)=>{
        //get Data from MongoDb and pass it to the view
        Todo.find({},function(err,data){
            if(err) throw err

            res.render('todo',{todos:data})
        })

    })

    app.post('/todo',urlencodedParser,(req,res)=>{
        //get data from the view and add it to MongDB
        new_todo=Todo(req.body).save(function(err,data){
            if(err) throw err;

            res.json(data)
        })
        
          

    })

    app.delete('/todo/:item',(req,res)=>{
        //delete the requested item from MondDB

        Todo.find({item:req.params.item.replace(/\-/g,' ')}).remove(function(err,data){
            if(err) throw err;

            res.json(data);
        })

      
        
    })
};
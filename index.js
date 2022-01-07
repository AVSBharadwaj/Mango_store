

var express=require('express')
var mongoose=require('mongoose')


const app=express();
const port=3080;

app.use(express.json());

app.use(express.static('public'));
app.use(express.urlencoded({extended: true }));


mongoose.connect("mongodb://localhost/EmployeeDB",{
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
var db=mongoose.connection;


app.get('/',(req,res)=>{
	res.set({
    		"Allow-access-Allow-Origin": "*",
 		 });
	return res.redirect("index.html");
});
app.post("/formFill",(req,res)=>{
	var name=req.body.name
	var email=req.body.email
	var reason=req.body.reason
	var phone=req.body.phone
	var city=req.body.city
	var state=req.body.state
	var address=req.body.address



	var data={
		name: name,
		reason: reason,
		email: email,
		phone: phone,
		city: city,
		state: state,
		address: address
	};
	db.collection("user").insertOne(data,(err,coll)=>{
		if(err) throw err;
		console.log("data inserted successfully");
		return res.redirect("formSub.html");
	});
});

app.listen(port,()=>{
	console.log(`succesfully listening at ${port}`);
});



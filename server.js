var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/mydb";
var bodyParser = require('body-parser')
var ExpressValidator = require('express-validator')
app.use(ExpressValidator())
var ejs = require('ejs')

MongoClient.connect(url, {useNewUrlParser: true},function(err, db)
{ if(!err)
  {
  var server =  app.listen(3005, function()
  {
  var port = server.address().port;
  console.log('student app listening on port 3005! go to http://localhost:%s',port);
  });
  
app.get('/',function(req,res)
    { 
      res.sendFile(__dirname + '/'+'exp1.html');
  });
  

app.get('/stud', function(req, res)
{
   	req.check('name','Name Should not be left blank.').notEmpty();
		req.check('usn','Usn Should not be left blank.').notEmpty();
		req.check('name','Name Should contain character only.').isAlpha();
		req.check('usn').matches(/1NT21MC0[0-9][0-9]/).withMessage('Please enter valid USN')
		var errors = req.validationErrors();
		if(errors){
			res.send(errors)
			return		
		}
		else{
      var dbo = db.db("student");
      var myobj= {
      USN :req.query.usn,
      Name:req.query.name,
      sex:req.query.sex,
      Semester:req.query.sem,
      college:req.query.college,
      adhar:req.query.adhar,
      pass:req.query.pass_no,
      account:req.query.bank_acc
};
dbo.collection("student").insertOne(myobj)
  res.send('<p>USN : '+req.query.usn+'</p><p>Name : '+req.query.name+'</p><p>Sex : '+req.query.sex+'</p><p>Semester : '+req.query.sem+'</p><p>College :'+req.query.college+'</p><p>Addhar No. : '+req.query.adhar+'</p><p>passport No. : '+req.query.pass_no+'</p><p> Bank Account No : '+req.query.bank_acc+'</p>');
}
});
}

else
db.close();
});

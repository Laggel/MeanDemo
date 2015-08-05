
var http = require('http');
var path = require('path');
var express = require('express');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'public/app')));
router.use('/bower_components', express.static(path.resolve(__dirname, 'public/bower_components')));

router.get('/values/:id', function(req,res){
	var values ={};
	values["1"] = [{"_id":"551572d18345c8823949eb2b","name":"Carlos Toribio Moya Martinez A veces Tengo Hambre"},
							  {"_id":"5515a04a8345c8823949eb3b","name":"Carlos Toribio"},
							  {"_id":"5515b862d8be1d1b4aba0127","name":"Carlos Toribio"},
							  {"_id":"5531132592e700df74992a2a","name":"Carlos Toribio 14","tmcode":"TM-001CAR"},
							  {"_id":"559d98112316bae80901828a","name":"Carlos Toribio","tmcode":"TM-003CAR"}];


	values["2"] = [{"_id":"551572d18345c8823949eb2b","name":"Marlos Toribio"},
							  {"_id":"55158b018345c8823949eb3a","name":"Marlos Toribio"},
							  {"_id":"5515a04a8345c8823949eb3b","name":"Marlos Toribio"},
							  {"_id":"5515a06cfc90914c3d05e611","name":"Marlos Toribio"}];

	res.json(values[req.params.id]);
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

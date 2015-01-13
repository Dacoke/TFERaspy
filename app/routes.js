module.exports = function(app){
	app.get('/', function(req, res) {
		var message = req.app.get('message');
        res.render('index.ejs', { message : message} ); // load the index.ejs file
    });
};
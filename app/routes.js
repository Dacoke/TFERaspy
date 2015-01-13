module.exports = function(app){
	app.get('/', function(req, res) {
        res.render('index.ejs', req.app.get('message')); // load the index.ejs file
    });
};
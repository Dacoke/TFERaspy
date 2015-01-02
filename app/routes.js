module.exports = function(){
	app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
};
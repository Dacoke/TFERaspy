module.exports = function(app, text){
	app.get('/', function(req, res) {
        res.render('index.ejs', text ); // load the index.ejs file
    });
};
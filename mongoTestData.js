var chance = require('chance').Chance();

var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/testing", function(err, db) {
  if(err) {
    console.log("Something went wrong!");
    console.log(err);
  } else {
	console.log("Successfully connected to db: ")
	// console.log(db)
  	var collection = db.collection('viewers')
  	var bulk = collection.initializeUnorderedBulkOp();
	var advertisements = ["_id1", "_id2", "_id3", "_id4", "_id5"]

	function Viewer() {
		this.female = chance.bool();
		this.start_date = chance.date({year: 2015})
		this.age = chance.integer({min: 5, max: 95});
		this.time_viewed = chance.integer({min: 1, max: 300});
		this.dwell_time = chance.integer({min: 1, max: 300});
		this.emotion = {}
		this.emotion.sad = chance.integer({min: 0, max: 100});
		this.emotion.angry = chance.integer({min: 0, max: 100});
		this.emotion.surprised = chance.integer({min: 0, max: 100});
		this.emotion.happy = chance.integer({min: 0, max: 100});
		this.device_id = chance.integer({min: 1, max: 4});
		this.advertisements = advertisements[chance.integer({min: 0, max: 9})]
	};


	for (var i = 0; i < 100000; i++) {
		var nextViewer = new Viewer()
		bulk.insert(nextViewer)
	};

	bulk.execute()

  }

});






/**
 * New node file
 */
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('mida', server, {safe: true});
db.open(function(err, db) {
    if (!err) {
        console.log("Connected to 'mida' database");
        getCurrentStatus(function(current){
        	if ( current === undefined ) {
        		db.collection('status', function(err, collection) {
        			collection.insert( {'mode':'none', 'date': new Date()}, {safe:true}, function(err, result) {});
    			});
        	} else {
        		console.log( "mode: " + current.mode + ", date: " + current.date + ", id: " + current._id);
        		updateCurrentStatus( current._id.toString(), 'hardstop', function(res) {
        			console.log( res );
        		});
        	}
        
        
        });
	}
});



getCurrentStatus = function( cb ) {
	db.collection('status', function(err, collection) {
		collection.find().toArray(function(err, items) {
			if (typeof items[0] !== undefined && items[0] !== null) {
            	cb( items[0] );
            }
        });
    });
}


updateCurrentStatus = function( id, mode, cb ) {
	db.collection('status', function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, 
			{ $set: { 'mode': mode, 'date': new Date() } }, 
			{safe:true}, function(err, result) {
	            if (err) {
	                console.log('Error updating status: ' + err);
	                cb({'error':'An error has occurred'});
	            } else {
	                cb('' + result + ' document(s) updated');
	                
	            }
        	});
    });
}

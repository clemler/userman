
/*
 * GET the main application page
 */
exports.index = function(req, res){
  res.render('index', { title: 'User Management' });
};


/*
 * GET users listing.
 */
exports.list = function(req, res){
  res.send(userList);
};


// Static list of our users
var userList = [{uid: 1, name: "Fred Flintstone", address: "1122 Bedrock", phone: "111-222-1234", email: "fred@bowler.com"},
                    {uid: 2, name: "Wilma Flintstone", address: "1122 Bedrock", phone: "111-222-1234", email: "wilma@bowler.com"},
                    {uid: 3, name: "Pebbles Flintstone", address: "1122 Bedrock", phone: "111-222-1234", email: "pebbles@bowler.com"},
                    {uid: 4, name: "Dino Flintstone", address: "1122 Bedrock", phone: "111-222-1234", email: "dino@bowler.com"},
                    {uid: 5, name: "Barney Rubble", address: "1133 Bedrock", phone: "111-222-6789", email: "barney@bowler.com"},
                    {uid: 6, name: "Betty Rubble", address: "1133 Bedrock", phone: "111-222-6789", email: "betty@bowler.com"},
                    {uid: 7, name: "Bam-Bam Rubble", address: "1133 Bedrock", phone: "111-222-6789", email: "bambam@bowler.com"}
];

var express = require('express');
var app = express();

function mySite() {
  return __dirname + "\\public";
  //return "C:\\Users\\dray\\Documents\\GitHub\\";
}

console.log('starting');
var dir2use = mySite();
console.log(dir2use);

app.use(express.static(dir2use));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

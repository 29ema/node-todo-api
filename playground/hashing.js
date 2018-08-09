const {SHA256}= require('crypto-js');
var message= `I am user number 3`;

var hash= SHA256(message).toString();
console.log(hash);


var data= {
    id:4
};

var token={
    data:data,
    hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
}
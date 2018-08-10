const {SHA256}= require('crypto-js');
var message= `I am user number 3`;

const bcrypt= require('bcryptjs');

var password='123abc!';

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     });
// });

var hashedPassword='$2a$10$E4dNT8c7Qn0ldJhjIpggDutFbxvBetFN2Y9kzARyiuGeHjF4Uzjgm';

bcrypt.compare(password,hashedPassword,(err,res)=>{
    console.log(res);
});




// var hash= SHA256(message).toString();
// console.log(hash);


// var data= {
//     id:4
// };

// var token={
//     data:data,
//     hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// }
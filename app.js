const express = require("express")
const app = express();
app.use(express.static("public"));
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(bodyparser.urlencoded({
    extended: true
}))
// apiid=61ca9deeee229f53abf9c9b592ad6929-us18;
// lisst id 0727d7e72a

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    var frstname = req.body.fname;
    var lastname = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: frstname,
                LNAME: lastname
            }
        }]
    };
    var jsonData = JSON.stringify(data);
    var url="https://us18.api.mailchimp.com/3.0/lists/0727d7e72a"
    const options={
        method:"POST",
        auth: "tushar1:c0ec6ede24bb27a0620470a19363ce88-us18"
    }
    const request=https.request(url, options, function (response) {
     
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data",function(data){
        console.log(JSON.parse(data));
     })
    })
    request.write(jsonData);
    request.end();




});

app.post("/failure", function (req, res) {
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function () {
    console.log("tadaahhhh;");
})
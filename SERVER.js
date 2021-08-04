
var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views", "./views");

var server= require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
    var mangPlayers = [];

io.on("connection",function(socket){
    console.log("co nguoi ket noi"+ socket.id);

    socket.on("dangky",function(data) {
        var player = new Player(data, socket.id);
        mangPlayers.push(player);
        console.log(mangPlayers);
    });

    socket.on("binhchon",function(){
        var r =Math.floor(Math.random()*mangPlayers.length);
        io.sockets.emit("ketqua", mangPlayers[r]);
    })
 });

app.get("/", function(req, res){
    res.render("trangchu");
});
app.get("/admin", function(req, res){
    res.render("admin");
});
function Player(hoten, socketid){
    this.HOTEN = hoten;
    this.SOCKETID = socketid ;
}

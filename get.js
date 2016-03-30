var http = require("http");
var cheerio = require("cheerio");
var fs = require('fs');
var iconv = require('iconv-lite');
// Utility function that downloads a URL and invokes
// callback with the data.
function download(url,index,callback) {
    http.get(url, function(res) {
        var data = "";
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on("end", function() {
            callback(data,index);
        });
    }).on("error", function() {
        callback(null);
    });
}



var url="http://zt.bjnews.com.cn/market/hr2015/index1.php?id=";
var max=950;



for(i=0;i<max;i++){
    (function(index){
        download(url+index,index,function(data,index) {
            if (data) {
                var $ = cheerio.load(data);

                //console.dir(data);
                //console.log(data);
                var line='<p>'+index+':'+$('h3>span').text().replace('：','')+'</p>';
                console.log(line);
                //line = iconv.decode(line, 'utf-8');
                fs.appendFile('name.txt',line,function(err){

                });
            }
            else console.log("error");
        });
    })(i);

}

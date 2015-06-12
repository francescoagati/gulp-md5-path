(function (console, $hx_exports) { "use strict";
var Pretty = require("pretty-print");
var EventStream = require("event-stream");
var HxOverrides = function() { };
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Main = function() { };
Main.main = function() {
};
var md5 = $hx_exports.md5 = function() { };
md5.map_file = function(file,cb) {
	var md5 = js_node_Crypto.createHash("md5");
	md5.update(file.contents.toString());
	var md5_suffix = md5.digest("hex");
	var splits = file.path.split("/");
	var end = splits.slice(splits.length - 1)[0];
	var basename = end.split(".");
	file.path = "" + splits.slice(0,-1).join("/") + "/" + basename[0] + "-" + md5_suffix + "." + basename.slice(1).join(".");
	var p = Pretty();
	console.log(p);
	cb(null,file);
};
md5.task = function(options) {
	return EventStream.map(md5.map_file);
};
var manifest = $hx_exports.manifest = function() { };
manifest.isJsArray = function(o) {
	return toString.call(o) === "[object Array]";
};
manifest.isJsObject = function(a) {
	return (!!a) && (a.constructor === Object);
};
var js_node_Crypto = require("crypto");
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

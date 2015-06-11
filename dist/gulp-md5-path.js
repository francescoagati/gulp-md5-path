(function (console, $hx_exports) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
var EventStream = require("event-stream");
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
};
var TypePath = { __ename__ : true, __constructs__ : ["http","file"] };
TypePath.http = function(path) { var $x = ["http",0,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
TypePath.file = function(path) { var $x = ["file",1,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
Math.__name__ = true;
var md5 = $hx_exports.md5 = function() { };
md5.__name__ = true;
md5.map_file = function(file,cb) {
	var md5 = js_node_Crypto.createHash("md5");
	md5.update(file.contents.toString());
	var md5_suffix = md5.digest("hex");
	var splits = file.path.split("/");
	var end = splits.slice(splits.length - 1)[0];
	var basename = end.split(".");
	file.path = "" + splits.slice(0,-1).join("/") + "/" + basename[0] + "-" + md5_suffix + "." + basename.slice(1).join(".");
	cb(null,file);
};
md5.task = function(options) {
	return EventStream.map(md5.map_file);
};
var manifest = $hx_exports.manifest = function() { };
manifest.__name__ = true;
manifest.map_manifest = function(file,cb) {
	var tmp;
	var m = JSON.parse(file.contents.toString());
	tmp = m;
	var manifest = tmp;
	var _g = 0;
	var _g1 = Reflect.fields(manifest);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		var _g2 = 0;
		var _g3 = manifest[key];
		while(_g2 < _g3.length) {
			var path = _g3[_g2];
			++_g2;
			var _g4 = path.indexOf("http") >= 0?TypePath.http(path):TypePath.file(path);
		}
	}
	cb(null,file);
};
manifest.task = function(options) {
	return EventStream.map(manifest.map_manifest);
};
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_node_Crypto = require("crypto");
String.__name__ = true;
Array.__name__ = true;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

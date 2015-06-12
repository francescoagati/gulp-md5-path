(function (console, $hx_exports) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
var Pretty = require("pretty-print");
var EventStream = require("event-stream");
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
};
var TypePath = { __ename__ : true, __constructs__ : ["http","file","undefined"] };
TypePath.http = function(path) { var $x = ["http",0,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
TypePath.file = function(path) { var $x = ["file",1,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
TypePath.undefined = function(path) { var $x = ["undefined",2,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
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
	var p = Pretty();
	haxe_Log.trace(p,{ fileName : "Md5.hx", lineNumber : 13, className : "Md5", methodName : "map_file"});
	cb(null,file);
};
md5.task = function(options) {
	return EventStream.map(md5.map_file);
};
var manifest = $hx_exports.manifest = function() { };
manifest.__name__ = true;
manifest.processFile = function(path,__return) {
	var __afterVar_0 = function(y,w) {
		haxe_Log.trace("w",{ fileName : "ProcessManifest.hx", lineNumber : 35, className : "ProcessManifest", methodName : "processFile", customParams : [w]});
		haxe_Log.trace("y",{ fileName : "ProcessManifest.hx", lineNumber : 36, className : "ProcessManifest", methodName : "processFile", customParams : [y]});
		__return(path);
	};
	js_node_Fs.readFile(path,{ encoding : "utf8"},function(__parameter_1,__parameter_2) {
		__afterVar_0(__parameter_1,__parameter_2);
	});
};
manifest.processManifest = function(paths,__return) {
	var __iterator = 0;
	if(0 < paths.length) {
		var __results = [];
		var __counter = 1;
		var __i = 0;
		var __checkCounter = function() {
			if(--__counter == 0) __return(__results);
		};
		while(true) {
			var path = paths[__iterator++];
			var __index = [__i];
			__counter++;
			{
				var _g = StringTools.startsWith(path,"http")?TypePath.http(path):StringTools.startsWith(path,".//")?TypePath.file(path):TypePath.undefined(path);
				switch(_g[1]) {
				case 0:
					var path1 = _g[2];
					__results[__index[0]] = path1;
					__checkCounter();
					break;
				case 1:
					var path2 = [_g[2]];
					var __return1 = [(function(__index) {
						return function(__parameter_3) {
							__results[__index[0]] = __parameter_3;
							__checkCounter();
						};
					})(__index)];
					var __afterVar_0 = [(function(__return1,path2) {
						return function(y,w) {
							haxe_Log.trace("w",{ fileName : "ProcessManifest.hx", lineNumber : 35, className : "ProcessManifest", methodName : "processFile", customParams : [w]});
							haxe_Log.trace("y",{ fileName : "ProcessManifest.hx", lineNumber : 36, className : "ProcessManifest", methodName : "processFile", customParams : [y]});
							__return1[0](path2[0]);
						};
					})(__return1,path2)];
					js_node_Fs.readFile(path2[0],{ encoding : "utf8"},(function(__afterVar_0) {
						return function(__parameter_1,__parameter_2) {
							__afterVar_0[0](__parameter_1,__parameter_2);
						};
					})(__afterVar_0));
					break;
				default:
					__results[__index[0]] = null;
					__checkCounter();
				}
			}
			__i++;
			if(!(__iterator < paths.length)) break;
		}
		__checkCounter();
	}
};
manifest.traverseJson = function(json,__return) {
	var __iterator = 0;
	var __doCount = 0;
	var tmp;
	var __continue_41 = null;
	__continue_41 = function() {
		if(__iterator < Reflect.fields(json).length) {
			if(__doCount++ == 0) while(true) {
				var key = [Reflect.fields(json)[__iterator++]];
				key[0];
				var obj = json[key[0]];
				obj;
				var __endIf_1 = [(function() {
					return function() {
						__continue_41();
						return;
					};
				})()];
				if(toString.call(o) === "[object Array]") {
					var __afterVar_9 = [(function(__endIf_1,key) {
						return function(new_obj) {
							new_obj;
							json[key[0]] = new_obj;
							__endIf_1[0]();
						};
					})(__endIf_1,key)];
					var paths = obj;
					var __return1 = [(function(__afterVar_9) {
						return function(__parameter_10) {
							__afterVar_9[0](__parameter_10);
						};
					})(__afterVar_9)];
					var __iterator1 = 0;
					if(__iterator1 < paths.length) {
						var __results = [[]];
						var __counter = [1];
						var __i = 0;
						var __checkCounter = [(function(__counter,__results,__return1) {
							return function() {
								if(--__counter[0] == 0) __return1[0](__results[0]);
							};
						})(__counter,__results,__return1)];
						while(true) {
							var path = paths[__iterator1++];
							var __index = [__i];
							__counter[0]++;
							{
								var _g = StringTools.startsWith(path,"http")?TypePath.http(path):StringTools.startsWith(path,".//")?TypePath.file(path):TypePath.undefined(path);
								switch(_g[1]) {
								case 0:
									var path1 = _g[2];
									path1;
									__results[0][__index[0]] = path1;
									__checkCounter[0]();
									break;
								case 1:
									var path2 = _g[2];
									var path3 = [path2];
									var __return2 = [(function(__index,__checkCounter,__results) {
										return function(__parameter_3) {
											__parameter_3;
											__results[0][__index[0]] = __parameter_3;
											__checkCounter[0]();
										};
									})(__index,__checkCounter,__results)];
									var __afterVar_0 = [(function(__return2,path3) {
										return function(y,w) {
											y;
											w;
											haxe_Log.trace("w",{ fileName : "ProcessManifest.hx", lineNumber : 35, className : "ProcessManifest", methodName : "processFile", customParams : [w]});
											haxe_Log.trace("y",{ fileName : "ProcessManifest.hx", lineNumber : 36, className : "ProcessManifest", methodName : "processFile", customParams : [y]});
											__return2[0](path3[0]);
										};
									})(__return2,path3)];
									js_node_Fs.readFile(path3[0],{ encoding : "utf8"},(function(__afterVar_0) {
										return function(__parameter_1,__parameter_2) {
											__afterVar_0[0](__parameter_1,__parameter_2);
										};
									})(__afterVar_0));
									break;
								default:
									__results[0][__index[0]] = null;
									__checkCounter[0]();
								}
							}
							__i++;
							if(!(__iterator1 < paths.length)) break;
						}
						__checkCounter[0]();
					}
				} else if((!!a) && (a.constructor === Object)) manifest.traverseJson(obj,(function(__endIf_1) {
					return function(__parameter_8) {
						__parameter_8;
						__endIf_1[0]();
					};
				})(__endIf_1)); else __endIf_1[0]();
				if(!(--__doCount != 0)) break;
			}
		} else __return(json);
	};
	tmp = __continue_41;
	var __continue_4 = tmp;
	__continue_4();
};
manifest.map_manifest = function(file,cb) {
	var asyncTest = function(__return) {
		var json = JSON.parse(file.contents.toString());
		json;
		var json1 = json;
		var __return1 = function(__parameter_12) {
			json = __parameter_12;
			var content = JSON.stringify(json);
			file.contents = new js_node_buffer_Buffer(content);
			cb(null,file);
			__return();
		};
		var __iterator = 0;
		var __doCount = 0;
		var tmp;
		var __continue_41 = null;
		__continue_41 = function() {
			if(__iterator < Reflect.fields(json1).length) {
				if(__doCount++ == 0) while(true) {
					var key = [Reflect.fields(json1)[__iterator++]];
					key[0];
					var obj = json1[key[0]];
					obj;
					var __endIf_1 = [(function() {
						return function() {
							__continue_41();
							return;
						};
					})()];
					if(toString.call(o) === "[object Array]") {
						var __afterVar_9 = [(function(__endIf_1,key) {
							return function(new_obj) {
								new_obj;
								json1[key[0]] = new_obj;
								__endIf_1[0]();
							};
						})(__endIf_1,key)];
						var paths = obj;
						var __return2 = [(function(__afterVar_9) {
							return function(__parameter_10) {
								__afterVar_9[0](__parameter_10);
							};
						})(__afterVar_9)];
						var __iterator1 = 0;
						if(__iterator1 < paths.length) {
							var __results = [[]];
							var __counter = [1];
							var __i = 0;
							var __checkCounter = [(function(__counter,__results,__return2) {
								return function() {
									if(--__counter[0] == 0) __return2[0](__results[0]);
								};
							})(__counter,__results,__return2)];
							while(true) {
								var path = paths[__iterator1++];
								var __index = [__i];
								__counter[0]++;
								{
									var _g = StringTools.startsWith(path,"http")?TypePath.http(path):StringTools.startsWith(path,".//")?TypePath.file(path):TypePath.undefined(path);
									switch(_g[1]) {
									case 0:
										var path1 = _g[2];
										path1;
										__results[0][__index[0]] = path1;
										__checkCounter[0]();
										break;
									case 1:
										var path2 = _g[2];
										var path3 = [path2];
										var __return3 = [(function(__index,__checkCounter,__results) {
											return function(__parameter_3) {
												__parameter_3;
												__results[0][__index[0]] = __parameter_3;
												__checkCounter[0]();
											};
										})(__index,__checkCounter,__results)];
										var __afterVar_0 = [(function(__return3,path3) {
											return function(y,w) {
												y;
												w;
												haxe_Log.trace("w",{ fileName : "ProcessManifest.hx", lineNumber : 35, className : "ProcessManifest", methodName : "processFile", customParams : [w]});
												haxe_Log.trace("y",{ fileName : "ProcessManifest.hx", lineNumber : 36, className : "ProcessManifest", methodName : "processFile", customParams : [y]});
												__return3[0](path3[0]);
											};
										})(__return3,path3)];
										js_node_Fs.readFile(path3[0],{ encoding : "utf8"},(function(__afterVar_0) {
											return function(__parameter_1,__parameter_2) {
												__afterVar_0[0](__parameter_1,__parameter_2);
											};
										})(__afterVar_0));
										break;
									default:
										__results[0][__index[0]] = null;
										__checkCounter[0]();
									}
								}
								__i++;
								if(!(__iterator1 < paths.length)) break;
							}
							__checkCounter[0]();
						}
					} else if((!!a) && (a.constructor === Object)) manifest.traverseJson(obj,(function(__endIf_1) {
						return function(__parameter_8) {
							__parameter_8;
							__endIf_1[0]();
						};
					})(__endIf_1)); else __endIf_1[0]();
					if(!(--__doCount != 0)) break;
				}
			} else __return1(json1);
		};
		tmp = __continue_41;
		var __continue_4 = tmp;
		__continue_4();
	};
	asyncTest(function() {
	});
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
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
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
var js_node_Fs = require("fs");
var js_node_buffer_Buffer = require("buffer").Buffer;
String.__name__ = true;
Array.__name__ = true;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

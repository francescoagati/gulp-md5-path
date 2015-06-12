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
Math.__name__ = true;
var md5 = $hx_exports.md5 = function() { };
md5.__name__ = true;
md5.map_file = function(file,cb) {
	var tmp;
	var s = file.contents.toString();
	var md5 = js_node_Crypto.createHash("md5");
	md5.update(s);
	tmp = md5.digest("hex");
	var md5_suffix = tmp;
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
var TypePath = { __ename__ : true, __constructs__ : ["http","file","undefined"] };
TypePath.http = function(path) { var $x = ["http",0,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
TypePath.file = function(path) { var $x = ["file",1,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
TypePath.undefined = function(path) { var $x = ["undefined",2,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
var manifest = $hx_exports.manifest = function() { };
manifest.__name__ = true;
manifest.traverseJson = function(json,options,__return) {
	var __iterator = 0;
	var __doCount = 0;
	var tmp;
	var __continue_61 = null;
	__continue_61 = function() {
		if(__iterator < Reflect.fields(json).length) {
			if(__doCount++ == 0) while(true) {
				var key = [Reflect.fields(json)[__iterator++]];
				key[0];
				var obj = json[key[0]];
				obj;
				var __endIf_1 = [(function() {
					return function() {
						__continue_61();
						return;
					};
				})()];
				if(toString.call(o) === "[object Array]") {
					var __afterVar_11 = [(function(__endIf_1,key) {
						return function(new_obj) {
							new_obj;
							json[key[0]] = new_obj;
							__endIf_1[0]();
						};
					})(__endIf_1,key)];
					var paths = obj;
					var __return1 = [(function(__afterVar_11) {
						return function(__parameter_12) {
							__afterVar_11[0](__parameter_12);
						};
					})(__afterVar_11)];
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
									var options1 = [options];
									var __return2 = [(function(__index,__checkCounter,__results) {
										return function(__parameter_5) {
											__parameter_5;
											__results[0][__index[0]] = __parameter_5;
											__checkCounter[0]();
										};
									})(__index,__checkCounter,__results)];
									var completePath = "" + options1[0].basePath + "/" + path3[0];
									completePath;
									var __afterVar_1 = [(function(__return2,options1,path3) {
										return function(err,content) {
											err;
											content;
											var tmp1;
											var tmp4;
											var array1 = path3[0].split("/");
											tmp4 = array1[array1.length - 1];
											var array = tmp4.split(".");
											tmp1 = array[0];
											var tmp2;
											var md5 = js_node_Crypto.createHash("md5");
											md5.update(content);
											tmp2 = md5.digest("hex");
											var tmp3;
											var tmp5;
											var array3 = path3[0].split("/");
											tmp5 = array3[array3.length - 1];
											var array2 = tmp5.split(".");
											tmp3 = array2[array2.length - 1];
											var new_path = options1[0].cdnPath + "/" + path3[0].split("/").slice(0,-1).join("/") + "/" + tmp1 + "-" + tmp2 + "." + tmp3;
											new_path;
											console.log(new_path);
											__return2[0](new_path);
										};
									})(__return2,options1,path3)];
									js_node_Fs.readFile(completePath,{ encoding : "utf8"},(function(__afterVar_1) {
										return function(__parameter_2,__parameter_3) {
											__afterVar_1[0](__parameter_2,__parameter_3);
										};
									})(__afterVar_1));
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
				} else if((!!a) && (a.constructor === Object)) manifest.traverseJson(obj,options,(function(__endIf_1) {
					return function(__parameter_10) {
						__parameter_10;
						__endIf_1[0]();
					};
				})(__endIf_1)); else __endIf_1[0]();
				if(!(--__doCount != 0)) break;
			}
		} else __return(json);
	};
	tmp = __continue_61;
	var __continue_6 = tmp;
	__continue_6();
};
manifest.map_manifest = function(options,file,cb) {
	var asyncTest = function(__return) {
		var json = JSON.parse(file.contents.toString());
		json;
		var json1 = json;
		var options1 = options;
		var __return1 = function(__parameter_14) {
			json = __parameter_14;
			var content = JSON.stringify(json);
			file.contents = new js_node_buffer_Buffer(content);
			cb(null,file);
			__return();
		};
		var __iterator = 0;
		var __doCount = 0;
		var tmp;
		var __continue_61 = null;
		__continue_61 = function() {
			if(__iterator < Reflect.fields(json1).length) {
				if(__doCount++ == 0) while(true) {
					var key = [Reflect.fields(json1)[__iterator++]];
					key[0];
					var obj = json1[key[0]];
					obj;
					var __endIf_1 = [(function() {
						return function() {
							__continue_61();
							return;
						};
					})()];
					if(toString.call(o) === "[object Array]") {
						var __afterVar_11 = [(function(__endIf_1,key) {
							return function(new_obj) {
								new_obj;
								json1[key[0]] = new_obj;
								__endIf_1[0]();
							};
						})(__endIf_1,key)];
						var paths = obj;
						var __return2 = [(function(__afterVar_11) {
							return function(__parameter_12) {
								__afterVar_11[0](__parameter_12);
							};
						})(__afterVar_11)];
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
										var options2 = [options1];
										var __return3 = [(function(__index,__checkCounter,__results) {
											return function(__parameter_5) {
												__parameter_5;
												__results[0][__index[0]] = __parameter_5;
												__checkCounter[0]();
											};
										})(__index,__checkCounter,__results)];
										var completePath = "" + options2[0].basePath + "/" + path3[0];
										completePath;
										var __afterVar_1 = [(function(__return3,options2,path3) {
											return function(err,content1) {
												err;
												content1;
												var tmp1;
												var tmp4;
												var array1 = path3[0].split("/");
												tmp4 = array1[array1.length - 1];
												var array = tmp4.split(".");
												tmp1 = array[0];
												var tmp2;
												var md5 = js_node_Crypto.createHash("md5");
												md5.update(content1);
												tmp2 = md5.digest("hex");
												var tmp3;
												var tmp5;
												var array3 = path3[0].split("/");
												tmp5 = array3[array3.length - 1];
												var array2 = tmp5.split(".");
												tmp3 = array2[array2.length - 1];
												var new_path = options2[0].cdnPath + "/" + path3[0].split("/").slice(0,-1).join("/") + "/" + tmp1 + "-" + tmp2 + "." + tmp3;
												new_path;
												console.log(new_path);
												__return3[0](new_path);
											};
										})(__return3,options2,path3)];
										js_node_Fs.readFile(completePath,{ encoding : "utf8"},(function(__afterVar_1) {
											return function(__parameter_2,__parameter_3) {
												__afterVar_1[0](__parameter_2,__parameter_3);
											};
										})(__afterVar_1));
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
					} else if((!!a) && (a.constructor === Object)) manifest.traverseJson(obj,options1,(function(__endIf_1) {
						return function(__parameter_10) {
							__parameter_10;
							__endIf_1[0]();
						};
					})(__endIf_1)); else __endIf_1[0]();
					if(!(--__doCount != 0)) break;
				}
			} else __return1(json1);
		};
		tmp = __continue_61;
		var __continue_6 = tmp;
		__continue_6();
	};
	asyncTest(function() {
	});
};
manifest.task = function(options) {
	var tmp;
	var a1 = options;
	tmp = function(a2,cb) {
		manifest.map_manifest(a1,a2,cb);
	};
	return EventStream.map(tmp);
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
var js_node_Fs = require("fs");
var js_node_buffer_Buffer = require("buffer").Buffer;
String.__name__ = true;
Array.__name__ = true;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

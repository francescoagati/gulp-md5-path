(function (console, $hx_exports) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var DefTypes = function() { };
DefTypes.__name__ = ["DefTypes"];
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedPos: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) this.r.s = s;
			return b;
		} else {
			var b1 = this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b1;
		}
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf = new StringBuf();
		do {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				buf.add(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf.add(HxOverrides.substr(s,offset,p.pos - offset));
			buf.add(f(this));
			if(p.len == 0) {
				buf.add(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
		} while(this.r.global);
		if(!this.r.global && offset > 0 && offset < s.length) buf.add(HxOverrides.substr(s,offset,null));
		return buf.toString();
	}
	,__class__: EReg
};
var Pretty = require("pretty-print");
var _$Externs_AFile_$Impl_$ = {};
_$Externs_AFile_$Impl_$.__name__ = ["_Externs","AFile_Impl_"];
_$Externs_AFile_$Impl_$._new = function(f) {
	return f;
};
_$Externs_AFile_$Impl_$.fromVinyl = function(v) {
	return v;
};
var EventStream = require("event-stream");
var FileTools = function() { };
FileTools.__name__ = ["FileTools"];
FileTools.toString = function(file) {
	return file.contents.toString();
};
FileTools.toJson = function(file) {
	return JSON.parse(FileTools.toString(file));
};
FileTools.setContent = function(file,content) {
	file.contents = new js_node_buffer_Buffer(content);
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
var Main = function() { };
Main.__name__ = ["Main"];
Main.main = function() {
};
var _$Manifest_AManifest_$Impl_$ = {};
_$Manifest_AManifest_$Impl_$.__name__ = ["_Manifest","AManifest_Impl_"];
_$Manifest_AManifest_$Impl_$._new = function(m) {
	return m;
};
_$Manifest_AManifest_$Impl_$.fromFile = function(file) {
	var m = JSON.parse(FileTools.toString(file));
	return m;
};
Math.__name__ = ["Math"];
var md5 = $hx_exports.md5 = function() { };
md5.__name__ = ["md5"];
md5.map_file = function(file,cb) {
	FileMd5Tools.toMd5(file);
	var p = Pretty();
	console.log(p);
	cb(null,file);
};
md5.task = function(options) {
	return EventStream.map(md5.map_file);
};
var StringMd5Tools = function() { };
StringMd5Tools.__name__ = ["StringMd5Tools"];
StringMd5Tools.toMd5 = function(s) {
	var md5 = js_node_Crypto.createHash("md5");
	md5.update(s);
	return md5.digest("hex");
};
var FileMd5Tools = function() { };
FileMd5Tools.__name__ = ["FileMd5Tools"];
FileMd5Tools.toMd5 = function(file) {
	var md5_suffix = StringMd5Tools.toMd5(FileTools.toString(file));
	var splits = file.path.split("/");
	var end = splits.slice(splits.length - 1)[0];
	var basename = end.split(".");
	file.path = "" + splits.slice(0,-1).join("/") + "/" + basename[0] + "-" + md5_suffix + "." + basename.slice(1).join(".");
	return file;
};
var Md5Tools = function() { };
Md5Tools.__name__ = ["Md5Tools"];
var TypePath = { __ename__ : ["TypePath"], __constructs__ : ["http","file","undefined"] };
TypePath.http = function(path) { var $x = ["http",0,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
TypePath.file = function(path) { var $x = ["file",1,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
TypePath.undefined = function(path) { var $x = ["undefined",2,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
var PathsTools = function() { };
PathsTools.__name__ = ["PathsTools"];
PathsTools.processPaths = function(paths,options,__return) {
	var __iterator = 0;
	if(__iterator < paths.length) {
		var __results = [];
		var __counter = 1;
		var __i = 0;
		var __checkCounter = function() {
			if(--__counter == 0) __return(__results);
		};
		do {
			var path = paths[__iterator++];
			var __index = [__i];
			__counter++;
			var __endSwitch_0 = [(function(__index) {
				return function(__endSwitch_0_parameter_0) {
					__results[__index[0]] = __endSwitch_0_parameter_0;
					__checkCounter();
					return;
				};
			})(__index)];
			{
				var _g = PathTools.getType(path);
				switch(Type.enumIndex(_g)) {
				case 0:
					var path1 = _g[2];
					path1;
					__endSwitch_0[0](path1);
					break;
				case 1:
					var path2 = _g[2];
					PathTools.processFile(path2,options,(function(__endSwitch_0) {
						return function(__parameter_5) {
							__parameter_5;
							__endSwitch_0[0](__parameter_5);
						};
					})(__endSwitch_0));
					break;
				default:
					__endSwitch_0[0](null);
				}
			}
			__i++;
		} while(__iterator < paths.length);
		__checkCounter();
	}
};
var PathTools = function() { };
PathTools.__name__ = ["PathTools"];
PathTools.processFile = function(path,options,__return) {
	(function(completePath) {
		completePath;
		(function(__afterVar_1) {
			js_node_Fs.readFile(completePath,{ encoding : "utf8"},function(__parameter_2,__parameter_3) {
				__afterVar_1(__parameter_2,__parameter_3);
			});
		})(function(err,content) {
			err;
			content;
			(function(new_path) {
				new_path;
				console.log(new_path);
				__return(new_path);
			})(options.cdnPath + "/" + PathTools.basePath(path) + "/" + PathTools.baseName(path) + "-" + StringMd5Tools.toMd5(content) + "." + PathTools.extension(path));
		});
	})("" + options.basePath + "/" + path);
};
PathTools.getType = function(path) {
	if(PathTools.isHttp(path)) return TypePath.http(path); else if(PathTools.isFile(path)) return TypePath.file(path); else return TypePath.undefined(path);
};
PathTools.fileName = function(path) {
	return thx_Arrays.last(path.split("/"));
};
PathTools.baseName = function(path) {
	return thx_Arrays.first(thx_Arrays.last(path.split("/")).split("."));
};
PathTools.basePath = function(path) {
	return path.split("/").slice(0,-1).join("/");
};
PathTools.extension = function(path) {
	return thx_Arrays.last(thx_Arrays.last(path.split("/")).split("."));
};
PathTools.isHttp = function(path) {
	return StringTools.startsWith(path,"http");
};
PathTools.isFile = function(path) {
	return StringTools.startsWith(path,".//");
};
PathTools.processPath = function(path) {
	{
		var _g = PathTools.getType(path);
		switch(Type.enumIndex(_g)) {
		case 0:
			var path1 = _g[2];
			return "http";
		case 1:
			var path2 = _g[2];
			return "file";
		default:
			return null;
		}
	}
};
var _$Path_Path_$Impl_$ = {};
_$Path_Path_$Impl_$.__name__ = ["_Path","Path_Impl_"];
_$Path_Path_$Impl_$._new = function(s) {
	return s;
};
_$Path_Path_$Impl_$.fromString = function(s) {
	return s;
};
var DynamicTools = function() { };
DynamicTools.__name__ = ["DynamicTools"];
DynamicTools.isJsArray = function(o) {
	return toString.call(o) === "[object Array]";
};
DynamicTools.isJsObject = function(a) {
	return (!!a) && (a.constructor === Object);
};
var manifest = $hx_exports.manifest = function() { };
manifest.__name__ = ["manifest"];
manifest.traverseJson = function(json,options,__return) {
	var __iterator = 0;
	var __doCount = 0;
	var __break_7 = function() {
		__return(json);
	};
	var __continue_6;
	var __continue_61 = null;
	__continue_61 = function() {
		var __do = function() {
			var __break = function() {
				__break_7();
			};
			var __continue = function() {
				__continue_61();
			};
			if(__doCount++ == 0) do (function(key) {
				key;
				(function(obj) {
					obj;
					var __endIf_1 = function() {
						__continue_61();
						return;
					};
					if(DynamicTools.isJsArray(obj)) (function(__afterVar_11) {
						PathsTools.processPaths(obj,options,function(__parameter_12) {
							__afterVar_11(__parameter_12);
						});
					})(function(new_obj) {
						new_obj;
						json[key] = new_obj;
						__endIf_1();
					}); else if(DynamicTools.isJsObject(obj)) manifest.traverseJson(obj,options,function(__parameter_10) {
						__parameter_10;
						__endIf_1();
					}); else __endIf_1();
				})(json[key]);
			})(Reflect.fields(json)[__iterator++]); while(--__doCount != 0);
		};
		if(__iterator < Reflect.fields(json).length) __do(); else __break_7();
	};
	__continue_6 = __continue_61;
	__continue_6();
};
manifest.map_manifest = function(options,file,cb) {
	var asyncTest = function(__return) {
		(function(json) {
			json;
			manifest.traverseJson(json,options,function(__parameter_14) {
				json = __parameter_14;
				FileTools.setContent(file,JSON.stringify(json));
				cb(null,file);
				__return();
			});
		})(FileTools.toJson(file));
	};
	asyncTest(function() {
	});
};
manifest.task = function(options) {
	return EventStream.map((function(f,a1) {
		return function(a2,cb) {
			f(a1,a2,cb);
		};
	})(manifest.map_manifest,options));
};
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
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
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(js_Boot.isClass(f) || js_Boot.isEnum(f));
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (js_Boot.isClass(v) || js_Boot.isEnum(v)) != null;
};
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.instance = function(value,c) {
	if((value instanceof c)) return value; else return null;
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,add: function(x) {
		this.b += Std.string(x);
	}
	,toString: function() {
		return this.b;
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(js_Boot.isClass(v) || js_Boot.isEnum(v)) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumParameters = function(e) {
	return e.slice(2);
};
Type.enumIndex = function(e) {
	return e[1];
};
var Utils = function() { };
Utils.__name__ = ["Utils"];
Utils.pretty = function(obj) {
	var p = require('pretty-print');
	p(obj);
	return obj;
};
var com_dongxiguo_continuation_Continuation = function() { };
com_dongxiguo_continuation_Continuation.__name__ = ["com","dongxiguo","continuation","Continuation"];
var com_dongxiguo_continuation_ContinuationDetail = function() { };
com_dongxiguo_continuation_ContinuationDetail.__name__ = ["com","dongxiguo","continuation","ContinuationDetail"];
var haxe_StackItem = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe_StackItem.CFunction = ["CFunction",0];
haxe_StackItem.CFunction.toString = $estr;
haxe_StackItem.CFunction.__enum__ = haxe_StackItem;
haxe_StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
haxe_StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe_StackItem; $x.toString = $estr; return $x; };
var haxe_CallStack = function() { };
haxe_CallStack.__name__ = ["haxe","CallStack"];
haxe_CallStack.getStack = function(e) {
	if(e == null) return [];
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			if(haxe_CallStack.wrapCallSite != null) site = haxe_CallStack.wrapCallSite(site);
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe_StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe_StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe_CallStack.makeStack(e.stack);
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe_CallStack.callStack = function() {
	try {
		throw new Error();
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		var a = haxe_CallStack.getStack(e);
		a.shift();
		return a;
	}
};
haxe_CallStack.exceptionStack = function() {
	return haxe_CallStack.getStack(haxe_CallStack.lastException);
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.add("\nCalled from ");
		haxe_CallStack.itemToString(b,s);
	}
	return b.toString();
};
haxe_CallStack.itemToString = function(b,s) {
	switch(Type.enumIndex(s)) {
	case 0:
		b.add("a C function");
		break;
	case 1:
		var m = s[2];
		b.add("module ");
		b.add(m);
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe_CallStack.itemToString(b,s1);
			b.add(" (");
		}
		b.add(file);
		b.add(" line ");
		b.add(line);
		if(s1 != null) b.add(")");
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		b.add(cname);
		b.add(".");
		b.add(meth);
		break;
	case 4:
		var n = s[2];
		b.add("local function #");
		b.add(n);
		break;
	}
};
haxe_CallStack.makeStack = function(s) {
	if(s == null) return []; else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") stack.shift();
		var m = [];
		var rie10 = new EReg("^   at ([A-Za-z0-9_. ]+) \\(([^)]+):([0-9]+):([0-9]+)\\)$","");
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			if(rie10.match(line)) {
				var path = rie10.matched(1).split(".");
				var meth = path.pop();
				var file = rie10.matched(2);
				var line1 = Std.parseInt(rie10.matched(3));
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function"?haxe_StackItem.LocalFunction():meth == "Global code"?null:haxe_StackItem.Method(path.join("."),meth),file,line1));
			} else m.push(haxe_StackItem.Module(StringTools.trim(line)));
		}
		return m;
	} else return s;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	get: null
	,set: null
	,exists: null
	,keys: null
	,__class__: haxe_IMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,rh: null
	,isReserved: function(key) {
		return __map_reserved[key] != null;
	}
	,set: function(key,value) {
		if(this.isReserved(key)) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(this.isReserved(key)) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(this.isReserved(key)) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	val: null
	,__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.isClass = function(o) {
	return o.__name__;
};
js_Boot.isEnum = function(e) {
	return e.__ename__;
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (js_Boot.isClass(o) || js_Boot.isEnum(o))) t = "object";
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
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
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
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_node_Crypto = require("crypto");
var js_node_Fs = require("fs");
var js_node_buffer_Buffer = require("buffer").Buffer;
var thx_Arrays = function() { };
thx_Arrays.__name__ = ["thx","Arrays"];
thx_Arrays.after = function(array,element) {
	return array.slice(HxOverrides.indexOf(array,element,0) + 1);
};
thx_Arrays.all = function(arr,predicate) {
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(!predicate(item)) return false;
	}
	return true;
};
thx_Arrays.any = function(arr,predicate) {
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(predicate(item)) return true;
	}
	return false;
};
thx_Arrays.at = function(arr,indexes) {
	return indexes.map(function(i) {
		return arr[i];
	});
};
thx_Arrays.before = function(array,element) {
	return array.slice(0,HxOverrides.indexOf(array,element,0));
};
thx_Arrays.compact = function(arr) {
	return arr.filter(function(v) {
		return null != v;
	});
};
thx_Arrays.contains = function(array,element,eq) {
	if(null == eq) return HxOverrides.indexOf(array,element,0) >= 0; else {
		var _g1 = 0;
		var _g = array.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(eq(array[i],element)) return true;
		}
		return false;
	}
};
thx_Arrays.containsAny = function(array,elements,eq) {
	var $it0 = $iterator(elements)();
	while( $it0.hasNext() ) {
		var el = $it0.next();
		if(thx_Arrays.contains(array,el,eq)) return true;
	}
	return false;
};
thx_Arrays.cross = function(a,b) {
	var r = [];
	var _g = 0;
	while(_g < a.length) {
		var va = a[_g];
		++_g;
		var _g1 = 0;
		while(_g1 < b.length) {
			var vb = b[_g1];
			++_g1;
			r.push([va,vb]);
		}
	}
	return r;
};
thx_Arrays.crossMulti = function(array) {
	var acopy = array.slice();
	var result = acopy.shift().map(function(v) {
		return [v];
	});
	while(acopy.length > 0) {
		var array1 = acopy.shift();
		var tresult = result;
		result = [];
		var _g = 0;
		while(_g < array1.length) {
			var v1 = array1[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < tresult.length) {
				var ar = tresult[_g1];
				++_g1;
				var t = ar.slice();
				t.push(v1);
				result.push(t);
			}
		}
	}
	return result;
};
thx_Arrays.distinct = function(array,predicate) {
	var result = [];
	if(array.length <= 1) return array;
	if(null == predicate) predicate = thx_Functions.equality;
	var _g = 0;
	while(_g < array.length) {
		var v = [array[_g]];
		++_g;
		var keep = !thx_Arrays.any(result,(function(v) {
			return function(r) {
				return predicate(r,v[0]);
			};
		})(v));
		if(keep) result.push(v[0]);
	}
	return result;
};
thx_Arrays.eachPair = function(array,callback) {
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		var _g3 = i;
		var _g2 = array.length;
		while(_g3 < _g2) {
			var j = _g3++;
			if(!callback(array[i],array[j])) return;
		}
	}
};
thx_Arrays.equals = function(a,b,equality) {
	if(a == null || b == null || a.length != b.length) return false;
	if(null == equality) equality = thx_Functions.equality;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(!equality(a[i],b[i])) return false;
	}
	return true;
};
thx_Arrays.extract = function(a,predicate) {
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(predicate(a[i])) return a.splice(i,1)[0];
	}
	return null;
};
thx_Arrays.filterNull = function(a) {
	var arr = [];
	var _g = 0;
	while(_g < a.length) {
		var v = a[_g];
		++_g;
		if(null != v) arr.push(v);
	}
	return arr;
};
thx_Arrays.find = function(array,predicate) {
	var _g = 0;
	while(_g < array.length) {
		var item = array[_g];
		++_g;
		if(predicate(item)) return item;
	}
	return null;
};
thx_Arrays.findLast = function(array,predicate) {
	var len = array.length;
	var j;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		j = len - i - 1;
		if(predicate(array[j])) return array[j];
	}
	return null;
};
thx_Arrays.first = function(array) {
	return array[0];
};
thx_Arrays.flatMap = function(array,callback) {
	return thx_Arrays.flatten(array.map(callback));
};
thx_Arrays.flatten = function(array) {
	return Array.prototype.concat.apply([],array);
};
thx_Arrays.from = function(array,element) {
	return array.slice(HxOverrides.indexOf(array,element,0));
};
thx_Arrays.groupByAppend = function(arr,resolver,map) {
	arr.map(function(v) {
		var key = resolver(v);
		var arr1 = map.get(key);
		if(null == arr1) {
			arr1 = [v];
			map.set(key,arr1);
		} else arr1.push(v);
	});
	return map;
};
thx_Arrays.head = function(array) {
	return array[0];
};
thx_Arrays.ifEmpty = function(value,alt) {
	if(null != value && 0 != value.length) return value; else return alt;
};
thx_Arrays.initial = function(array) {
	return array.slice(0,array.length - 1);
};
thx_Arrays.isEmpty = function(array) {
	return array.length == 0;
};
thx_Arrays.last = function(array) {
	return array[array.length - 1];
};
thx_Arrays.mapi = function(array,callback) {
	var r = [];
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		r.push(callback(array[i],i));
	}
	return r;
};
thx_Arrays.mapRight = function(array,callback) {
	var i = array.length;
	var result = [];
	while(--i >= 0) result.push(callback(array[i]));
	return result;
};
thx_Arrays.order = function(array,sort) {
	var n = array.slice();
	n.sort(sort);
	return n;
};
thx_Arrays.pull = function(array,toRemove,equality) {
	var _g = 0;
	while(_g < toRemove.length) {
		var item = toRemove[_g];
		++_g;
		thx_Arrays.removeAll(array,item,equality);
	}
};
thx_Arrays.pushIf = function(array,condition,value) {
	if(condition) array.push(value);
	return array;
};
thx_Arrays.reduce = function(array,callback,initial) {
	return array.reduce(callback,initial);
};
thx_Arrays.resize = function(array,length,fill) {
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx_Arrays.reducei = function(array,callback,initial) {
	return array.reduce(callback,initial);
};
thx_Arrays.reduceRight = function(array,callback,initial) {
	var i = array.length;
	while(--i >= 0) initial = callback(initial,array[i]);
	return initial;
};
thx_Arrays.removeAll = function(array,element,equality) {
	if(null == equality) equality = thx_Functions.equality;
	var i = array.length;
	while(--i >= 0) if(equality(array[i],element)) array.splice(i,1);
};
thx_Arrays.rest = function(array) {
	return array.slice(1);
};
thx_Arrays.sample = function(array,n) {
	n = thx_Ints.min(n,array.length);
	var copy = array.slice();
	var result = [];
	var _g = 0;
	while(_g < n) {
		var i = _g++;
		result.push(copy.splice(Std.random(copy.length),1)[0]);
	}
	return result;
};
thx_Arrays.sampleOne = function(array) {
	return array[Std.random(array.length)];
};
thx_Arrays.shuffle = function(a) {
	var t = thx_Ints.range(a.length);
	var array = [];
	while(t.length > 0) {
		var pos = Std.random(t.length);
		var index = t[pos];
		t.splice(pos,1);
		array.push(a[index]);
	}
	return array;
};
thx_Arrays.split = function(array,parts) {
	var len = Math.ceil(array.length / parts);
	return thx_Arrays.splitBy(array,len);
};
thx_Arrays.splitBy = function(array,len) {
	var res = [];
	len = thx_Ints.min(len,array.length);
	var _g1 = 0;
	var _g = Math.ceil(array.length / len);
	while(_g1 < _g) {
		var p = _g1++;
		res.push(array.slice(p * len,(p + 1) * len));
	}
	return res;
};
thx_Arrays.take = function(arr,n) {
	return arr.slice(0,n);
};
thx_Arrays.takeLast = function(arr,n) {
	return arr.slice(arr.length - n);
};
thx_Arrays.rotate = function(arr) {
	var result = [];
	var _g1 = 0;
	var _g = arr[0].length;
	while(_g1 < _g) {
		var i = _g1++;
		var row = [];
		result.push(row);
		var _g3 = 0;
		var _g2 = arr.length;
		while(_g3 < _g2) {
			var j = _g3++;
			row.push(arr[j][i]);
		}
	}
	return result;
};
thx_Arrays.unzip = function(array) {
	var a1 = [];
	var a2 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
	});
	return { _0 : a1, _1 : a2};
};
thx_Arrays.unzip3 = function(array) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
	});
	return { _0 : a1, _1 : a2, _2 : a3};
};
thx_Arrays.unzip4 = function(array) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
		a4.push(t._3);
	});
	return { _0 : a1, _1 : a2, _2 : a3, _3 : a4};
};
thx_Arrays.unzip5 = function(array) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	var a5 = [];
	array.map(function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
		a4.push(t._3);
		a5.push(t._4);
	});
	return { _0 : a1, _1 : a2, _2 : a3, _3 : a4, _4 : a5};
};
thx_Arrays.zip = function(array1,array2) {
	var length = thx_Ints.min(array1.length,array2.length);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i]});
	}
	return array;
};
thx_Arrays.zip3 = function(array1,array2,array3) {
	var length = thx_ArrayInts.min([array1.length,array2.length,array3.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i]});
	}
	return array;
};
thx_Arrays.zip4 = function(array1,array2,array3,array4) {
	var length = thx_ArrayInts.min([array1.length,array2.length,array3.length,array4.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i], _3 : array4[i]});
	}
	return array;
};
thx_Arrays.zip5 = function(array1,array2,array3,array4,array5) {
	var length = thx_ArrayInts.min([array1.length,array2.length,array3.length,array4.length,array5.length]);
	var array = [];
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		array.push({ _0 : array1[i], _1 : array2[i], _2 : array3[i], _3 : array4[i], _4 : array5[i]});
	}
	return array;
};
var thx_ArrayFloats = function() { };
thx_ArrayFloats.__name__ = ["thx","ArrayFloats"];
thx_ArrayFloats.average = function(arr) {
	return thx_ArrayFloats.sum(arr) / arr.length;
};
thx_ArrayFloats.compact = function(arr) {
	return arr.filter(function(v) {
		return null != v && isFinite(v);
	});
};
thx_ArrayFloats.max = function(arr) {
	if(arr.length == 0) return null; else return thx_Arrays.reduce(arr,function(max,v) {
		if(v > max) return v; else return max;
	},arr[0]);
};
thx_ArrayFloats.min = function(arr) {
	if(arr.length == 0) return null; else return thx_Arrays.reduce(arr,function(min,v) {
		if(v < min) return v; else return min;
	},arr[0]);
};
thx_ArrayFloats.resize = function(array,length,fill) {
	if(fill == null) fill = 0.0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx_ArrayFloats.sum = function(arr) {
	return thx_Arrays.reduce(arr,function(tot,v) {
		return tot + v;
	},0.0);
};
var thx_ArrayInts = function() { };
thx_ArrayInts.__name__ = ["thx","ArrayInts"];
thx_ArrayInts.average = function(arr) {
	return thx_ArrayInts.sum(arr) / arr.length;
};
thx_ArrayInts.max = function(arr) {
	if(arr.length == 0) return null; else return thx_Arrays.reduce(arr,function(max,v) {
		if(v > max) return v; else return max;
	},arr[0]);
};
thx_ArrayInts.min = function(arr) {
	if(arr.length == 0) return null; else return thx_Arrays.reduce(arr,function(min,v) {
		if(v < min) return v; else return min;
	},arr[0]);
};
thx_ArrayInts.resize = function(array,length,fill) {
	if(fill == null) fill = 0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx_ArrayInts.sum = function(arr) {
	return thx_Arrays.reduce(arr,function(tot,v) {
		return tot + v;
	},0);
};
var thx_ArrayStrings = function() { };
thx_ArrayStrings.__name__ = ["thx","ArrayStrings"];
thx_ArrayStrings.compact = function(arr) {
	return arr.filter(function(v) {
		return !thx_Strings.isEmpty(v);
	});
};
thx_ArrayStrings.max = function(arr) {
	if(arr.length == 0) return null; else return thx_Arrays.reduce(arr,function(max,v) {
		if(v > max) return v; else return max;
	},arr[0]);
};
thx_ArrayStrings.min = function(arr) {
	if(arr.length == 0) return null; else return thx_Arrays.reduce(arr,function(min,v) {
		if(v < min) return v; else return min;
	},arr[0]);
};
var thx_Dynamics = function() { };
thx_Dynamics.__name__ = ["thx","Dynamics"];
thx_Dynamics.equals = function(a,b) {
	if(!thx_Types.sameType(a,b)) return false;
	if(a == b) return true;
	{
		var _g = Type["typeof"](a);
		switch(Type.enumIndex(_g)) {
		case 2:case 0:case 1:case 3:
			return false;
		case 5:
			return Reflect.compareMethods(a,b);
		case 6:
			var c = _g[2];
			var ca = Type.getClassName(c);
			var cb = Type.getClassName(Type.getClass(b));
			if(ca != cb) return false;
			if(typeof(a) == "string") return false;
			if((a instanceof Array) && a.__enum__ == null) {
				var aa = a;
				var ab = b;
				if(aa.length != ab.length) return false;
				var _g2 = 0;
				var _g1 = aa.length;
				while(_g2 < _g1) {
					var i = _g2++;
					if(!thx_Dynamics.equals(aa[i],ab[i])) return false;
				}
				return true;
			}
			if(Std["is"](a,Date)) return a.getTime() == b.getTime();
			if(thx_Maps.isMap(a)) {
				var ha = a;
				var hb = b;
				var ka = thx_Iterators.toArray(ha.keys());
				var kb = thx_Iterators.toArray(hb.keys());
				if(ka.length != kb.length) return false;
				var _g11 = 0;
				while(_g11 < ka.length) {
					var key = ka[_g11];
					++_g11;
					if(!hb.exists(key) || !thx_Dynamics.equals(ha.get(key),hb.get(key))) return false;
				}
				return true;
			}
			var t = false;
			if((t = thx_Iterators.isIterator(a)) || thx_Iterables.isIterable(a)) {
				var va;
				if(t) va = thx_Iterators.toArray(a); else va = thx_Iterables.toArray(a);
				var vb;
				if(t) vb = thx_Iterators.toArray(b); else vb = thx_Iterables.toArray(b);
				if(va.length != vb.length) return false;
				var _g21 = 0;
				var _g12 = va.length;
				while(_g21 < _g12) {
					var i1 = _g21++;
					if(!thx_Dynamics.equals(va[i1],vb[i1])) return false;
				}
				return true;
			}
			var f = null;
			if(Reflect.hasField(a,"equals") && Reflect.isFunction(f = Reflect.field(a,"equals"))) return Reflect.callMethod(a,f,[b]);
			var fields = Type.getInstanceFields(Type.getClass(a));
			var _g13 = 0;
			while(_g13 < fields.length) {
				var field = fields[_g13];
				++_g13;
				var va1 = Reflect.field(a,field);
				if(Reflect.isFunction(va1)) continue;
				var vb1 = Reflect.field(b,field);
				if(!thx_Dynamics.equals(va1,vb1)) return false;
			}
			return true;
		case 7:
			var e = _g[2];
			var ea = Type.getEnumName(e);
			var teb = Type.getEnum(b);
			var eb = Type.getEnumName(teb);
			if(ea != eb) return false;
			if(Type.enumIndex(a) != Type.enumIndex(b)) return false;
			var pa = Type.enumParameters(a);
			var pb = Type.enumParameters(b);
			var _g22 = 0;
			var _g14 = pa.length;
			while(_g22 < _g14) {
				var i2 = _g22++;
				if(!thx_Dynamics.equals(pa[i2],pb[i2])) return false;
			}
			return true;
		case 4:
			var fa = Reflect.fields(a);
			var fb = Reflect.fields(b);
			var _g15 = 0;
			while(_g15 < fa.length) {
				var field1 = fa[_g15];
				++_g15;
				HxOverrides.remove(fb,field1);
				if(!Reflect.hasField(b,field1)) return false;
				var va2 = Reflect.field(a,field1);
				if(Reflect.isFunction(va2)) continue;
				var vb2 = Reflect.field(b,field1);
				if(!thx_Dynamics.equals(va2,vb2)) return false;
			}
			if(fb.length > 0) return false;
			var t1 = false;
			if((t1 = thx_Iterators.isIterator(a)) || thx_Iterables.isIterable(a)) {
				if(t1 && !thx_Iterators.isIterator(b)) return false;
				if(!t1 && !thx_Iterables.isIterable(b)) return false;
				var aa1;
				if(t1) aa1 = thx_Iterators.toArray(a); else aa1 = thx_Iterables.toArray(a);
				var ab1;
				if(t1) ab1 = thx_Iterators.toArray(b); else ab1 = thx_Iterables.toArray(b);
				if(aa1.length != ab1.length) return false;
				var _g23 = 0;
				var _g16 = aa1.length;
				while(_g23 < _g16) {
					var i3 = _g23++;
					if(!thx_Dynamics.equals(aa1[i3],ab1[i3])) return false;
				}
				return true;
			}
			return true;
		case 8:
			throw new js__$Boot_HaxeError("Unable to compare two unknown types");
			break;
		}
	}
	throw new thx_Error("Unable to compare values: " + Std.string(a) + " and " + Std.string(b),null,{ fileName : "Dynamics.hx", lineNumber : 153, className : "thx.Dynamics", methodName : "equals"});
};
thx_Dynamics.clone = function(v,cloneInstances) {
	if(cloneInstances == null) cloneInstances = false;
	{
		var _g = Type["typeof"](v);
		switch(Type.enumIndex(_g)) {
		case 0:
			return null;
		case 1:case 2:case 3:case 7:case 8:case 5:
			return v;
		case 4:
			return thx_Objects.copyTo(v,{ });
		case 6:
			var c = _g[2];
			var name = Type.getClassName(c);
			switch(name) {
			case "Array":
				return v.map(function(v1) {
					return thx_Dynamics.clone(v1,cloneInstances);
				});
			case "String":case "Date":
				return v;
			default:
				if(cloneInstances) {
					var o = Type.createEmptyInstance(c);
					var _g1 = 0;
					var _g2 = Type.getInstanceFields(c);
					while(_g1 < _g2.length) {
						var field = _g2[_g1];
						++_g1;
						Reflect.setField(o,field,thx_Dynamics.clone(Reflect.field(v,field),cloneInstances));
					}
					return o;
				} else return v;
			}
			break;
		}
	}
};
var thx_DynamicsT = function() { };
thx_DynamicsT.__name__ = ["thx","DynamicsT"];
thx_DynamicsT.isEmpty = function(o) {
	return thx_DynamicsT.size(o) == 0;
};
thx_DynamicsT.exists = function(o,name) {
	return Reflect.hasField(o,name);
};
thx_DynamicsT.fields = function(o) {
	return Reflect.fields(o);
};
thx_DynamicsT.merge = function(to,from,replacef) {
	if(null == replacef) replacef = function(field,oldv,newv) {
		return newv;
	};
	var _g = 0;
	var _g1 = Reflect.fields(from);
	while(_g < _g1.length) {
		var field1 = _g1[_g];
		++_g;
		var newv1 = Reflect.field(from,field1);
		if(Reflect.hasField(to,field1)) Reflect.setField(to,field1,replacef(field1,Reflect.field(to,field1),newv1)); else Reflect.setField(to,field1,newv1);
	}
	return to;
};
thx_DynamicsT.size = function(o) {
	return Reflect.fields(o).length;
};
thx_DynamicsT.values = function(o) {
	return Reflect.fields(o).map(function(key) {
		return Reflect.field(o,key);
	});
};
thx_DynamicsT.tuples = function(o) {
	return Reflect.fields(o).map(function(key) {
		var _1 = Reflect.field(o,key);
		return { _0 : key, _1 : _1};
	});
};
var thx_Error = function(message,stack,pos) {
	Error.call(this,message);
	this.message = message;
	if(null == stack) {
		try {
			stack = haxe_CallStack.exceptionStack();
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			stack = [];
		}
		if(stack.length == 0) try {
			stack = haxe_CallStack.callStack();
		} catch( e1 ) {
			haxe_CallStack.lastException = e1;
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			stack = [];
		}
	}
	this.stackItems = stack;
	this.pos = pos;
};
thx_Error.__name__ = ["thx","Error"];
thx_Error.fromDynamic = function(err,pos) {
	if(Std["is"](err,thx_Error)) return err;
	return new thx_error_ErrorWrapper("" + Std.string(err),err,null,pos);
};
thx_Error.__super__ = Error;
thx_Error.prototype = $extend(Error.prototype,{
	pos: null
	,stackItems: null
	,toString: function() {
		return this.message + "\nfrom: " + this.pos.className + "." + this.pos.methodName + "() at " + this.pos.lineNumber + "\n\n" + haxe_CallStack.toString(this.stackItems);
	}
	,__class__: thx_Error
});
var thx_Functions0 = function() { };
thx_Functions0.__name__ = ["thx","Functions0"];
thx_Functions0.after = function(callback,n) {
	return function() {
		if(--n == 0) callback();
	};
};
thx_Functions0.join = function(fa,fb) {
	return function() {
		fa();
		fb();
	};
};
thx_Functions0.once = function(f) {
	return function() {
		var t = f;
		f = thx_Functions.noop;
		t();
	};
};
thx_Functions0.negate = function(callback) {
	return function() {
		return !callback();
	};
};
thx_Functions0.times = function(n,callback) {
	return function() {
		return thx_Ints.range(n).map(function(_) {
			return callback();
		});
	};
};
thx_Functions0.timesi = function(n,callback) {
	return function() {
		return thx_Ints.range(n).map(function(i) {
			return callback(i);
		});
	};
};
var thx_Functions1 = function() { };
thx_Functions1.__name__ = ["thx","Functions1"];
thx_Functions1.compose = function(fa,fb) {
	return function(v) {
		return fa(fb(v));
	};
};
thx_Functions1.join = function(fa,fb) {
	return function(v) {
		fa(v);
		fb(v);
	};
};
thx_Functions1.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v) {
		return "" + Std.string(v);
	};
	var map = new haxe_ds_StringMap();
	return function(v1) {
		var key = resolver(v1);
		if(map.exists(key)) return map.get(key);
		var result = callback(v1);
		map.set(key,result);
		return result;
	};
};
thx_Functions1.negate = function(callback) {
	return function(v) {
		return !callback(v);
	};
};
thx_Functions1.noop = function(_) {
};
thx_Functions1.times = function(n,callback) {
	return function(value) {
		return thx_Ints.range(n).map(function(_) {
			return callback(value);
		});
	};
};
thx_Functions1.timesi = function(n,callback) {
	return function(value) {
		return thx_Ints.range(n).map(function(i) {
			return callback(value,i);
		});
	};
};
thx_Functions1.swapArguments = function(callback) {
	return function(a2,a1) {
		return callback(a1,a2);
	};
};
var thx_Functions2 = function() { };
thx_Functions2.__name__ = ["thx","Functions2"];
thx_Functions2.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v1,v2) {
		return "" + Std.string(v1) + ":" + Std.string(v2);
	};
	var map = new haxe_ds_StringMap();
	return function(v11,v21) {
		var key = resolver(v11,v21);
		if(map.exists(key)) return map.get(key);
		var result = callback(v11,v21);
		map.set(key,result);
		return result;
	};
};
thx_Functions2.negate = function(callback) {
	return function(v1,v2) {
		return !callback(v1,v2);
	};
};
var thx_Functions3 = function() { };
thx_Functions3.__name__ = ["thx","Functions3"];
thx_Functions3.memoize = function(callback,resolver) {
	if(null == resolver) resolver = function(v1,v2,v3) {
		return "" + Std.string(v1) + ":" + Std.string(v2) + ":" + Std.string(v3);
	};
	var map = new haxe_ds_StringMap();
	return function(v11,v21,v31) {
		var key = resolver(v11,v21,v31);
		if(map.exists(key)) return map.get(key);
		var result = callback(v11,v21,v31);
		map.set(key,result);
		return result;
	};
};
thx_Functions3.negate = function(callback) {
	return function(v1,v2,v3) {
		return !callback(v1,v2,v3);
	};
};
var thx_Functions = function() { };
thx_Functions.__name__ = ["thx","Functions"];
thx_Functions.constant = function(v) {
	return function() {
		return v;
	};
};
thx_Functions.equality = function(a,b) {
	return a == b;
};
thx_Functions.identity = function(value) {
	return value;
};
thx_Functions.noop = function() {
};
var thx_Ints = function() { };
thx_Ints.__name__ = ["thx","Ints"];
thx_Ints.abs = function(v) {
	if(v < 0) return -v; else return v;
};
thx_Ints.canParse = function(s) {
	return thx_Ints.pattern_parse.match(s);
};
thx_Ints.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
};
thx_Ints.clampSym = function(v,max) {
	return thx_Ints.clamp(v,-max,max);
};
thx_Ints.compare = function(a,b) {
	return a - b;
};
thx_Ints.interpolate = function(f,a,b) {
	return Math.round(a + (b - a) * f);
};
thx_Ints.isEven = function(v) {
	return v % 2 == 0;
};
thx_Ints.isOdd = function(v) {
	return v % 2 != 0;
};
thx_Ints.max = function(a,b) {
	if(a > b) return a; else return b;
};
thx_Ints.min = function(a,b) {
	if(a < b) return a; else return b;
};
thx_Ints.parse = function(s,base) {
	var v = parseInt(s,base);
	if(isNaN(v)) return null; else return v;
};
thx_Ints.random = function(min,max) {
	if(min == null) min = 0;
	return Std.random(max + 1) + min;
};
thx_Ints.range = function(start,stop,step) {
	if(step == null) step = 1;
	if(null == stop) {
		stop = start;
		start = 0;
	}
	if((stop - start) / step == Infinity) throw new js__$Boot_HaxeError("infinite range");
	var range = [];
	var i = -1;
	var j;
	if(step < 0) while((j = start + step * ++i) > stop) range.push(j); else while((j = start + step * ++i) < stop) range.push(j);
	return range;
};
thx_Ints.toString = function(value,base) {
	return value.toString(base);
};
thx_Ints.toBool = function(v) {
	return v != 0;
};
thx_Ints.sign = function(value) {
	if(value < 0) return -1; else return 1;
};
thx_Ints.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
};
var thx_Iterables = function() { };
thx_Iterables.__name__ = ["thx","Iterables"];
thx_Iterables.all = function(it,predicate) {
	return thx_Iterators.all($iterator(it)(),predicate);
};
thx_Iterables.any = function(it,predicate) {
	return thx_Iterators.any($iterator(it)(),predicate);
};
thx_Iterables.eachPair = function(it,handler) {
	thx_Iterators.eachPair($iterator(it)(),handler);
	return;
};
thx_Iterables.filter = function(it,predicate) {
	return thx_Iterators.filter($iterator(it)(),predicate);
};
thx_Iterables.find = function(it,predicate) {
	return thx_Iterators.find($iterator(it)(),predicate);
};
thx_Iterables.first = function(it) {
	return thx_Iterators.first($iterator(it)());
};
thx_Iterables.last = function(it) {
	return thx_Iterators.last($iterator(it)());
};
thx_Iterables.isEmpty = function(it) {
	return thx_Iterators.isEmpty($iterator(it)());
};
thx_Iterables.isIterable = function(v) {
	var fields;
	if(thx_Types.isAnonymousObject(v)) fields = Reflect.fields(v); else fields = Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"iterator")) return false;
	return Reflect.isFunction(Reflect.field(v,"iterator"));
};
thx_Iterables.map = function(it,f) {
	return thx_Iterators.map($iterator(it)(),f);
};
thx_Iterables.mapi = function(it,f) {
	return thx_Iterators.mapi($iterator(it)(),f);
};
thx_Iterables.order = function(it,sort) {
	return thx_Iterators.order($iterator(it)(),sort);
};
thx_Iterables.reduce = function(it,callback,initial) {
	return thx_Iterators.reduce($iterator(it)(),callback,initial);
};
thx_Iterables.reducei = function(it,callback,initial) {
	return thx_Iterators.reducei($iterator(it)(),callback,initial);
};
thx_Iterables.toArray = function(it) {
	return thx_Iterators.toArray($iterator(it)());
};
thx_Iterables.unzip = function(it) {
	return thx_Iterators.unzip($iterator(it)());
};
thx_Iterables.unzip3 = function(it) {
	return thx_Iterators.unzip3($iterator(it)());
};
thx_Iterables.unzip4 = function(it) {
	return thx_Iterators.unzip4($iterator(it)());
};
thx_Iterables.unzip5 = function(it) {
	return thx_Iterators.unzip5($iterator(it)());
};
thx_Iterables.zip = function(it1,it2) {
	return thx_Iterators.zip($iterator(it1)(),$iterator(it2)());
};
thx_Iterables.zip3 = function(it1,it2,it3) {
	return thx_Iterators.zip3($iterator(it1)(),$iterator(it2)(),$iterator(it3)());
};
thx_Iterables.zip4 = function(it1,it2,it3,it4) {
	return thx_Iterators.zip4($iterator(it1)(),$iterator(it2)(),$iterator(it3)(),$iterator(it4)());
};
thx_Iterables.zip5 = function(it1,it2,it3,it4,it5) {
	return thx_Iterators.zip5($iterator(it1)(),$iterator(it2)(),$iterator(it3)(),$iterator(it4)(),$iterator(it5)());
};
var thx_Iterators = function() { };
thx_Iterators.__name__ = ["thx","Iterators"];
thx_Iterators.all = function(it,predicate) {
	while( it.hasNext() ) {
		var item = it.next();
		if(!predicate(item)) return false;
	}
	return true;
};
thx_Iterators.any = function(it,predicate) {
	while( it.hasNext() ) {
		var item = it.next();
		if(predicate(item)) return true;
	}
	return false;
};
thx_Iterators.eachPair = function(it,handler) {
	thx_Arrays.eachPair(thx_Iterators.toArray(it),handler);
};
thx_Iterators.filter = function(it,predicate) {
	return thx_Iterators.reduce(it,function(acc,item) {
		if(predicate(item)) acc.push(item);
		return acc;
	},[]);
};
thx_Iterators.find = function(it,f) {
	while( it.hasNext() ) {
		var item = it.next();
		if(f(item)) return item;
	}
	return null;
};
thx_Iterators.first = function(it) {
	if(it.hasNext()) return it.next(); else return null;
};
thx_Iterators.isEmpty = function(it) {
	return !it.hasNext();
};
thx_Iterators.isIterator = function(v) {
	var fields;
	if(thx_Types.isAnonymousObject(v)) fields = Reflect.fields(v); else fields = Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"next") || !Lambda.has(fields,"hasNext")) return false;
	return Reflect.isFunction(Reflect.field(v,"next")) && Reflect.isFunction(Reflect.field(v,"hasNext"));
};
thx_Iterators.last = function(it) {
	var buf = null;
	while(it.hasNext()) buf = it.next();
	return buf;
};
thx_Iterators.map = function(it,f) {
	var acc = [];
	while( it.hasNext() ) {
		var v = it.next();
		acc.push(f(v));
	}
	return acc;
};
thx_Iterators.mapi = function(it,f) {
	var acc = [];
	var i = 0;
	while( it.hasNext() ) {
		var v = it.next();
		acc.push(f(v,i++));
	}
	return acc;
};
thx_Iterators.order = function(it,sort) {
	var n = thx_Iterators.toArray(it);
	n.sort(sort);
	return n;
};
thx_Iterators.reduce = function(it,callback,initial) {
	thx_Iterators.map(it,function(v) {
		initial = callback(initial,v);
	});
	return initial;
};
thx_Iterators.reducei = function(it,callback,initial) {
	thx_Iterators.mapi(it,function(v,i) {
		initial = callback(initial,v,i);
	});
	return initial;
};
thx_Iterators.toArray = function(it) {
	var items = [];
	while( it.hasNext() ) {
		var item = it.next();
		items.push(item);
	}
	return items;
};
thx_Iterators.unzip = function(it) {
	var a1 = [];
	var a2 = [];
	thx_Iterators.map(it,function(t) {
		a1.push(t._0);
		a2.push(t._1);
	});
	return { _0 : a1, _1 : a2};
};
thx_Iterators.unzip3 = function(it) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	thx_Iterators.map(it,function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
	});
	return { _0 : a1, _1 : a2, _2 : a3};
};
thx_Iterators.unzip4 = function(it) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	thx_Iterators.map(it,function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
		a4.push(t._3);
	});
	return { _0 : a1, _1 : a2, _2 : a3, _3 : a4};
};
thx_Iterators.unzip5 = function(it) {
	var a1 = [];
	var a2 = [];
	var a3 = [];
	var a4 = [];
	var a5 = [];
	thx_Iterators.map(it,function(t) {
		a1.push(t._0);
		a2.push(t._1);
		a3.push(t._2);
		a4.push(t._3);
		a5.push(t._4);
	});
	return { _0 : a1, _1 : a2, _2 : a3, _3 : a4, _4 : a5};
};
thx_Iterators.zip = function(it1,it2) {
	var array = [];
	while(it1.hasNext() && it2.hasNext()) array.push((function($this) {
		var $r;
		var _0 = it1.next();
		var _1 = it2.next();
		$r = { _0 : _0, _1 : _1};
		return $r;
	}(this)));
	return array;
};
thx_Iterators.zip3 = function(it1,it2,it3) {
	var array = [];
	while(it1.hasNext() && it2.hasNext() && it3.hasNext()) array.push((function($this) {
		var $r;
		var _0 = it1.next();
		var _1 = it2.next();
		var _2 = it3.next();
		$r = { _0 : _0, _1 : _1, _2 : _2};
		return $r;
	}(this)));
	return array;
};
thx_Iterators.zip4 = function(it1,it2,it3,it4) {
	var array = [];
	while(it1.hasNext() && it2.hasNext() && it3.hasNext() && it4.hasNext()) array.push((function($this) {
		var $r;
		var _0 = it1.next();
		var _1 = it2.next();
		var _2 = it3.next();
		var _3 = it4.next();
		$r = { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
		return $r;
	}(this)));
	return array;
};
thx_Iterators.zip5 = function(it1,it2,it3,it4,it5) {
	var array = [];
	while(it1.hasNext() && it2.hasNext() && it3.hasNext() && it4.hasNext() && it5.hasNext()) array.push((function($this) {
		var $r;
		var _0 = it1.next();
		var _1 = it2.next();
		var _2 = it3.next();
		var _3 = it4.next();
		var _4 = it5.next();
		$r = { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4};
		return $r;
	}(this)));
	return array;
};
var thx_Maps = function() { };
thx_Maps.__name__ = ["thx","Maps"];
thx_Maps.tuples = function(map) {
	return thx_Iterators.map(map.keys(),function(key) {
		var _1 = map.get(key);
		return { _0 : key, _1 : _1};
	});
};
thx_Maps.mapToObject = function(map) {
	return thx_Arrays.reduce(thx_Maps.tuples(map),function(o,t) {
		Reflect.setField(o,t._0,t._1);
		return o;
	},{ });
};
thx_Maps.getAlt = function(map,key,alt) {
	var v = map.get(key);
	if(null == v) return alt; else return v;
};
thx_Maps.isMap = function(v) {
	return Std["is"](v,haxe_IMap);
};
var thx_Nil = { __ename__ : ["thx","Nil"], __constructs__ : ["nil"] };
thx_Nil.nil = ["nil",0];
thx_Nil.nil.toString = $estr;
thx_Nil.nil.__enum__ = thx_Nil;
var thx_Objects = function() { };
thx_Objects.__name__ = ["thx","Objects"];
thx_Objects.isEmpty = function(o) {
	return thx_Objects.size(o) == 0;
};
thx_Objects.exists = function(o,name) {
	return Reflect.hasField(o,name);
};
thx_Objects.fields = function(o) {
	return Reflect.fields(o);
};
thx_Objects.merge = function(to,from,replacef) {
	if(null == replacef) replacef = function(field,oldv,newv) {
		return newv;
	};
	var _g = 0;
	var _g1 = Reflect.fields(from);
	while(_g < _g1.length) {
		var field1 = _g1[_g];
		++_g;
		var newv1 = Reflect.field(from,field1);
		if(Reflect.hasField(to,field1)) Reflect.setField(to,field1,replacef(field1,Reflect.field(to,field1),newv1)); else Reflect.setField(to,field1,newv1);
	}
	return to;
};
thx_Objects.copyTo = function(src,dst,cloneInstances) {
	if(cloneInstances == null) cloneInstances = false;
	var _g = 0;
	var _g1 = Reflect.fields(src);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		var sv = thx_Dynamics.clone(Reflect.field(src,field),cloneInstances);
		var dv = Reflect.field(dst,field);
		if(thx_Types.isAnonymousObject(sv) && thx_Types.isAnonymousObject(dv)) thx_Objects.copyTo(sv,dv); else Reflect.setField(dst,field,sv);
	}
	return dst;
};
thx_Objects.clone = function(src,cloneInstances) {
	if(cloneInstances == null) cloneInstances = false;
	return thx_Dynamics.clone(src,cloneInstances);
};
thx_Objects.objectToMap = function(o) {
	return thx_Arrays.reduce(thx_Objects.tuples(o),function(map,t) {
		var value = t._1;
		map.set(t._0,value);
		return map;
	},new haxe_ds_StringMap());
};
thx_Objects.size = function(o) {
	return Reflect.fields(o).length;
};
thx_Objects.values = function(o) {
	return Reflect.fields(o).map(function(key) {
		return Reflect.field(o,key);
	});
};
thx_Objects.tuples = function(o) {
	return Reflect.fields(o).map(function(key) {
		var _1 = Reflect.field(o,key);
		return { _0 : key, _1 : _1};
	});
};
thx_Objects.hasPath = function(o,path) {
	var paths = path.split(".");
	var current = o;
	var _g = 0;
	while(_g < paths.length) {
		var currentPath = paths[_g];
		++_g;
		if(thx_Strings.isDigitsOnly(currentPath)) {
			var index = Std.parseInt(currentPath);
			var arr = Std.instance(current,Array);
			if(null == arr || arr.length <= index) return false;
			current = arr[index];
		} else if(Reflect.hasField(current,currentPath)) current = Reflect.field(current,currentPath); else return false;
	}
	return true;
};
thx_Objects.hasPathValue = function(o,path) {
	return thx_Objects.getPath(o,path) != null;
};
thx_Objects.getPath = function(o,path) {
	var paths = path.split(".");
	var current = o;
	var _g = 0;
	while(_g < paths.length) {
		var currentPath = paths[_g];
		++_g;
		if(thx_Strings.isDigitsOnly(currentPath)) {
			var index = Std.parseInt(currentPath);
			var arr = Std.instance(current,Array);
			if(null == arr) return null;
			current = arr[index];
		} else if(Reflect.hasField(current,currentPath)) current = Reflect.field(current,currentPath); else return null;
	}
	return current;
};
thx_Objects.setPath = function(o,path,val) {
	var paths = path.split(".");
	var current = o;
	var _g1 = 0;
	var _g = paths.length - 1;
	while(_g1 < _g) {
		var i = _g1++;
		var currentPath = paths[i];
		var nextPath = paths[i + 1];
		if(thx_Strings.isDigitsOnly(currentPath)) {
			var index = Std.parseInt(currentPath);
			if(current[index] == null) {
				if(thx_Strings.isDigitsOnly(nextPath)) current[index] = []; else current[index] = { };
			}
			current = current[index];
		} else {
			if(!Reflect.hasField(current,currentPath)) {
				if(thx_Strings.isDigitsOnly(nextPath)) Reflect.setField(current,currentPath,[]); else Reflect.setField(current,currentPath,{ });
			}
			current = Reflect.field(current,currentPath);
		}
	}
	var p = thx_Arrays.last(paths);
	if(thx_Strings.isDigitsOnly(p)) {
		var index1 = Std.parseInt(p);
		current[index1] = val;
	} else Reflect.setField(current,p,val);
	return o;
};
thx_Objects.removePath = function(o,path) {
	var paths = path.split(".");
	var target = paths.pop();
	try {
		var sub = thx_Arrays.reduce(paths,function(existing,nextPath) {
			if(thx_Strings.isDigitsOnly(nextPath)) {
				var current = existing;
				var index = Std.parseInt(nextPath);
				return current[index];
			} else return Reflect.field(existing,nextPath);
		},o);
		if(null != sub) Reflect.deleteField(sub,target);
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
	}
	return o;
};
var thx_Strings = function() { };
thx_Strings.__name__ = ["thx","Strings"];
thx_Strings.after = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return ""; else return value.substring(pos + searchFor.length);
};
thx_Strings.capitalize = function(s) {
	return s.substring(0,1).toUpperCase() + s.substring(1);
};
thx_Strings.capitalizeWords = function(value,whiteSpaceOnly) {
	if(whiteSpaceOnly == null) whiteSpaceOnly = false;
	if(whiteSpaceOnly) return thx_Strings.UCWORDSWS.map(thx_Strings.capitalize(value),thx_Strings.upperMatch); else return thx_Strings.UCWORDS.map(thx_Strings.capitalize(value),thx_Strings.upperMatch);
};
thx_Strings.collapse = function(value) {
	return thx_Strings.WSG.replace(StringTools.trim(value)," ");
};
thx_Strings.compare = function(a,b) {
	if(a < b) return -1; else if(a > b) return 1; else return 0;
};
thx_Strings.contains = function(s,test) {
	return s.indexOf(test) >= 0;
};
thx_Strings.containsAny = function(s,tests) {
	return thx_Arrays.any(tests,(function(f,s1) {
		return function(a1) {
			return f(s1,a1);
		};
	})(thx_Strings.contains,s));
};
thx_Strings.dasherize = function(s) {
	return StringTools.replace(s,"_","-");
};
thx_Strings.ellipsis = function(s,maxlen,symbol) {
	if(symbol == null) symbol = "...";
	if(maxlen == null) maxlen = 20;
	if(s.length > maxlen) return s.substring(0,symbol.length > maxlen - symbol.length?symbol.length:maxlen - symbol.length) + symbol; else return s;
};
thx_Strings.filter = function(s,predicate) {
	return thx_Strings.toArray(s).filter(predicate).join("");
};
thx_Strings.filterCharcode = function(s,predicate) {
	return thx_Strings.toCharcodeArray(s).filter(predicate).map(function(i) {
		return String.fromCharCode(i);
	}).join("");
};
thx_Strings.from = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return ""; else return value.substring(pos);
};
thx_Strings.humanize = function(s) {
	return StringTools.replace(thx_Strings.underscore(s),"_"," ");
};
thx_Strings.isAlphaNum = function(value) {
	return thx_Strings.ALPHANUM.match(value);
};
thx_Strings.isLowerCase = function(value) {
	return value.toLowerCase() == value;
};
thx_Strings.isUpperCase = function(value) {
	return value.toUpperCase() == value;
};
thx_Strings.ifEmpty = function(value,alt) {
	if(null != value && "" != value) return value; else return alt;
};
thx_Strings.isDigitsOnly = function(value) {
	return thx_Strings.DIGITS.match(value);
};
thx_Strings.isEmpty = function(value) {
	return value == null || value == "";
};
thx_Strings.random = function(value,length) {
	if(length == null) length = 1;
	var pos = Math.floor((value.length - length + 1) * Math.random());
	return HxOverrides.substr(value,pos,length);
};
thx_Strings.iterator = function(s) {
	var _this = s.split("");
	return HxOverrides.iter(_this);
};
thx_Strings.map = function(value,callback) {
	return thx_Strings.toArray(value).map(callback);
};
thx_Strings.remove = function(value,toremove) {
	return StringTools.replace(value,toremove,"");
};
thx_Strings.removeAfter = function(value,toremove) {
	if(StringTools.endsWith(value,toremove)) return value.substring(0,value.length - toremove.length); else return value;
};
thx_Strings.removeBefore = function(value,toremove) {
	if(StringTools.startsWith(value,toremove)) return value.substring(toremove.length); else return value;
};
thx_Strings.repeat = function(s,times) {
	return ((function($this) {
		var $r;
		var _g = [];
		{
			var _g1 = 0;
			while(_g1 < times) {
				var i = _g1++;
				_g.push(s);
			}
		}
		$r = _g;
		return $r;
	}(this))).join("");
};
thx_Strings.reverse = function(s) {
	var arr = s.split("");
	arr.reverse();
	return arr.join("");
};
thx_Strings.stripTags = function(s) {
	return thx_Strings.STRIPTAGS.replace(s,"");
};
thx_Strings.surround = function(s,left,right) {
	return "" + left + s + (null == right?left:right);
};
thx_Strings.toArray = function(s) {
	return s.split("");
};
thx_Strings.toCharcodeArray = function(s) {
	return thx_Strings.map(s,function(s1) {
		return HxOverrides.cca(s1,0);
	});
};
thx_Strings.toChunks = function(s,len) {
	var chunks = [];
	while(s.length > 0) {
		chunks.push(s.substring(0,len));
		s = s.substring(len);
	}
	return chunks;
};
thx_Strings.trimChars = function(value,charlist) {
	return thx_Strings.trimCharsRight(thx_Strings.trimCharsLeft(value,charlist),charlist);
};
thx_Strings.trimCharsLeft = function(value,charlist) {
	var pos = 0;
	var _g1 = 0;
	var _g = value.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(thx_Strings.contains(charlist,value.charAt(i))) pos++; else break;
	}
	return value.substring(pos);
};
thx_Strings.trimCharsRight = function(value,charlist) {
	var len = value.length;
	var pos = len;
	var i;
	var _g = 0;
	while(_g < len) {
		var j = _g++;
		i = len - j - 1;
		if(thx_Strings.contains(charlist,value.charAt(i))) pos = i; else break;
	}
	return value.substring(0,pos);
};
thx_Strings.underscore = function(s) {
	s = new EReg("::","g").replace(s,"/");
	s = new EReg("([A-Z]+)([A-Z][a-z])","g").replace(s,"$1_$2");
	s = new EReg("([a-z\\d])([A-Z])","g").replace(s,"$1_$2");
	s = new EReg("-","g").replace(s,"_");
	return s.toLowerCase();
};
thx_Strings.upTo = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return value; else return value.substring(0,pos);
};
thx_Strings.wrapColumns = function(s,columns,indent,newline) {
	if(newline == null) newline = "\n";
	if(indent == null) indent = "";
	if(columns == null) columns = 78;
	return thx_Strings.SPLIT_LINES.split(s).map(function(part) {
		return thx_Strings.wrapLine(StringTools.trim(thx_Strings.WSG.replace(part," ")),columns,indent,newline);
	}).join(newline);
};
thx_Strings.upperMatch = function(re) {
	return re.matched(0).toUpperCase();
};
thx_Strings.wrapLine = function(s,columns,indent,newline) {
	var parts = [];
	var pos = 0;
	var len = s.length;
	var ilen = indent.length;
	columns -= ilen;
	while(true) {
		if(pos + columns >= len - ilen) {
			parts.push(s.substring(pos));
			break;
		}
		var i = 0;
		while(!StringTools.isSpace(s,pos + columns - i) && i < columns) i++;
		if(i == columns) {
			i = 0;
			while(!StringTools.isSpace(s,pos + columns + i) && pos + columns + i < len) i++;
			parts.push(s.substring(pos,pos + columns + i));
			pos += columns + i + 1;
		} else {
			parts.push(s.substring(pos,pos + columns - i));
			pos += columns - i + 1;
		}
	}
	return indent + parts.join(newline + indent);
};
var thx__$Tuple_Tuple0_$Impl_$ = {};
thx__$Tuple_Tuple0_$Impl_$.__name__ = ["thx","_Tuple","Tuple0_Impl_"];
thx__$Tuple_Tuple0_$Impl_$._new = function() {
	return thx_Nil.nil;
};
thx__$Tuple_Tuple0_$Impl_$["with"] = function(this1,v) {
	return v;
};
thx__$Tuple_Tuple0_$Impl_$.toString = function(this1) {
	return "Tuple0()";
};
thx__$Tuple_Tuple0_$Impl_$.toNil = function(this1) {
	return this1;
};
thx__$Tuple_Tuple0_$Impl_$.nilToTuple = function(v) {
	return thx_Nil.nil;
};
var thx__$Tuple_Tuple1_$Impl_$ = {};
thx__$Tuple_Tuple1_$Impl_$.__name__ = ["thx","_Tuple","Tuple1_Impl_"];
thx__$Tuple_Tuple1_$Impl_$._new = function(_0) {
	return _0;
};
thx__$Tuple_Tuple1_$Impl_$.get__0 = function(this1) {
	return this1;
};
thx__$Tuple_Tuple1_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1, _1 : v};
};
thx__$Tuple_Tuple1_$Impl_$.toString = function(this1) {
	return "Tuple1(" + Std.string(this1) + ")";
};
thx__$Tuple_Tuple1_$Impl_$.arrayToTuple = function(v) {
	return v[0];
};
var thx__$Tuple_Tuple2_$Impl_$ = {};
thx__$Tuple_Tuple2_$Impl_$.__name__ = ["thx","_Tuple","Tuple2_Impl_"];
thx__$Tuple_Tuple2_$Impl_$._new = function(_0,_1) {
	return { _0 : _0, _1 : _1};
};
thx__$Tuple_Tuple2_$Impl_$.get_left = function(this1) {
	return this1._0;
};
thx__$Tuple_Tuple2_$Impl_$.get_right = function(this1) {
	return this1._1;
};
thx__$Tuple_Tuple2_$Impl_$.flip = function(this1) {
	return { _0 : this1._1, _1 : this1._0};
};
thx__$Tuple_Tuple2_$Impl_$.dropLeft = function(this1) {
	return this1._1;
};
thx__$Tuple_Tuple2_$Impl_$.dropRight = function(this1) {
	return this1._0;
};
thx__$Tuple_Tuple2_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : v};
};
thx__$Tuple_Tuple2_$Impl_$.toString = function(this1) {
	return "Tuple2(" + Std.string(this1._0) + "," + Std.string(this1._1) + ")";
};
thx__$Tuple_Tuple2_$Impl_$.arrayToTuple2 = function(v) {
	return { _0 : v[0], _1 : v[1]};
};
var thx__$Tuple_Tuple3_$Impl_$ = {};
thx__$Tuple_Tuple3_$Impl_$.__name__ = ["thx","_Tuple","Tuple3_Impl_"];
thx__$Tuple_Tuple3_$Impl_$._new = function(_0,_1,_2) {
	return { _0 : _0, _1 : _1, _2 : _2};
};
thx__$Tuple_Tuple3_$Impl_$.flip = function(this1) {
	return { _0 : this1._2, _1 : this1._1, _2 : this1._0};
};
thx__$Tuple_Tuple3_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2};
};
thx__$Tuple_Tuple3_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1};
};
thx__$Tuple_Tuple3_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : v};
};
thx__$Tuple_Tuple3_$Impl_$.toString = function(this1) {
	return "Tuple3(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + ")";
};
thx__$Tuple_Tuple3_$Impl_$.arrayToTuple3 = function(v) {
	return { _0 : v[0], _1 : v[1], _2 : v[2]};
};
var thx__$Tuple_Tuple4_$Impl_$ = {};
thx__$Tuple_Tuple4_$Impl_$.__name__ = ["thx","_Tuple","Tuple4_Impl_"];
thx__$Tuple_Tuple4_$Impl_$._new = function(_0,_1,_2,_3) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3};
};
thx__$Tuple_Tuple4_$Impl_$.flip = function(this1) {
	return { _0 : this1._3, _1 : this1._2, _2 : this1._1, _3 : this1._0};
};
thx__$Tuple_Tuple4_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3};
};
thx__$Tuple_Tuple4_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2};
};
thx__$Tuple_Tuple4_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : v};
};
thx__$Tuple_Tuple4_$Impl_$.toString = function(this1) {
	return "Tuple4(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + ")";
};
thx__$Tuple_Tuple4_$Impl_$.arrayToTuple4 = function(v) {
	return { _0 : v[0], _1 : v[1], _2 : v[2], _3 : v[3]};
};
var thx__$Tuple_Tuple5_$Impl_$ = {};
thx__$Tuple_Tuple5_$Impl_$.__name__ = ["thx","_Tuple","Tuple5_Impl_"];
thx__$Tuple_Tuple5_$Impl_$._new = function(_0,_1,_2,_3,_4) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4};
};
thx__$Tuple_Tuple5_$Impl_$.flip = function(this1) {
	return { _0 : this1._4, _1 : this1._3, _2 : this1._2, _3 : this1._1, _4 : this1._0};
};
thx__$Tuple_Tuple5_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3, _3 : this1._4};
};
thx__$Tuple_Tuple5_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3};
};
thx__$Tuple_Tuple5_$Impl_$["with"] = function(this1,v) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : this1._4, _5 : v};
};
thx__$Tuple_Tuple5_$Impl_$.toString = function(this1) {
	return "Tuple5(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + "," + Std.string(this1._4) + ")";
};
thx__$Tuple_Tuple5_$Impl_$.arrayToTuple5 = function(v) {
	return { _0 : v[0], _1 : v[1], _2 : v[2], _3 : v[3], _4 : v[4]};
};
var thx__$Tuple_Tuple6_$Impl_$ = {};
thx__$Tuple_Tuple6_$Impl_$.__name__ = ["thx","_Tuple","Tuple6_Impl_"];
thx__$Tuple_Tuple6_$Impl_$._new = function(_0,_1,_2,_3,_4,_5) {
	return { _0 : _0, _1 : _1, _2 : _2, _3 : _3, _4 : _4, _5 : _5};
};
thx__$Tuple_Tuple6_$Impl_$.flip = function(this1) {
	return { _0 : this1._5, _1 : this1._4, _2 : this1._3, _3 : this1._2, _4 : this1._1, _5 : this1._0};
};
thx__$Tuple_Tuple6_$Impl_$.dropLeft = function(this1) {
	return { _0 : this1._1, _1 : this1._2, _2 : this1._3, _3 : this1._4, _4 : this1._5};
};
thx__$Tuple_Tuple6_$Impl_$.dropRight = function(this1) {
	return { _0 : this1._0, _1 : this1._1, _2 : this1._2, _3 : this1._3, _4 : this1._4};
};
thx__$Tuple_Tuple6_$Impl_$.toString = function(this1) {
	return "Tuple6(" + Std.string(this1._0) + "," + Std.string(this1._1) + "," + Std.string(this1._2) + "," + Std.string(this1._3) + "," + Std.string(this1._4) + "," + Std.string(this1._5) + ")";
};
thx__$Tuple_Tuple6_$Impl_$.arrayToTuple6 = function(v) {
	return { _0 : v[0], _1 : v[1], _2 : v[2], _3 : v[3], _4 : v[4], _5 : v[5]};
};
var thx_Types = function() { };
thx_Types.__name__ = ["thx","Types"];
thx_Types.isAnonymousObject = function(v) {
	return Reflect.isObject(v) && null == Type.getClass(v);
};
thx_Types.isPrimitive = function(v) {
	{
		var _g = Type["typeof"](v);
		switch(Type.enumIndex(_g)) {
		case 1:case 2:case 3:
			return true;
		case 0:case 5:case 7:case 4:case 8:
			return false;
		case 6:
			var c = _g[2];
			return Type.getClassName(c) == "String";
		}
	}
};
thx_Types.hasSuperClass = function(cls,sup) {
	while(null != cls) {
		if(cls == sup) return true;
		cls = Type.getSuperClass(cls);
	}
	return false;
};
thx_Types.sameType = function(a,b) {
	return thx_Types.valueTypeToString(a) == thx_Types.valueTypeToString(b);
};
thx_Types.typeInheritance = function(type) {
	switch(Type.enumIndex(type)) {
	case 1:
		return ["Int"];
	case 2:
		return ["Float"];
	case 3:
		return ["Bool"];
	case 4:
		return ["{}"];
	case 5:
		return ["Function"];
	case 6:
		var c = type[2];
		var classes = [];
		while(null != c) {
			classes.push(c);
			c = Type.getSuperClass(c);
		}
		return classes.map(Type.getClassName);
	case 7:
		var e = type[2];
		return [Type.getEnumName(e)];
	default:
		throw new js__$Boot_HaxeError("invalid type " + Std.string(type));
	}
};
thx_Types.typeToString = function(type) {
	switch(Type.enumIndex(type)) {
	case 0:
		return "Null";
	case 1:
		return "Int";
	case 2:
		return "Float";
	case 3:
		return "Bool";
	case 4:
		return "{}";
	case 5:
		return "Function";
	case 6:
		var c = type[2];
		return Type.getClassName(c);
	case 7:
		var e = type[2];
		return Type.getEnumName(e);
	default:
		throw new js__$Boot_HaxeError("invalid type " + Std.string(type));
	}
};
thx_Types.valueTypeInheritance = function(value) {
	return thx_Types.typeInheritance(Type["typeof"](value));
};
thx_Types.valueTypeToString = function(value) {
	return thx_Types.typeToString(Type["typeof"](value));
};
var thx_error_ErrorWrapper = function(message,innerError,stack,pos) {
	thx_Error.call(this,message,stack,pos);
	this.innerError = innerError;
};
thx_error_ErrorWrapper.__name__ = ["thx","error","ErrorWrapper"];
thx_error_ErrorWrapper.__super__ = thx_Error;
thx_error_ErrorWrapper.prototype = $extend(thx_Error.prototype,{
	innerError: null
	,__class__: thx_error_ErrorWrapper
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var __map_reserved = {}

      // Production steps of ECMA-262, Edition 5, 15.4.4.21
      // Reference: http://es5.github.io/#x15.4.4.21
      if (!Array.prototype.reduce) {
        Array.prototype.reduce = function(callback /*, initialValue*/) {
          'use strict';
          if (this == null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
          }
          if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
          }
          var t = Object(this), len = t.length >>> 0, k = 0, value;
          if (arguments.length == 2) {
            value = arguments[1];
          } else {
            while (k < len && ! k in t) {
              k++;
            }
            if (k >= len) {
              throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
          }
          for (; k < len; k++) {
            if (k in t) {
              value = callback(value, t[k], k, t);
            }
          }
          return value;
        };
      }
    ;
js_Boot.__toStr = {}.toString;
thx_Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
thx_Ints.BASE = "0123456789abcdefghijklmnopqrstuvwxyz";
thx_Strings.UCWORDS = new EReg("[^a-zA-Z]([a-z])","g");
thx_Strings.UCWORDSWS = new EReg("[ \t\r\n][a-z]","g");
thx_Strings.ALPHANUM = new EReg("^[a-z0-9]+$","i");
thx_Strings.DIGITS = new EReg("^[0-9]+$","");
thx_Strings.STRIPTAGS = new EReg("</?[a-z]+[^>]*>","gi");
thx_Strings.WSG = new EReg("[ \t\r\n]+","g");
thx_Strings.SPLIT_LINES = new EReg("\r\n|\n\r|\n|\r","g");
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=gulp-md5-path.debug.js.map
(function (console, $hx_exports) { "use strict";
$hx_exports.promhx = $hx_exports.promhx || {};
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
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
var Vinyl = require("vinyl");
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
FileTools.toMd5 = function(file) {
	var md5 = js_node_Crypto.createHash("md5");
	md5.update(FileTools.toString(file));
	var md5_suffix = md5.digest("hex");
	var splits = file.path.split("/");
	var end = splits.slice(splits.length - 1)[0];
	var basename = end.split(".");
	file.path = "" + splits.slice(0,-1).join("/") + "/" + basename[0] + "-" + md5_suffix + "." + basename.slice(1).join(".");
	return file;
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
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
};
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = $iterator(a)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = $iterator(b)();
	while( $it1.hasNext() ) {
		var x1 = $it1.next();
		l.add(x1);
	}
	return l;
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) return null; else return this.h[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	head: null
	,val: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
var TypePath = { __ename__ : ["TypePath"], __constructs__ : ["http","file","undefined"] };
TypePath.http = function(path) { var $x = ["http",0,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
TypePath.file = function(path) { var $x = ["file",1,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
TypePath.undefined = function(path) { var $x = ["undefined",2,path]; $x.__enum__ = TypePath; $x.toString = $estr; return $x; };
var _$Manifest_Path_$Impl_$ = {};
_$Manifest_Path_$Impl_$.__name__ = ["_Manifest","Path_Impl_"];
_$Manifest_Path_$Impl_$._new = function(s) {
	return s;
};
_$Manifest_Path_$Impl_$.fromString = function(s) {
	return s;
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
var PathTools = function() { };
PathTools.__name__ = ["PathTools"];
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
Math.__name__ = ["Math"];
var manifest = $hx_exports.manifest = function() { };
manifest.__name__ = ["manifest"];
manifest.isJsArray = function(o) {
	return toString.call(o) === "[object Array]";
};
manifest.isJsObject = function(a) {
	return (!!a) && (a.constructor === Object);
};
var ProcessManifest = function() { };
ProcessManifest.__name__ = ["ProcessManifest"];
ProcessManifest.processManifest = function(paths,__return) {
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
			var __endSwitch_1 = (function(__index) {
				return function(__endSwitch_1_parameter_0) {
					__results[__index[0]] = __endSwitch_1_parameter_0;
					__checkCounter();
					return;
				};
			})(__index);
			{
				var _g = PathTools.getType(path);
				switch(Type.enumIndex(_g)) {
				case 0:
					var path1 = _g[2];
					path1;
					__endSwitch_1(path1);
					break;
				case 1:
					var path2 = _g[2];
					haxe_Log.trace(path2,{ fileName : "ProcessManifest.hx", lineNumber : 40, className : "ProcessManifest", methodName : "processManifest"});
					path2;
					__endSwitch_1(path2);
					break;
				default:
					__endSwitch_1(null);
				}
			}
			__i++;
		} while(__iterator < paths.length);
		__checkCounter();
	}
};
ProcessManifest.traverseJson = function(json,__return) {
	var __iterator = 0;
	var __doCount = 0;
	var __break_2 = function() {
		__return(json);
	};
	var __continue_1;
	var __continue_11 = null;
	__continue_11 = function() {
		var __do = function() {
			var __break = function() {
				__break_2();
			};
			var __continue = function() {
				__continue_11();
			};
			if(__doCount++ == 0) do (function(key) {
				key;
				(function(obj) {
					obj;
					var __endIf_0 = function() {
						__continue_11();
						return;
					};
					if(manifest.isJsArray(obj)) (function(__afterVar_6) {
						ProcessManifest.processManifest(obj,function(__parameter_7) {
							__afterVar_6(__parameter_7);
						});
					})(function(new_obj) {
						new_obj;
						json[key] = new_obj;
						__endIf_0();
					}); else if(manifest.isJsObject(obj)) ProcessManifest.traverseJson(obj,function(__parameter_5) {
						__parameter_5;
						__endIf_0();
					}); else __endIf_0();
				})(json[key]);
			})(Reflect.fields(json)[__iterator++]); while(--__doCount != 0);
		};
		if(__iterator < Reflect.fields(json).length) __do(); else __break_2();
	};
	__continue_1 = __continue_11;
	__continue_1();
};
ProcessManifest.map_manifest = function(file,cb) {
	var asyncTest = function(__return) {
		(function(json) {
			json;
			ProcessManifest.traverseJson(json,function(__parameter_8) {
				json = __parameter_8;
				FileTools.setContent(file,JSON.stringify(json));
				cb(null,file);
				__return();
			});
		})(FileTools.toJson(file));
	};
	asyncTest(function() {
	});
};
ProcessManifest.task = function(options) {
	return EventStream.map(ProcessManifest.map_manifest);
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
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var buddy_Buddy = function() { };
buddy_Buddy.__name__ = ["buddy","Buddy"];
var Test = function() { };
Test.__name__ = ["Test"];
Test.__interfaces__ = [buddy_Buddy];
Test.main = function() {
	var reporter = new buddy_reporting_ConsoleReporter();
	var testsRunning = true;
	var runner = new buddy_SuitesRunner([new Tests()],reporter);
	runner.run().then(function(_) {
		if(process.platform == 'win32') { process.once('exit', function() { process.exit(runner.statusCode()); }); } else { process.exit(runner.statusCode()); }
	});
};
var buddy_BuddySuite = function() {
	this.suites = new List();
	this.befores = new List();
	this.afters = new List();
	this.suiteStack = new List();
	this.timeoutMs = 5000;
};
buddy_BuddySuite.__name__ = ["buddy","BuddySuite"];
buddy_BuddySuite.prototype = {
	suites: null
	,befores: null
	,afters: null
	,suiteStack: null
	,timeoutMs: null
	,describe: function(name,addSpecs) {
		this.addSuite(new buddy_Suite(name,this),addSpecs);
	}
	,xdescribe: function(name,addSpecs) {
	}
	,before: function(init) {
		this.syncBefore(init,true);
	}
	,after: function(deinit) {
		this.syncAfter(deinit,true);
	}
	,it: function(desc,test) {
		this.syncIt(desc,test,true);
	}
	,xit: function(desc,test) {
		this.syncXit(desc,test,true);
	}
	,fail: function(desc) {
		if(desc == null) desc = "Manually";
	}
	,failSync: function(test,desc,p) {
		if(desc == null) desc = "Manually";
		var stackItem = [haxe_StackItem.FilePos(null,p.fileName,p.lineNumber)];
		test(false,Std.string(desc),stackItem);
	}
	,addSuite: function(suite,addSpecs) {
		if(this.suiteStack.isEmpty()) this.suites.add(suite); else {
			var current = this.suiteStack.first();
			suite.parent = current;
			current.steps.add(buddy_TestStep.TSuite(suite));
		}
		if(buddy_BuddySuite.includeMode && !suite.include) {
			suite.steps = suite.steps.filter(function(step) {
				switch(Type.enumIndex(step)) {
				case 1:
					var s = step[2];
					return s.include;
				default:
					return true;
				}
			});
			if(suite.steps.length > 0 || suite.parent != null && suite.parent.include) suite.include = true;
		}
		this.suiteStack.push(suite);
		addSpecs();
		this.suiteStack.pop();
	}
	,describeInclude: function(name,addSpecs) {
		buddy_BuddySuite.includeMode = true;
		var suite = new buddy_Suite(name,this);
		suite.include = true;
		this.addSuite(suite,addSpecs);
	}
	,itInclude: function(desc,test) {
		buddy_BuddySuite.includeMode = true;
		this.syncIt(desc,test,true,true);
	}
	,syncItInclude: function(desc,test) {
		buddy_BuddySuite.includeMode = true;
		this.syncIt(desc,test,false,true);
	}
	,beforeDescribe: function(init) {
		this.syncBeforeDescribe(init,true);
	}
	,afterDescribe: function(init) {
		this.syncAfterDescribe(init,true);
	}
	,syncBeforeDescribe: function(init,async) {
		if(async == null) async = false;
		this.befores.add(new buddy_BeforeAfter(init,async));
	}
	,syncAfterDescribe: function(init,async) {
		if(async == null) async = false;
		this.afters.add(new buddy_BeforeAfter(init,async));
	}
	,syncBefore: function(init,async) {
		if(async == null) async = false;
		this.suiteStack.first().before.add(new buddy_BeforeAfter(init,async));
	}
	,syncAfter: function(deinit,async) {
		if(async == null) async = false;
		this.suiteStack.first().after.add(new buddy_BeforeAfter(deinit,async));
	}
	,syncIt: function(desc,test,async,include) {
		if(include == null) include = false;
		if(async == null) async = false;
		var suite = this.suiteStack.first();
		var spec = new buddy_Spec(suite,desc,test,async);
		spec.include = include;
		suite.steps.add(buddy_TestStep.TSpec(spec));
	}
	,syncXit: function(desc,test,async) {
		if(async == null) async = false;
		var suite = this.suiteStack.first();
		var spec = new buddy_Spec(suite,desc,test,async,true);
		suite.steps.add(buddy_TestStep.TSpec(spec));
	}
	,__class__: buddy_BuddySuite
};
var Tests = function() {
	var _g = this;
	buddy_BuddySuite.call(this);
	this.describe("test Md5",function() {
		var file;
		{
			var v = new Vinyl({ cwd : "/", base : "/test/", path : "/test/file.coffee", contents : new js_node_buffer_Buffer("Hello world")});
			file = v;
		}
		_g.syncIt("identity",function(__asyncDone,__status) {
			buddy_ShouldString.should(FileTools.toMd5(file).basename,__status).be("file-3e25960a79dbc69b674cd4ec67a72c62.coffee",{ fileName : "Test.hx", lineNumber : 37, className : "Tests", methodName : "new"});
		});
	});
	this.describe("manifest",function() {
		var fileResult = null;
		_g.before(function(done,__status1) {
			var file1 = VinylTools.toVynil("./test/manifest.json");
			ProcessManifest.map_manifest(file1,function(_,file2) {
				fileResult = file2;
				done();
			});
		});
		_g.syncIt("manifest changed",function(__asyncDone1,__status2) {
			haxe_Log.trace(Utils.pretty(fileResult),{ fileName : "Test.hx", lineNumber : 58, className : "Tests", methodName : "new"});
			buddy_ShouldDynamic.should(TypePath.file,__status2).get_not().be(fileResult,{ fileName : "Test.hx", lineNumber : 59, className : "Tests", methodName : "new"});
		});
	});
};
Tests.__name__ = ["Tests"];
Tests.__super__ = buddy_BuddySuite;
Tests.prototype = $extend(buddy_BuddySuite.prototype,{
	__class__: Tests
});
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
var VinylTools = function() { };
VinylTools.__name__ = ["VinylTools"];
VinylTools.toVynil = function(path) {
	{
		var v = new Vinyl({ cwd : "/", base : PathTools.basePath(path), path : path, contents : new js_node_buffer_Buffer(js_node_Fs.readFileSync(path).toString())});
		return v;
	}
};
var buddy_TestStatus = { __ename__ : ["buddy","TestStatus"], __constructs__ : ["Unknown","Passed","Pending","Failed"] };
buddy_TestStatus.Unknown = ["Unknown",0];
buddy_TestStatus.Unknown.toString = $estr;
buddy_TestStatus.Unknown.__enum__ = buddy_TestStatus;
buddy_TestStatus.Passed = ["Passed",1];
buddy_TestStatus.Passed.toString = $estr;
buddy_TestStatus.Passed.__enum__ = buddy_TestStatus;
buddy_TestStatus.Pending = ["Pending",2];
buddy_TestStatus.Pending.toString = $estr;
buddy_TestStatus.Pending.__enum__ = buddy_TestStatus;
buddy_TestStatus.Failed = ["Failed",3];
buddy_TestStatus.Failed.toString = $estr;
buddy_TestStatus.Failed.__enum__ = buddy_TestStatus;
var buddy_TestStep = { __ename__ : ["buddy","TestStep"], __constructs__ : ["TSuite","TSpec"] };
buddy_TestStep.TSuite = function(s) { var $x = ["TSuite",0,s]; $x.__enum__ = buddy_TestStep; $x.toString = $estr; return $x; };
buddy_TestStep.TSpec = function(s) { var $x = ["TSpec",1,s]; $x.__enum__ = buddy_TestStep; $x.toString = $estr; return $x; };
var buddy_BeforeAfter = function(run,async) {
	if(async == null) async = false;
	this.run = run;
	this.async = async;
};
buddy_BeforeAfter.__name__ = ["buddy","BeforeAfter"];
buddy_BeforeAfter.prototype = {
	async: null
	,run: null
	,__class__: buddy_BeforeAfter
};
var buddy_Suite = function(name,buddySuite) {
	if(name == null) throw new js__$Boot_HaxeError("Suite requires a name.");
	if(buddySuite == null) throw new js__$Boot_HaxeError("Suite requires a BuddySuite.");
	this.name = name;
	this.buddySuite = buddySuite;
	this.before = new List();
	this.after = new List();
	this.steps = new List();
};
buddy_Suite.__name__ = ["buddy","Suite"];
buddy_Suite.prototype = {
	name: null
	,buddySuite: null
	,parent: null
	,include: null
	,steps: null
	,get_specs: function() {
		var output = new List();
		var $it0 = this.steps.iterator();
		while( $it0.hasNext() ) {
			var step = $it0.next();
			switch(Type.enumIndex(step)) {
			case 1:
				var s = step[2];
				output.add(s);
				break;
			default:
			}
		}
		return output;
	}
	,get_suites: function() {
		var output = new List();
		var $it0 = this.steps.iterator();
		while( $it0.hasNext() ) {
			var step = $it0.next();
			switch(Type.enumIndex(step)) {
			case 0:
				var s = step[2];
				output.add(s);
				break;
			default:
			}
		}
		return output;
	}
	,before: null
	,after: null
	,__class__: buddy_Suite
};
var buddy_Spec = function(suite,description,run,async,pending) {
	if(pending == null) pending = false;
	if(async == null) async = false;
	this.suite = suite;
	this.description = description;
	this.run = run;
	this.async = async;
	this.traces = new List();
	if(run == null) this.status = buddy_TestStatus.Pending; else if(pending) this.status = buddy_TestStatus.Pending; else this.status = buddy_TestStatus.Unknown;
};
buddy_Spec.__name__ = ["buddy","Spec"];
buddy_Spec.prototype = {
	suite: null
	,description: null
	,async: null
	,status: null
	,error: null
	,stack: null
	,traces: null
	,include: null
	,run: null
	,setStatus: function(s,err,stack) {
		this.status = s;
		this.error = err;
		this.stack = stack;
	}
	,__class__: buddy_Spec
};
var buddy_Should = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	this.value = value;
	this.assert = assert;
	this.inverse = inverse;
};
buddy_Should.__name__ = ["buddy","Should"];
buddy_Should.prototype = {
	value: null
	,assert: null
	,inverse: null
	,be: function(expected,p) {
		this.test(this.value == expected,p,"Expected " + this.quote(expected) + ", was " + this.quote(this.value),"Didn't expect " + this.quote(expected) + " but was equal to that");
	}
	,beType: function(type,p) {
		this.test(Std["is"](this.value,type),p,"Expected " + this.quote(this.value) + " to be type " + this.quote(type),"Expected " + this.quote(this.value) + " not to be type " + this.quote(type));
	}
	,quote: function(v) {
		if(typeof(v) == "string") return "\"" + Std.string(v) + "\""; else return Std.string(v);
	}
	,stackPos: function(p) {
		return [haxe_StackItem.FilePos(null,p.fileName,p.lineNumber)];
	}
	,test: function(expr,p,error,errorInverted) {
		if(!this.inverse) this.assert(expr,error,this.stackPos(p)); else this.assert(!expr,errorInverted,this.stackPos(p));
	}
	,__class__: buddy_Should
};
var buddy_ShouldDynamic = function(value,assert,inverse) {
	buddy_Should.call(this,value,assert,inverse);
};
buddy_ShouldDynamic.__name__ = ["buddy","ShouldDynamic"];
buddy_ShouldDynamic.should = function(d,assert) {
	return new buddy_ShouldDynamic(d,assert);
};
buddy_ShouldDynamic.__super__ = buddy_Should;
buddy_ShouldDynamic.prototype = $extend(buddy_Should.prototype,{
	get_not: function() {
		return new buddy_ShouldDynamic(this.value,this.assert,!this.inverse);
	}
	,__class__: buddy_ShouldDynamic
});
var buddy_ShouldInt = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	buddy_Should.call(this,value,assert,inverse);
};
buddy_ShouldInt.__name__ = ["buddy","ShouldInt"];
buddy_ShouldInt.should = function(i,assert) {
	return new buddy_ShouldInt(i,assert);
};
buddy_ShouldInt.__super__ = buddy_Should;
buddy_ShouldInt.prototype = $extend(buddy_Should.prototype,{
	get_not: function() {
		return new buddy_ShouldInt(this.value,this.assert,!this.inverse);
	}
	,beLessThan: function(expected,p) {
		this.test(this.value < expected,p,"Expected less than " + this.quote(expected) + ", was " + this.quote(this.value),"Expected not less than " + this.quote(expected) + ", was " + this.quote(this.value));
	}
	,beGreaterThan: function(expected,p) {
		this.test(this.value > expected,p,"Expected greater than " + this.quote(expected) + ", was " + this.quote(this.value),"Expected not greater than " + this.quote(expected) + ", was " + this.quote(this.value));
	}
	,__class__: buddy_ShouldInt
});
var buddy_ShouldFloat = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	buddy_Should.call(this,value,assert,inverse);
};
buddy_ShouldFloat.__name__ = ["buddy","ShouldFloat"];
buddy_ShouldFloat.should = function(i,assert) {
	return new buddy_ShouldFloat(i,assert);
};
buddy_ShouldFloat.__super__ = buddy_Should;
buddy_ShouldFloat.prototype = $extend(buddy_Should.prototype,{
	get_not: function() {
		return new buddy_ShouldFloat(this.value,this.assert,!this.inverse);
	}
	,beLessThan: function(expected,p) {
		this.test(this.value < expected,p,"Expected less than " + this.quote(expected) + ", was " + this.quote(this.value),"Expected not less than " + this.quote(expected) + ", was " + this.quote(this.value));
	}
	,beGreaterThan: function(expected,p) {
		this.test(this.value > expected,p,"Expected greater than " + this.quote(expected) + ", was " + this.quote(this.value),"Expected not greater than " + this.quote(expected) + ", was " + this.quote(this.value));
	}
	,beCloseTo: function(expected,precision,p) {
		if(precision == null) precision = 2;
		var expr = Math.abs(expected - this.value) < Math.pow(10,-precision) / 2;
		this.test(expr,p,"Expected close to " + this.quote(expected) + ", was " + this.quote(this.value),"Expected " + this.quote(this.value) + " not to be close to " + this.quote(expected));
	}
	,__class__: buddy_ShouldFloat
});
var buddy_ShouldString = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	buddy_Should.call(this,value,assert,inverse);
};
buddy_ShouldString.__name__ = ["buddy","ShouldString"];
buddy_ShouldString.should = function(str,assert) {
	return new buddy_ShouldString(str,assert);
};
buddy_ShouldString.__super__ = buddy_Should;
buddy_ShouldString.prototype = $extend(buddy_Should.prototype,{
	get_not: function() {
		return new buddy_ShouldString(this.value,this.assert,!this.inverse);
	}
	,contain: function(substring,p) {
		this.test(this.value.indexOf(substring) >= 0,p,"Expected " + this.quote(this.value) + " to contain " + this.quote(substring),"Expected " + this.quote(this.value) + " not to contain " + this.quote(substring));
	}
	,startWith: function(substring,p) {
		this.test(StringTools.startsWith(this.value,substring),p,"Expected " + this.quote(this.value) + " to start with " + this.quote(substring),"Expected " + this.quote(this.value) + " not to start with " + this.quote(substring));
	}
	,endWith: function(substring,p) {
		this.test(StringTools.endsWith(this.value,substring),p,"Expected " + this.quote(this.value) + " to end with " + this.quote(substring),"Expected " + this.quote(this.value) + " not to end with " + this.quote(substring));
	}
	,match: function(regexp,p) {
		this.test(regexp.match(this.value),p,"Expected " + this.quote(this.value) + " to match regular expression","Expected " + this.quote(this.value) + " not to match regular expression");
	}
	,__class__: buddy_ShouldString
});
var buddy_ShouldIterable = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	buddy_Should.call(this,value,assert,inverse);
};
buddy_ShouldIterable.__name__ = ["buddy","ShouldIterable"];
buddy_ShouldIterable.should = function(value,assert) {
	return new buddy_ShouldIterable(value,assert);
};
buddy_ShouldIterable.__super__ = buddy_Should;
buddy_ShouldIterable.prototype = $extend(buddy_Should.prototype,{
	get_not: function() {
		return new buddy_ShouldIterable(this.value,this.assert,!this.inverse);
	}
	,contain: function(o,p) {
		this.test(Lambda.exists(this.value,function(el) {
			return el == o;
		}),p,"Expected " + this.quote(this.value) + " to contain " + this.quote(o),"Expected " + this.quote(this.value) + " not to contain " + this.quote(o));
	}
	,containAll: function(values,p) {
		var expr = true;
		var $it0 = $iterator(values)();
		while( $it0.hasNext() ) {
			var a = $it0.next();
			var a1 = [a];
			if(!Lambda.exists(this.value,(function(a1) {
				return function(v) {
					return v == a1[0];
				};
			})(a1))) {
				expr = false;
				break;
			}
		}
		this.test(expr,p,"Expected " + this.quote(this.value) + " to contain all of " + this.quote(values),"Expected " + this.quote(this.value) + " not to contain all of " + this.quote(values));
	}
	,containExactly: function(values,p) {
		var a = $iterator(this.value)();
		var b = $iterator(values)();
		var expr = true;
		while(a.hasNext() || b.hasNext()) if(a.next() != b.next()) {
			expr = false;
			break;
		}
		this.test(expr,p,"Expected " + this.quote(this.value) + " to contain exactly " + this.quote(values),"Expected " + this.quote(this.value) + " not to contain exactly " + this.quote(values));
	}
	,__class__: buddy_ShouldIterable
});
var buddy_ShouldFunctions = function(value,assert,inverse) {
	if(inverse == null) inverse = false;
	this.value = value;
	this.assert = assert;
	this.inverse = inverse;
};
buddy_ShouldFunctions.__name__ = ["buddy","ShouldFunctions"];
buddy_ShouldFunctions.should = function(value,assert) {
	return new buddy_ShouldFunctions(value,assert);
};
buddy_ShouldFunctions.prototype = {
	value: null
	,assert: null
	,inverse: null
	,get_not: function() {
		return new buddy_ShouldFunctions(this.value,this.assert,!this.inverse);
	}
	,throwValue: function(v,p) {
		var expr = false;
		try {
			this.value();
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			expr = e == v;
		}
		this.test(expr,p,"Expected " + this.quote(this.value) + " to throw " + this.quote(v),"Expected " + this.quote(this.value) + " not to throw " + this.quote(v));
	}
	,throwType: function(type,p) {
		var expr = false;
		var name = null;
		try {
			this.value();
		} catch( e ) {
			haxe_CallStack.lastException = e;
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			name = Type.getClassName(type);
			expr = Std["is"](e,type);
		}
		this.test(expr,p,"Expected " + this.quote(this.value) + " to throw type " + name,"Expected " + this.quote(this.value) + " not to throw type " + name);
	}
	,be: function(expected,p) {
		this.test(this.value == expected,p,"Expected " + this.quote(expected) + ", was " + this.quote(this.value),"Didn't expect " + this.quote(expected) + " but was equal to that");
	}
	,quote: function(v) {
		if(typeof(v) == "string") return "\"" + Std.string(v) + "\""; else return Std.string(v);
	}
	,stackPos: function(p) {
		return [haxe_StackItem.FilePos(null,p.fileName,p.lineNumber)];
	}
	,test: function(expr,p,error,errorInverted) {
		if(!this.inverse) this.assert(expr,error,this.stackPos(p)); else this.assert(!expr,errorInverted,this.stackPos(p));
	}
	,__class__: buddy_ShouldFunctions
};
var buddy_SuitesRunner = function(buddySuites,reporter) {
	var includeMode;
	includeMode = ((function($this) {
		var $r;
		var _g = [];
		var $it0 = $iterator(buddySuites)();
		while( $it0.hasNext() ) {
			var b = $it0.next();
			var $it1 = b.suites.iterator();
			while( $it1.hasNext() ) {
				var s = $it1.next();
				if(s.include) _g.push(s);
			}
		}
		$r = _g;
		return $r;
	}(this))).length > 0;
	var _g1 = [];
	var $it2 = $iterator(buddySuites)();
	while( $it2.hasNext() ) {
		var b1 = $it2.next();
		var $it3 = b1.suites.iterator();
		while( $it3.hasNext() ) {
			var s1 = $it3.next();
			if(!includeMode || s1.include) _g1.push(s1);
		}
	}
	this.suites = _g1;
	if(reporter == null) this.reporter = new buddy_reporting_ConsoleReporter(); else this.reporter = reporter;
};
buddy_SuitesRunner.__name__ = ["buddy","SuitesRunner"];
buddy_SuitesRunner.prototype = {
	suites: null
	,reporter: null
	,aborted: null
	,run: function() {
		var _g = this;
		var def = new promhx_Deferred();
		var defPr = def.promise();
		this.reporter.start().then(function(ok) {
			if(ok) buddy_tools_AsyncTools.iterateAsyncBool(_g.suites,$bind(_g,_g.runSuite)).pipe(function(_) {
				return _g.reporter.done(_g.suites,!_g.failed());
			}).then(function(_1) {
				def.resolve(ok);
			}); else {
				_g.aborted = true;
				def.resolve(ok);
			}
		});
		return defPr;
	}
	,failed: function() {
		var testFail = null;
		testFail = function(s) {
			var failed = false;
			var $it0 = s.steps.iterator();
			while( $it0.hasNext() ) {
				var step = $it0.next();
				switch(Type.enumIndex(step)) {
				case 1:
					var sp = step[2];
					if(sp.status == buddy_TestStatus.Failed) return true;
					break;
				case 0:
					var s2 = step[2];
					if(testFail(s2)) return true;
					break;
				}
			}
			return false;
		};
		var $it1 = $iterator(this.suites)();
		while( $it1.hasNext() ) {
			var s1 = $it1.next();
			if(testFail(s1)) return true;
		}
		return false;
	}
	,statusCode: function() {
		if(this.aborted) return 1;
		if(this.failed()) return 1; else return 0;
	}
	,runSuite: function(suite) {
		return new buddy_internal_SuiteRunner(suite,this.reporter).run();
	}
	,__class__: buddy_SuitesRunner
};
var buddy_internal_SuiteRunner = function(suite,reporter) {
	this.buddySuite = suite.buddySuite;
	this.suite = suite;
	this.reporter = reporter;
};
buddy_internal_SuiteRunner.__name__ = ["buddy","internal","SuiteRunner"];
buddy_internal_SuiteRunner.prototype = {
	buddySuite: null
	,suite: null
	,reporter: null
	,run: function() {
		var _g = this;
		var traceFunc = haxe_Log.trace;
		var def = new promhx_Deferred();
		var pr = def.promise();
		buddy_tools_AsyncTools.iterateAsyncBool(this.suite.steps,$bind(this,this.runSteps)).then(function(_) {
			haxe_Log.trace = traceFunc;
			def.resolve(_g.suite);
		});
		return pr;
	}
	,allBefores: function(suite,list) {
		list = Lambda.concat(suite.before,list);
		if(suite.parent != null) return this.allBefores(suite.parent,list); else return Lambda.concat(this.buddySuite.befores,list);
	}
	,allAfters: function(suite,list) {
		list = Lambda.concat(suite.after,list);
		if(suite.parent != null) return this.allAfters(suite.parent,list);
		list = Lambda.concat(this.buddySuite.afters,list);
		var output = new List();
		var $it0 = list.iterator();
		while( $it0.hasNext() ) {
			var a = $it0.next();
			output.push(a);
		}
		return output;
	}
	,runBeforeAfter: function(b) {
		var def = new promhx_Deferred();
		var pr = def.promise();
		var done = function(calledFromSpec) {
			if(calledFromSpec == null) calledFromSpec = false;
			def.resolve(b);
		};
		b.run(done,function(s,err,stack) {
		});
		if(!b.async) done();
		return pr;
	}
	,runSteps: function(step) {
		var stepDone = new promhx_Deferred();
		var stepPr = stepDone.promise();
		switch(Type.enumIndex(step)) {
		case 1:
			var spec = step[2];
			this.runSpec(spec).then(function(_) {
				stepDone.resolve(step);
			});
			break;
		case 0:
			var s = step[2];
			new buddy_internal_SuiteRunner(s,this.reporter).run().then(function(_1) {
				stepDone.resolve(step);
			});
			break;
		}
		return stepPr;
	}
	,runSpec: function(spec) {
		var _g = this;
		var specDone = new promhx_Deferred();
		var specPr = specDone.promise();
		specPr.pipe(function(s1) {
			if(_g.reporter != null) return _g.reporter.progress(s1); else return specPr;
		});
		if(spec.status != buddy_TestStatus.Unknown) {
			specDone.resolve(spec);
			return specPr;
		}
		var itDone = new promhx_Deferred();
		var itPromise = itDone.promise();
		var hasStatus = false;
		var status = function(s,error,stack) {
			hasStatus = true;
			if(!s && !itPromise.isResolved() && !itDone.isResolved()) itDone.resolve({ status : buddy_TestStatus.Failed, error : error, stack : stack});
		};
		var done = function(calledFromSpec) {
			if(calledFromSpec == null) calledFromSpec = true;
			if(!itPromise.isResolved() && !itDone.isResolved()) {
				if(calledFromSpec) hasStatus = true;
				itDone.resolve({ status : hasStatus?buddy_TestStatus.Passed:buddy_TestStatus.Pending, error : null, stack : null});
			}
		};
		haxe_Log.trace = function(v,pos) {
			spec.traces.add(pos.fileName + ":" + pos.lineNumber + ": " + Std.string(v));
		};
		var befores = this.allBefores(this.suite,new List());
		var afters = this.allAfters(this.suite,new List());
		var errorTimeout = null;
		buddy_tools_AsyncTools.iterateAsyncBool(befores,$bind(this,this.runBeforeAfter)).pipe(function(_) {
			if(spec.async) {
				var timeout = _g.buddySuite.timeoutMs;
				errorTimeout = buddy_tools_AsyncTools.wait(timeout);
				errorTimeout.catchError(function(e) {
					if(e != null) throw new js__$Boot_HaxeError(e);
				}).then(function(_1) {
					status(false,"Timeout after " + timeout + " ms",null);
				});
			}
			try {
				spec.run(done,status);
				if(!spec.async) done(false);
			} catch( e1 ) {
				haxe_CallStack.lastException = e1;
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				status(false,Std.string(e1),haxe_CallStack.exceptionStack());
			}
			return itPromise;
		}).pipe(function(result) {
			if(errorTimeout != null) {
				errorTimeout.reject(null);
				errorTimeout = null;
			}
			spec.setStatus(result.status,result.error,result.stack);
			return buddy_tools_AsyncTools.iterateAsyncBool(afters,$bind(_g,_g.runBeforeAfter));
		}).then(function(_2) {
			specDone.resolve(spec);
		});
		return specPr;
	}
	,__class__: buddy_internal_SuiteRunner
};
var buddy_internal_sys_NodeJs = function() { };
buddy_internal_sys_NodeJs.__name__ = ["buddy","internal","sys","NodeJs"];
buddy_internal_sys_NodeJs.print = function(s) {
	process.stdout.write(s);
};
buddy_internal_sys_NodeJs.println = function(s) {
	console.log(s);
};
var buddy_reporting_Reporter = function() { };
buddy_reporting_Reporter.__name__ = ["buddy","reporting","Reporter"];
buddy_reporting_Reporter.prototype = {
	start: null
	,progress: null
	,done: null
	,__class__: buddy_reporting_Reporter
};
var buddy_reporting_TraceReporter = function() {
};
buddy_reporting_TraceReporter.__name__ = ["buddy","reporting","TraceReporter"];
buddy_reporting_TraceReporter.__interfaces__ = [buddy_reporting_Reporter];
buddy_reporting_TraceReporter.prototype = {
	start: function() {
		return this.resolveImmediately(true);
	}
	,progress: function(spec) {
		return this.resolveImmediately(spec);
	}
	,done: function(suites,status) {
		var _g = this;
		this.println("");
		var total = 0;
		var failures = 0;
		var pending = 0;
		var countTests = null;
		var printTests = null;
		countTests = function(s) {
			var $it0 = s.steps.iterator();
			while( $it0.hasNext() ) {
				var sp = $it0.next();
				switch(Type.enumIndex(sp)) {
				case 1:
					var sp1 = sp[2];
					total++;
					if(sp1.status == buddy_TestStatus.Failed) failures++; else if(sp1.status == buddy_TestStatus.Pending) pending++;
					break;
				case 0:
					var s1 = sp[2];
					countTests(s1);
					break;
				}
			}
		};
		Lambda.iter(suites,countTests);
		printTests = function(s2,indentLevel) {
			var print = function(str) {
				_g.println(StringTools.lpad(str," ",str.length + indentLevel * 2));
			};
			print(s2.name);
			var $it1 = s2.steps.iterator();
			while( $it1.hasNext() ) {
				var step = $it1.next();
				switch(Type.enumIndex(step)) {
				case 1:
					var sp2 = step[2];
					if(sp2.status == buddy_TestStatus.Failed) {
						print("  " + sp2.description + " (FAILED: " + sp2.error + ")");
						_g.printTraces(sp2);
						if(sp2.stack == null || sp2.stack.length == 0) continue;
						var _g1 = 0;
						var _g2 = sp2.stack;
						while(_g1 < _g2.length) {
							var s3 = _g2[_g1];
							++_g1;
							switch(Type.enumIndex(s3)) {
							case 2:
								var line = s3[4];
								var file = s3[3];
								if(file.indexOf("buddy/internal/") != 0) print("    @ " + file + ":" + line); else {
								}
								break;
							default:
							}
						}
					} else {
						print("  " + sp2.description + " (" + Std.string(sp2.status) + ")");
						_g.printTraces(sp2);
					}
					break;
				case 0:
					var s4 = step[2];
					printTests(s4,indentLevel + 1);
					break;
				}
			}
		};
		Lambda.iter(suites,(function(f,a2) {
			return function(a1) {
				f(a1,a2);
			};
		})(printTests,0));
		this.println("" + total + " specs, " + failures + " failures, " + pending + " pending");
		return this.resolveImmediately(suites);
	}
	,printTraces: function(spec) {
		var $it0 = spec.traces.iterator();
		while( $it0.hasNext() ) {
			var t = $it0.next();
			this.println("    " + t);
		}
	}
	,print: function(s) {
	}
	,println: function(s) {
		haxe_Log.trace(s,{ fileName : "TraceReporter.hx", lineNumber : 105, className : "buddy.reporting.TraceReporter", methodName : "println"});
	}
	,resolveImmediately: function(o) {
		var def = new promhx_Deferred();
		var pr = def.promise();
		def.resolve(o);
		return pr;
	}
	,__class__: buddy_reporting_TraceReporter
};
var buddy_reporting_ConsoleReporter = function() {
	buddy_reporting_TraceReporter.call(this);
};
buddy_reporting_ConsoleReporter.__name__ = ["buddy","reporting","ConsoleReporter"];
buddy_reporting_ConsoleReporter.__super__ = buddy_reporting_TraceReporter;
buddy_reporting_ConsoleReporter.prototype = $extend(buddy_reporting_TraceReporter.prototype,{
	start: function() {
		return this.resolveImmediately(true);
	}
	,progress: function(spec) {
		this.print((function($this) {
			var $r;
			var _g = spec.status;
			$r = (function($this) {
				var $r;
				switch(Type.enumIndex(_g)) {
				case 3:
					$r = "X";
					break;
				case 1:
					$r = ".";
					break;
				case 2:
					$r = "P";
					break;
				case 0:
					$r = "?";
					break;
				}
				return $r;
			}($this));
			return $r;
		}(this)));
		return this.resolveImmediately(spec);
	}
	,done: function(suites,status) {
		var output = buddy_reporting_TraceReporter.prototype.done.call(this,suites,status);
		return output;
	}
	,print: function(s) {
		buddy_internal_sys_NodeJs.print(s);
	}
	,println: function(s) {
		buddy_internal_sys_NodeJs.println(s);
	}
	,__class__: buddy_reporting_ConsoleReporter
});
var buddy_tools_AsyncTools = function() { };
buddy_tools_AsyncTools.__name__ = ["buddy","tools","AsyncTools"];
buddy_tools_AsyncTools.iterateAsyncBool = function(it,action) {
	return buddy_tools_AsyncTools.iterateAsync(it,action,true);
};
buddy_tools_AsyncTools.iterateAsync = function(it,action,resolveWith) {
	var finished = new promhx_Deferred();
	var pr = finished.promise();
	buddy_tools_AsyncTools.next($iterator(it)(),action,finished,resolveWith);
	return pr;
};
buddy_tools_AsyncTools.wait = function(ms) {
	var def = new promhx_Deferred();
	var pr = def.promise();
	var done = function() {
		if(!pr.isFulfilled()) def.resolve(true);
	};
	haxe_Timer.delay(function() {
		done();
	},ms);
	return pr;
};
buddy_tools_AsyncTools.next = function(it,action,def,resolveWith) {
	if(!it.hasNext()) def.resolve(resolveWith); else {
		var n = it.next();
		action(n).then(function(_) {
			buddy_tools_AsyncTools.next(it,action,def,resolveWith);
		});
	}
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
var haxe_Log = function() { };
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ds_Option = { __ename__ : ["haxe","ds","Option"], __constructs__ : ["Some","None"] };
haxe_ds_Option.Some = function(v) { var $x = ["Some",0,v]; $x.__enum__ = haxe_ds_Option; $x.toString = $estr; return $x; };
haxe_ds_Option.None = ["None",1];
haxe_ds_Option.None.toString = $estr;
haxe_ds_Option.None.__enum__ = haxe_ds_Option;
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
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
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
var promhx_base_AsyncBase = function(d) {
	this.id = promhx_base_AsyncBase.id_ctr += 1;
	this._resolved = false;
	this._pending = false;
	this._errorPending = false;
	this._fulfilled = false;
	this._update = [];
	this._error = [];
	this._errored = false;
	if(d != null) promhx_base_AsyncBase.link(d,this,function(x) {
		return x;
	});
};
promhx_base_AsyncBase.__name__ = ["promhx","base","AsyncBase"];
promhx_base_AsyncBase.link = function(current,next,f) {
	current._update.push({ async : next, linkf : function(x) {
		next.handleResolve(f(x));
	}});
	promhx_base_AsyncBase.immediateLinkUpdate(current,next,f);
};
promhx_base_AsyncBase.immediateLinkUpdate = function(current,next,f) {
	if(current.isErrored()) next.handleError(current._errorVal);
	if(current.isResolved() && !current.isPending()) try {
		next.handleResolve(f(current._val));
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		next.handleError(e);
	}
};
promhx_base_AsyncBase.linkAll = function(all,next) {
	var cthen = function(arr,current,v) {
		if(arr.length == 0 || promhx_base_AsyncBase.allFulfilled(arr)) {
			var vals;
			var _g = [];
			var $it0 = $iterator(all)();
			while( $it0.hasNext() ) {
				var a = $it0.next();
				_g.push(a == current?v:a._val);
			}
			vals = _g;
			next.handleResolve(vals);
		}
		null;
		return;
	};
	var $it1 = $iterator(all)();
	while( $it1.hasNext() ) {
		var a1 = $it1.next();
		a1._update.push({ async : next, linkf : (function(f,a11,a2) {
			return function(v1) {
				f(a11,a2,v1);
				return;
			};
		})(cthen,(function($this) {
			var $r;
			var _g1 = [];
			var $it2 = $iterator(all)();
			while( $it2.hasNext() ) {
				var a21 = $it2.next();
				if(a21 != a1) _g1.push(a21);
			}
			$r = _g1;
			return $r;
		}(this)),a1)});
	}
	if(promhx_base_AsyncBase.allFulfilled(all)) next.handleResolve((function($this) {
		var $r;
		var _g2 = [];
		var $it3 = $iterator(all)();
		while( $it3.hasNext() ) {
			var a3 = $it3.next();
			_g2.push(a3._val);
		}
		$r = _g2;
		return $r;
	}(this)));
};
promhx_base_AsyncBase.pipeLink = function(current,ret,f) {
	var linked = false;
	var linkf = function(x) {
		if(!linked) {
			linked = true;
			var pipe_ret = f(x);
			pipe_ret._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
			promhx_base_AsyncBase.immediateLinkUpdate(pipe_ret,ret,function(x1) {
				return x1;
			});
		}
	};
	current._update.push({ async : ret, linkf : linkf});
	if(current.isResolved() && !current.isPending()) try {
		linkf(current._val);
	} catch( e ) {
		haxe_CallStack.lastException = e;
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		ret.handleError(e);
	}
};
promhx_base_AsyncBase.allResolved = function($as) {
	var $it0 = $iterator($as)();
	while( $it0.hasNext() ) {
		var a = $it0.next();
		if(!a.isResolved()) return false;
	}
	return true;
};
promhx_base_AsyncBase.allFulfilled = function($as) {
	var $it0 = $iterator($as)();
	while( $it0.hasNext() ) {
		var a = $it0.next();
		if(!a.isFulfilled()) return false;
	}
	return true;
};
promhx_base_AsyncBase.prototype = {
	id: null
	,_val: null
	,_resolved: null
	,_fulfilled: null
	,_pending: null
	,_update: null
	,_error: null
	,_errored: null
	,_errorMap: null
	,_errorVal: null
	,_errorPending: null
	,catchError: function(f) {
		this._error.push(f);
		return this;
	}
	,errorThen: function(f) {
		this._errorMap = f;
		return this;
	}
	,isResolved: function() {
		return this._resolved;
	}
	,isErrored: function() {
		return this._errored;
	}
	,isFulfilled: function() {
		return this._fulfilled;
	}
	,isPending: function() {
		return this._pending;
	}
	,handleResolve: function(val) {
		this._resolve(val);
	}
	,_resolve: function(val) {
		var _g = this;
		if(this._pending) promhx_base_EventLoop.enqueue((function(f,a1) {
			return function() {
				f(a1);
			};
		})($bind(this,this._resolve),val)); else {
			this._resolved = true;
			this._pending = true;
			promhx_base_EventLoop.enqueue(function() {
				_g._val = val;
				var _g1 = 0;
				var _g2 = _g._update;
				while(_g1 < _g2.length) {
					var up = _g2[_g1];
					++_g1;
					try {
						up.linkf(val);
					} catch( e ) {
						haxe_CallStack.lastException = e;
						if (e instanceof js__$Boot_HaxeError) e = e.val;
						up.async.handleError(e);
					}
				}
				_g._fulfilled = true;
				_g._pending = false;
			});
		}
	}
	,handleError: function(error) {
		this._handleError(error);
	}
	,_handleError: function(error) {
		var _g = this;
		var update_errors = function(e) {
			if(_g._error.length > 0) {
				var _g1 = 0;
				var _g2 = _g._error;
				while(_g1 < _g2.length) {
					var ef = _g2[_g1];
					++_g1;
					ef(e);
				}
			} else if(_g._update.length > 0) {
				var _g11 = 0;
				var _g21 = _g._update;
				while(_g11 < _g21.length) {
					var up = _g21[_g11];
					++_g11;
					up.async.handleError(e);
				}
			} else {
				haxe_Log.trace("Call Stack: " + haxe_CallStack.toString(haxe_CallStack.callStack()),{ fileName : "AsyncBase.hx", lineNumber : 155, className : "promhx.base.AsyncBase", methodName : "_handleError"});
				throw new js__$Boot_HaxeError(e);
			}
			_g._errorPending = false;
		};
		if(!this._errorPending) {
			this._errorPending = true;
			this._errored = true;
			this._errorVal = error;
			promhx_base_EventLoop.enqueue(function() {
				if(_g._errorMap != null) try {
					_g._resolve(_g._errorMap(error));
				} catch( e1 ) {
					haxe_CallStack.lastException = e1;
					if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
					update_errors(e1);
				} else update_errors(error);
			});
		}
	}
	,then: function(f) {
		var ret = new promhx_base_AsyncBase();
		promhx_base_AsyncBase.link(this,ret,f);
		return ret;
	}
	,unlink: function(to) {
		var _g = this;
		promhx_base_EventLoop.enqueue(function() {
			_g._update = _g._update.filter(function(x) {
				return x.async != to;
			});
		});
	}
	,isLinked: function(to) {
		var updated = false;
		var _g = 0;
		var _g1 = this._update;
		while(_g < _g1.length) {
			var u = _g1[_g];
			++_g;
			if(u.async == to) return true;
		}
		return updated;
	}
	,__class__: promhx_base_AsyncBase
};
var promhx_Deferred = $hx_exports.promhx.Deferred = function() {
	promhx_base_AsyncBase.call(this);
};
promhx_Deferred.__name__ = ["promhx","Deferred"];
promhx_Deferred.__super__ = promhx_base_AsyncBase;
promhx_Deferred.prototype = $extend(promhx_base_AsyncBase.prototype,{
	resolve: function(val) {
		this.handleResolve(val);
	}
	,throwError: function(e) {
		this.handleError(e);
	}
	,promise: function() {
		return new promhx_Promise(this);
	}
	,stream: function() {
		return new promhx_Stream(this);
	}
	,publicStream: function() {
		return new promhx_PublicStream(this);
	}
	,__class__: promhx_Deferred
});
var promhx_Promise = $hx_exports.promhx.Promise = function(d) {
	promhx_base_AsyncBase.call(this,d);
	this._rejected = false;
};
promhx_Promise.__name__ = ["promhx","Promise"];
promhx_Promise.whenAll = function(itb) {
	var ret = new promhx_Promise();
	promhx_base_AsyncBase.linkAll(itb,ret);
	return ret;
};
promhx_Promise.promise = function(_val) {
	var ret = new promhx_Promise();
	ret.handleResolve(_val);
	return ret;
};
promhx_Promise.__super__ = promhx_base_AsyncBase;
promhx_Promise.prototype = $extend(promhx_base_AsyncBase.prototype,{
	_rejected: null
	,isRejected: function() {
		return this._rejected;
	}
	,reject: function(e) {
		this._rejected = true;
		this.handleError(e);
	}
	,handleResolve: function(val) {
		if(this._resolved) {
			var msg = "Promise has already been resolved";
			throw new js__$Boot_HaxeError(promhx_error_PromiseError.AlreadyResolved(msg));
		}
		this._resolve(val);
	}
	,then: function(f) {
		var ret = new promhx_Promise();
		promhx_base_AsyncBase.link(this,ret,f);
		return ret;
	}
	,unlink: function(to) {
		var _g = this;
		promhx_base_EventLoop.enqueue(function() {
			if(!_g.isFulfilled()) {
				var msg = "Downstream Promise is not fullfilled";
				_g.handleError(promhx_error_PromiseError.DownstreamNotFullfilled(msg));
			} else _g._update = _g._update.filter(function(x) {
				return x.async != to;
			});
		});
	}
	,handleError: function(error) {
		this._rejected = true;
		this._handleError(error);
	}
	,pipe: function(f) {
		var ret = new promhx_Promise();
		promhx_base_AsyncBase.pipeLink(this,ret,f);
		return ret;
	}
	,errorPipe: function(f) {
		var ret = new promhx_Promise();
		this.catchError(function(e) {
			var piped = f(e);
			piped.then($bind(ret,ret._resolve));
		});
		this.then($bind(ret,ret._resolve));
		return ret;
	}
	,__class__: promhx_Promise
});
var promhx_Stream = $hx_exports.promhx.Stream = function(d) {
	promhx_base_AsyncBase.call(this,d);
	this._end_deferred = new promhx_Deferred();
	this._end_promise = this._end_deferred.promise();
};
promhx_Stream.__name__ = ["promhx","Stream"];
promhx_Stream.foreach = function(itb) {
	var s = new promhx_Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		s.handleResolve(i);
	}
	s.end();
	return s;
};
promhx_Stream.wheneverAll = function(itb) {
	var ret = new promhx_Stream();
	promhx_base_AsyncBase.linkAll(itb,ret);
	return ret;
};
promhx_Stream.concatAll = function(itb) {
	var ret = new promhx_Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		ret.concat(i);
	}
	return ret;
};
promhx_Stream.mergeAll = function(itb) {
	var ret = new promhx_Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		ret.merge(i);
	}
	return ret;
};
promhx_Stream.stream = function(_val) {
	var ret = new promhx_Stream();
	ret.handleResolve(_val);
	return ret;
};
promhx_Stream.__super__ = promhx_base_AsyncBase;
promhx_Stream.prototype = $extend(promhx_base_AsyncBase.prototype,{
	deferred: null
	,_pause: null
	,_end: null
	,_end_promise: null
	,_end_deferred: null
	,then: function(f) {
		var ret = new promhx_Stream();
		promhx_base_AsyncBase.link(this,ret,f);
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,detachStream: function(str) {
		var filtered = [];
		var removed = false;
		var _g = 0;
		var _g1 = this._update;
		while(_g < _g1.length) {
			var u = _g1[_g];
			++_g;
			if(u.async == str) removed = true; else filtered.push(u);
		}
		this._update = filtered;
		return removed;
	}
	,first: function() {
		var s = new promhx_Promise();
		this.then(function(x) {
			if(!s.isResolved()) s.handleResolve(x);
		});
		return s;
	}
	,handleResolve: function(val) {
		if(!this._end && !this._pause) this._resolve(val);
	}
	,pause: function(set) {
		if(set == null) set = !this._pause;
		this._pause = set;
	}
	,pipe: function(f) {
		var ret = new promhx_Stream();
		promhx_base_AsyncBase.pipeLink(this,ret,f);
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,errorPipe: function(f) {
		var ret = new promhx_Stream();
		this.catchError(function(e) {
			var piped = f(e);
			piped.then($bind(ret,ret._resolve));
			piped._end_promise.then(($_=ret._end_promise,$bind($_,$_._resolve)));
		});
		this.then($bind(ret,ret._resolve));
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,handleEnd: function() {
		if(this.isPending()) promhx_base_EventLoop.enqueue($bind(this,this.handleEnd)); else if(this._end_promise.isResolved()) return; else {
			this._end = true;
			var o;
			if(this.isResolved()) o = haxe_ds_Option.Some(this._val); else o = haxe_ds_Option.None;
			this._end_promise.handleResolve(o);
			this._update = [];
			this._error = [];
		}
	}
	,end: function() {
		promhx_base_EventLoop.enqueue($bind(this,this.handleEnd));
		return this;
	}
	,endThen: function(f) {
		return this._end_promise.then(f);
	}
	,filter: function(f) {
		var ret = new promhx_Stream();
		this._update.push({ async : ret, linkf : function(x) {
			if(f(x)) ret.handleResolve(x);
		}});
		promhx_base_AsyncBase.immediateLinkUpdate(this,ret,function(x1) {
			return x1;
		});
		return ret;
	}
	,concat: function(s) {
		var ret = new promhx_Stream();
		this._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		promhx_base_AsyncBase.immediateLinkUpdate(this,ret,function(x) {
			return x;
		});
		this.endThen(function(_) {
			s.pipe(function(x1) {
				ret.handleResolve(x1);
				return ret;
			});
			s.endThen(function(_1) {
				ret.end();
			});
		});
		return ret;
	}
	,merge: function(s) {
		var ret = new promhx_Stream();
		this._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		s._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		promhx_base_AsyncBase.immediateLinkUpdate(this,ret,function(x) {
			return x;
		});
		promhx_base_AsyncBase.immediateLinkUpdate(s,ret,function(x1) {
			return x1;
		});
		return ret;
	}
	,__class__: promhx_Stream
});
var promhx_PublicStream = $hx_exports.promhx.PublicStream = function(def) {
	promhx_Stream.call(this,def);
};
promhx_PublicStream.__name__ = ["promhx","PublicStream"];
promhx_PublicStream.publicstream = function(val) {
	var ps = new promhx_PublicStream();
	ps.resolve(val);
	return ps;
};
promhx_PublicStream.__super__ = promhx_Stream;
promhx_PublicStream.prototype = $extend(promhx_Stream.prototype,{
	resolve: function(val) {
		this.handleResolve(val);
	}
	,throwError: function(e) {
		this.handleError(e);
	}
	,update: function(val) {
		this.handleResolve(val);
	}
	,__class__: promhx_PublicStream
});
var promhx_base_EventLoop = function() { };
promhx_base_EventLoop.__name__ = ["promhx","base","EventLoop"];
promhx_base_EventLoop.enqueue = function(eqf) {
	promhx_base_EventLoop.queue.add(eqf);
	promhx_base_EventLoop.continueOnNextLoop();
};
promhx_base_EventLoop.set_nextLoop = function(f) {
	if(promhx_base_EventLoop.nextLoop != null) throw new js__$Boot_HaxeError("nextLoop has already been set"); else promhx_base_EventLoop.nextLoop = f;
	return promhx_base_EventLoop.nextLoop;
};
promhx_base_EventLoop.queueEmpty = function() {
	return promhx_base_EventLoop.queue.isEmpty();
};
promhx_base_EventLoop.finish = function(max_iterations) {
	if(max_iterations == null) max_iterations = 1000;
	var fn = null;
	while(max_iterations-- > 0 && (fn = promhx_base_EventLoop.queue.pop()) != null) fn();
	return promhx_base_EventLoop.queueEmpty();
};
promhx_base_EventLoop.clear = function() {
	promhx_base_EventLoop.queue = new List();
};
promhx_base_EventLoop.f = function() {
	var fn = promhx_base_EventLoop.queue.pop();
	if(fn != null) fn();
	if(!promhx_base_EventLoop.queueEmpty()) promhx_base_EventLoop.continueOnNextLoop();
};
promhx_base_EventLoop.continueOnNextLoop = function() {
	if(promhx_base_EventLoop.nextLoop != null) promhx_base_EventLoop.nextLoop(promhx_base_EventLoop.f); else setImmediate(promhx_base_EventLoop.f);
};
var promhx_error_PromiseError = { __ename__ : ["promhx","error","PromiseError"], __constructs__ : ["AlreadyResolved","DownstreamNotFullfilled"] };
promhx_error_PromiseError.AlreadyResolved = function(message) { var $x = ["AlreadyResolved",0,message]; $x.__enum__ = promhx_error_PromiseError; $x.toString = $estr; return $x; };
promhx_error_PromiseError.DownstreamNotFullfilled = function(message) { var $x = ["DownstreamNotFullfilled",1,message]; $x.__enum__ = promhx_error_PromiseError; $x.toString = $estr; return $x; };
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
buddy_BuddySuite.exclude = "exclude";
buddy_BuddySuite.include = "include";
js_Boot.__toStr = {}.toString;
promhx_base_AsyncBase.id_ctr = 0;
promhx_base_EventLoop.queue = new List();
thx_Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
thx_Ints.BASE = "0123456789abcdefghijklmnopqrstuvwxyz";
thx_Strings.UCWORDS = new EReg("[^a-zA-Z]([a-z])","g");
thx_Strings.UCWORDSWS = new EReg("[ \t\r\n][a-z]","g");
thx_Strings.ALPHANUM = new EReg("^[a-z0-9]+$","i");
thx_Strings.DIGITS = new EReg("^[0-9]+$","");
thx_Strings.STRIPTAGS = new EReg("</?[a-z]+[^>]*>","gi");
thx_Strings.WSG = new EReg("[ \t\r\n]+","g");
thx_Strings.SPLIT_LINES = new EReg("\r\n|\n\r|\n|\r","g");
Test.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=test.js.map
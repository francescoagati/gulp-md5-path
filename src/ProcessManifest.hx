import Externs;
import Manifest;
import com.dongxiguo.continuation.Continuation;


using FileTools;
using StringTools;
using Manifest.PathTools;
using thx.Objects;
using thx.Dynamics;
using Std;
using Reflect;
using ProcessManifest.DynamicTools;
using Lambda;
using Utils;

class DynamicTools {
  public static inline function isJsArray(o:Dynamic):Bool {
    return untyped __js__('toString.call(o) === "[object Array]"');
  }

  public static inline function isJsObject(a:Dynamic):Bool {
    return untyped __js__('(!!a) && (a.constructor === Object)');
  }

}

@:expose  @:keep  @:native('manifest')
@:build(com.dongxiguo.continuation.Continuation.cpsByMeta(":async"))
class ProcessManifest {

  @:async static inline function processFile(path:Path,options:{basePath:String}) {
    var completePath = '${options.basePath}/${path}';

    var err,content = @await js.node.Fs.readFile(completePath,{encoding:'utf8'});
    return path;
  }



  @:async static inline function processManifest(paths:Paths,options:{basePath:String}) {
    return [
      @fork(path in paths) {
        switch (path.getType()) {
          case http(path):path;
          case file(path): @await processFile(path,options);
          case _:null;
      }
    }];
  }

  @:async static inline function traverseJson(json:haxe.DynamicAccess<Dynamic>,options:{basePath:String}) {
    for (key in json.keys()) {
      var obj = json.get(key);
      if (obj.isJsArray()) {
        var new_obj = @await processManifest(obj,options);
        json.set(key,new_obj);
      }
      else if (obj.isJsObject()) @await traverseJson(obj,options);
    }
    return json;

  }

  public static inline function map_manifest(options:{basePath:String},file:File,cb) {


    Continuation.cpsFunction(function asyncTest():Void {
      var json = file.toJson();
      json = @await traverseJson(json,options);
      file.setContent(haxe.Json.stringify(json));
      cb(null,file);
    });
    asyncTest(function() {});
  };

  public static inline function task(options) {
    return EventStream.map(map_manifest.bind(options,_,_));
  }
}

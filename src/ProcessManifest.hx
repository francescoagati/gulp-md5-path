import Externs;
import Manifest;
import Path;
import com.dongxiguo.continuation.Continuation;
import DefTypes;

using FileTools;
using StringTools;
using Path.PathsTools;
using thx.Objects;
using thx.Dynamics;
using Std;
using Reflect;
using ProcessManifest.DynamicTools;
using Lambda;
using Utils;
using Md5Tools.StringMd5Tools;



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



  @:async static inline function traverseJson(json:haxe.DynamicAccess<Dynamic>,options:ParamsManifest) {
    for (key in json.keys()) {
      var obj = json.get(key);
      if (obj.isJsArray()) {
        var new_obj = @await (obj:Paths).processPaths(options);
        json.set(key,new_obj);
      }
      else if (obj.isJsObject()) @await traverseJson(obj,options);
    }
    return json;

  }

  public static inline function map_manifest(options:ParamsManifest,file:File,cb) {


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

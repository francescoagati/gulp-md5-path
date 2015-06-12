import Externs;
import Manifest;
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

@:expose  @:keep  @:native('manifest')

class DynamicTools {
  public static inline function isJsArray(o:Dynamic):Bool {
    return untyped __js__('toString.call(o) === "[object Array]"');
  }

  public static inline function isJsObject(a:Dynamic):Bool {
    return untyped __js__('(!!a) && (a.constructor === Object)');
  }

}


class ProcessManifest {


  static inline function processManifest(paths:Paths) {
    return [ for (path in paths) path.getType() ];
  }

  static inline function traverseJson(json:haxe.DynamicAccess<Dynamic>) {
    for (key in json.keys()) {
      var obj = json.get(key);
      if (obj.isJsArray()) json.set(key,processManifest(obj));
      else if (obj.isJsObject()) traverseJson(obj);
    }

    json.pretty();
    return json;

  }

  public static inline function map_manifest(file:File,cb) {
    var json = file.toJson();
    traverseJson(json);

    cb(null,file);
  };
  public static inline function task(options:Dynamic) {
    return EventStream.map(map_manifest);
  }
}

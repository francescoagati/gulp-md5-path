import Externs;
import Manifest;
import Path;
import com.dongxiguo.continuation.Continuation;
import DefTypes;
import async_tools.Cps.*;


using FileTools;
using StringTools;
using Path.PathsTools;
using thx.Objects;
using thx.Dynamics;
using Utils.DynamicTools;
using Lambda;
using Utils;
using Md5Tools.StringMd5Tools;


@:expose  @:keep  @:native('manifest')
class ProcessManifest implements Utils.Async {

  @:async static function traverseJson(json:haxe.DynamicAccess<Dynamic>,options:ParamsManifest) {
    for (key in json.keys()) {
      var obj = json[key];
      if (obj.isJsArray()) {
        var new_obj = @await (obj:Paths).processPaths(options);
        json[key] = new_obj;
      }
      else if (obj.isJsObject()) @await traverseJson(obj,options);
    }
    return json;

  }

  public static inline function map_manifest(options:ParamsManifest,file:File,cb) {
    cont_exec({
      trace(file.toString());
      var json = file.toJson();
      json = @await traverseJson(json,options);
      file.setContent(haxe.Json.stringify(json));
      cb(null,file);
      null;
    });

  };

  public static inline function task(options) {
    return EventStream.map(map_manifest.bind(options,_,_));
  }
}

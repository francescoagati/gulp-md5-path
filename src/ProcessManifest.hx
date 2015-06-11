import Externs;
import Manifest;
using FileTools;
using StringTools;
using Manifest.PathTools;


@:expose  @:keep  @:native('manifest')
class ProcessManifest {


  static inline function map_manifest(file:File,cb) {
    var manifest:AManifest = file;
    for (key in manifest.keys()) {
      for (path in manifest.get(key)) path.processPath();
    }

    cb(null,file);
  };
  public static inline function task(options:Dynamic) {
    return EventStream.map(map_manifest);
  }
}

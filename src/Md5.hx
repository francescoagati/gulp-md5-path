import thx.Functions.fn;
import Externs;

using FileTools;
using thx.Arrays;
using thx.Functions;
using Md5Tools.FileMd5Tools;

@:keep @:expose @:native('md5') class Md5 {
  static inline function map_file(file:AFile,cb) {
    file.toMd5();
    var p = new Pretty();
    cb(null,file);
  };
  public static inline function task(options:Dynamic) {
    return EventStream.map(map_file);
  }
}

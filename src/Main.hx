import js.node.Crypto;
import js.node.Buffer;
using Main.FileTools;
using thx.Arrays;
using thx.Functions;
import thx.Functions.fn;
import Externs;



class FileTools {
  public static inline function toString(file:File):String {
    return file.contents.toString();
  }

  public static inline function toMd5(file:File):File {
    var md5 = Crypto.createHash('md5');
    md5.update(file.toString());
    var md5_suffix = md5.digest('hex');
    var splits = file.path.split('/');

    var end = splits.slice(splits.length-1)[0];
    var basename = end.split(".");

    file.path= '${splits.slice(0,-1).join("/")}/${basename[0]}-${md5_suffix}.${basename.slice(1).join('.')}';
    return file;
  }

}


@:keep @:expose @:native('md5') class Md5 {
  static inline function map_file(file:File,cb) {
    file.toMd5();
    cb(null,file);
  };
  public static inline function task(options:Dynamic) {
    return EventStream.map(map_file);
  }
}

class Main {
  public static function main() {}
}

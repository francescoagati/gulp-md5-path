import Externs;
import js.node.Crypto;
import js.node.Buffer;
using FileTools;


class FileTools {
  public static inline function toString(file:AFile):String {
    return file.contents.toString();
  }

  public static inline function toJson(file:AFile):haxe.DynamicAccess<Dynamic> {
    return haxe.Json.parse(file.toString());
  }

  public static inline function toMd5(file:AFile):AFile {
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

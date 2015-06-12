import Externs;
import js.node.Crypto;
import js.node.Buffer;
using FileTools;
using Md5Tools.FileMd5Tools;

class FileTools {
  public static inline function toString(file:AFile):String {
    return file.contents.toString();
  }

  public static inline function toJson(file:AFile):haxe.DynamicAccess<Dynamic> {
    return haxe.Json.parse(file.toString());
  }

  public static inline function setContent(file:File,content:String) {
    file.contents = new Buffer(content);
  }


}

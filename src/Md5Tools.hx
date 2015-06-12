import Externs;
import js.node.Crypto;
import js.node.Buffer;
using FileTools;
using Md5Tools.FileMd5Tools;
using Md5Tools.StringMd5Tools;

class StringMd5Tools {
  public static inline function toMd5(s:String) {
    var md5 = Crypto.createHash('md5');
    md5.update(s);
    return md5.digest('hex');
  }

}

class FileMd5Tools {

  public static inline function toMd5(file:AFile):AFile {
    var md5_suffix = file.toString().toMd5();
    var splits = file.path.split('/');

    var end = splits.slice(splits.length-1)[0];
    var basename = end.split(".");

    file.path= '${splits.slice(0,-1).join("/")}/${basename[0]}-${md5_suffix}.${basename.slice(1).join('.')}';
    return file;
  }

}


class Md5Tools {}

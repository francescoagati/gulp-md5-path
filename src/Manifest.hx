import Externs;
using FileTools;
using StringTools;
using Manifest.PathTools;
using thx.Arrays;


enum TypePath {
  http(path:Path);
  file(path:Path);
  undefined(path:Path);
}


@:forward abstract Path(String) from String to String {
  public inline function new(s:String) this = s;

  @:from public inline static function fromString(s:String):Path return new Path(s);


}


@:forward abstract AManifest(Manifest) from Manifest to Manifest {
  public inline function new(m:Manifest) this = m;

  @:from public static inline function fromFile(file:File):AManifest {
    return new AManifest(haxe.Json.parse(file.toString()));
  }
}


class PathTools{

  public static inline function getType(path:Path):TypePath {
    return
      if (path.isHttp()) http(path);
      else if (path.isFile()) file(path);
      else undefined(path);
  }

  public inline static function fileName(path:Path) {
    return path.split("/").last();
  }


  public inline static function baseName(path:Path) {
    return path.split("/").last().split(".").first();
  }

  public inline static function basePath(path:Path) {
    return path.split("/").slice(0,-1).join("/");
  }

  public inline static function extension(path:Path) {
    return path.split('/').last().split(".").last();
  }

  public inline static function isHttp(path:Path) return path.startsWith('http');
  public inline static function isFile(path:Path) return path.startsWith('.//');


  public inline static function processPath(path:Path) {

    return switch (path.getType()) {
      case TypePath.http(path): 'http';
      case TypePath.file(path): 'file';
      case _:null;
    }
  }

}

typedef Paths = Array<Path>;
typedef Manifest = haxe.DynamicAccess<Paths>;

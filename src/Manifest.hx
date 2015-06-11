import Externs;
using FileTools;
using StringTools;


enum TypePath {
  http(path:Path);
  file(path:Path);
}


@:forward abstract Path(String) from String to String {
  public inline function new(s:String) this = s;

  @:from public inline static function fromString(s:String):Path return new Path(s);

  public inline function getType() {
    return if (this.indexOf('http') >= 0 ) TypePath.http(this)
      else TypePath.file(this);
  }
}


@:forward abstract AManifest(Manifest) from Manifest to Manifest {
  public inline function new(m:Manifest) this = m;

  @:from public static inline function fromFile(file:File):AManifest {
    return new AManifest(haxe.Json.parse(file.toString()));
  }
}


class PathTools{
  public inline static function processPath(path:Path) {

    return switch (path.getType()) {
      case TypePath.http(path): 'http';
      case TypePath.file(path): 'file';
      case _:null;
    }
  }

}

typedef Manifest = haxe.DynamicAccess<Array<Path>>;

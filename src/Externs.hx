typedef FileBase = {
  cwd:String,
  base:String,
  path:String,
  contents:Dynamic
}

typedef File = {
  >FileBase,
  dirname:String,
  extname:String,
  basename:String,
  relative:String,
  inspect:Void->String
}


@:jsRequire("vinyl")  extern class Vinyl {
  public function new(options:FileBase);
}

@:forward abstract AFile(File) from File to File {
  public inline function new(f:File) this=f;
  @:from public inline static function fromVinyl(v:Vinyl):AFile {
    return new AFile(untyped v);
  }
}

@:jsRequire("util") extern class Util {
 static function inspect(object:Dynamic,?options:Dynamic):Dynamic;
}


@:jsRequire("event-stream") extern class EventStream {
 static function map(fn:File->(Dynamic->File->Void)->Void):Dynamic;
}

typedef File = {
  cwd:String,
  base:String,
  path:String,
  contents:Dynamic,
  dirname:String,
  extname:String,
  basename:String,
  relative:String,
  inspect:Void->String
}


@:jsRequire("util") extern class Util {
 static function inspect(object:Dynamic,?options:Dynamic):Dynamic;
}


@:jsRequire("event-stream") extern class EventStream {
 static function map(fn:File->(Dynamic->File->Void)->Void):Dynamic;
}

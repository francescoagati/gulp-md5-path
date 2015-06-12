#if (macro || neko)
  import haxe.macro.Expr;
  using StringTools;


#end

class DynamicTools {
  public static inline function isJsArray(o:Dynamic):Bool {
    return untyped __js__('toString.call(o) === "[object Array]"');
  }

  public static inline function isJsObject(a:Dynamic):Bool {
    return untyped __js__('(!!a) && (a.constructor === Object)');
  }

}



class Utils {
  public static inline function pretty(obj:Dynamic):Dynamic {
    var p = untyped __js__("require('pretty-print')");
    p(obj);
    return obj;
  }

}







@:autoBuild(com.dongxiguo.continuation.Continuation.cpsByMeta(":async"))
interface Async{}

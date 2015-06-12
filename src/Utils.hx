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

class Cont {

    public macro static function cont(body:Expr) {
      var md5 =  haxe.crypto.Md5.encode(Std.string(Date.now().getTime()));
      var randomName = '__fn_tmp_${Std.string(Math.random() * 99999999).replace(".","_")}_${md5}';

      return macro {
        com.dongxiguo.continuation.Continuation.cpsFunction(function $randomName():Void{
          $e{body};
        });
        $i{randomName};
      }
    }

    public macro static function cont_exec(body:Expr) {
      return macro Utils.Cont.cont($e{body})(function() {});
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

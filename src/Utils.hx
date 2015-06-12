class Utils {
  public static inline function pretty(obj:Dynamic):Dynamic {
    var p = untyped __js__("require('pretty-print')");
    p(obj);
    return obj;
  }

}

import Externs;
import Path;

using FileTools;
using StringTools;
using PathTools;
using thx.Arrays;



@:forward abstract AManifest(Manifest) from Manifest to Manifest {
  public inline function new(m:Manifest) this = m;

  @:from public static inline function fromFile(file:File):AManifest {
    return new AManifest(haxe.Json.parse(file.toString()));
  }
}
typedef Manifest = haxe.DynamicAccess<Paths>;

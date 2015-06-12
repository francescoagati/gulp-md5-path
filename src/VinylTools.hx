import Externs;
import Manifest;

using Manifest.PathTools;

class VinylTools { 

  public static inline function  toVynil(path:Path):AFile {
    return new Vinyl({
      cwd:"/",
      base:path.basePath(),
      path:path,
      contents:new js.node.Buffer(js.node.Fs.readFileSync(path).toString())
    });

  }
}

import thx.Functions.fn;
import Externs;
import js.node.Buffer;
import Sure.sure;

import Manifest;
import ProcessManifest;

using FileTools;
using thx.Arrays;
using thx.Functions;
using VinylTools;


class ManifestTest extends nanotest.NanoTestCase {

    public function testBasic(){

      var file = ('./test/manifest.json':Path).toVynil();


      ProcessManifest.map_manifest(file,function(x,file) {

      });


      sure(1==1);
    }

}

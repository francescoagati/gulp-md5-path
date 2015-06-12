import buddy.*;

import thx.Functions.fn;
import Externs;
import js.node.Buffer;
import Manifest;



using FileTools;
using thx.Arrays;
using thx.Functions;
using buddy.Should;
using Manifest.PathTools;
using VinylTools;
using Utils;

// Add test suites within the brackets
class Test implements Buddy<[Tests]> {

}


class Tests extends BuddySuite {
    public function new() {

      describe("test Md5", {

        var file:AFile = new Vinyl({
          cwd: "/",
          base: "/test/",
          path: "/test/file.coffee",
          contents: new Buffer("Hello world")
        });

        it("identity", {
          file.toMd5().basename.should.be('file-3e25960a79dbc69b674cd4ec67a72c62.coffee');
        });

      });

      describe("manifest",{

        var fileResult = null;

        before(function(done) {

          var file = ('./test/manifest.json':Path).toVynil();
          ProcessManifest.map_manifest(file,function(_,file) {
            fileResult = file;
            done();
          });


        });

        it("manifest changed",{
          trace(fileResult.pretty());
          (file).should.not.be(fileResult);
        });


      });



}

}

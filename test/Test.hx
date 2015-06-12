import buddy.*;

import thx.Functions.fn;
import Externs;
import js.node.Buffer;
import Manifest;

import js.Node;

using FileTools;
using thx.Arrays;
using thx.Functions;
using buddy.Should;
using Path.PathTools;
using VinylTools;
using Utils;
using Md5Tools.FileMd5Tools;
using StringTools;
using thx.Strings;

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

          var path = '${Node.__dirname}/../test/files';

          var file = ('./test/manifest.json':Path).toVynil();
          var params = {
            basePath:path,
            cdnPath:'http://cdn5.xxxxx.com/'
          }
          ProcessManifest.map_manifest(params,file,function(_,file) {
            fileResult = file;
            done();
          });



        });

        it("manifest changed",{
          trace(fileResult.pretty());
          fileResult.toString().contains('cdn5').should.be(true);
        });


      });



}

}

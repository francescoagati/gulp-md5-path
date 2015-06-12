import thx.Functions.fn;
import Externs;
import js.node.Buffer;
import Sure.sure;
using FileTools;
using thx.Arrays;
using thx.Functions;


class Md5Test extends nanotest.NanoTestCase {

    public function testBasic(){

        var file:AFile = new Vinyl({
          cwd: "/",
          base: "/test/",
          path: "/test/file.coffee",
          contents: new Buffer("Hello world")
        });

    

        sure(file.toMd5().basename == 'file-3e25960a79dbc69b674cd4ec67a72c62.coffee');


    }

}

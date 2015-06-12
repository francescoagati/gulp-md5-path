import nanotest.NanoTestRunner;
import nanotest.NanoTestCase;


class Test {
    static function main(){
        var r = new NanoTestRunner();
        r.add(new Md5Test());
        r.add(new ManifestTest());
        r.run();
    }
}

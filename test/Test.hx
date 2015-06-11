
class Test {
    static function main(){
        var r = new haxe.unit.TestRunner();
        r.add(new Md5Test());
        r.run();
    }
}

(function() {
    var Foo = Java.type("midwestjs.nashorn.Foo");
    var FooImpl = Java.extend(Foo);
    return new FooImpl() {
        getMessage: function() {
            return "Ok";
        }
    }
})();
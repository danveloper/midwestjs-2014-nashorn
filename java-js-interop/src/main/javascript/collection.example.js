// Reference to ArrayList type
var List = Java.type("java.util.ArrayList");

// An interface that provides default implementations for java.util.function.{Consumer,Function}
var ConsumingFunction = Java.type("midwestjs.nashorn.ConsumingFunction");

// Convert appropriately
function toFunc(fn) {
    return new ConsumingFunction() {
        apply: fn,
        accept: fn
    }
}

(function() {

    var list = new List();
    list.add(1);
    list.add(2);
    list.add(3);

    list.stream()
        .map(toFunc(function(a) { return a * 2; }))
        .forEach(toFunc(function(a) { print(a); }));

})();
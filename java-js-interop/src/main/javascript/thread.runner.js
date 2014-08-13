(function() {
    var Thread = Java.type("java.lang.Thread");
    var ThreadImpl = Java.extend(Thread);
    var thread = new ThreadImpl()
    {
        run: function () {
            var i = 0;
            while (i++ < 5) {
                print("Inside thread!");
                Thread.sleep(2000);
            }
        }
    }
    thread.start();
    thread.join();
})();
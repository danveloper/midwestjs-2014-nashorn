package midwestjs.nashorn;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.InputStream;

public class Main {
    private static final ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");

    @SuppressWarnings({ "unchecked", "ResultOfMethodCallIgnored" })
    private static <T> T js(String path) throws Throwable {
        InputStream is = Main.class.getResourceAsStream(path);
        byte[] buf = new byte[is.available()];
        is.read(buf);
        return (T)engine.eval(new String(buf));
    }

    public static void main(String[] args) throws Throwable {
        js("/collection.example.js");
    }

}

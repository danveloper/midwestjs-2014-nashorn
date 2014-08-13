package midwestjs.nashorn;

import java.util.function.Consumer;
import java.util.function.Function;

public interface ConsumingFunction extends Function, Consumer {
    public default void accept(Object o) {
    }
    public default Object apply(Object o) {
        return null;
    }
}

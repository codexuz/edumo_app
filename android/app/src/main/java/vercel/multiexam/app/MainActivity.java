package vercel.multiexam.app;

import android.os.Bundle; // Importing Bundle class
import java.util.ArrayList; // Importing ArrayList class
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin; // Importing Plugin class
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Init Bridge
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {
            {
                add(GoogleAuth.class);
            }
        });
    }
}

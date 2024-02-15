package vercel.multiexam.app;

import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAauth.GoogleAuth;

public class MainActivity extends BridgeActivity {
	@Override
	public void OnCreate(Bundle savedInstanceState){
		super.OnCreate(savedInstanceState)

		//Init Bridge
	   this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>(){{
         add(GoogleAuth.class)
	   }})
	}
}

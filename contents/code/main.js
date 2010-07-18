// tell everyone we're busy
plasmoid.busy = true;

/**
  * initialize the plasmoid
  */
this.initialize = function()
{
	// prototypes for existing classes
	plasmoid.include("array.js");
	plasmoid.include("object.js");
	plasmoid.include("number.js");
	
	// all includes
	plasmoid.include("global.js");
	plasmoid.include("plasmoidhandler.js");
	plasmoid.include("layout.js");
	plasmoid.include("constants.js");
	plasmoid.include("keyconfiguration.js");
	plasmoid.include("layoutconfiguration.js");
	plasmoid.include("configuration.js");
	plasmoid.include("keyinformationcontainer.js")
	plasmoid.include("keyinformation.js");
	
	// create our Global object
	global = new Global();
	
	// fill our global object with information
	global.configuration = new Configuration();
	global.constants = new Constants();
	global.keyInformation= new KeyInformation();
	global.layout = new Layout();
	
	// initialize thes plasmoid handler (which initializes the whole plasmoid)
	PlasmoidHandler.initialize();
}

this.initialize();
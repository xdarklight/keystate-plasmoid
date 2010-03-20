/**
  * our 'global' object which is available everywhere in the code
  * do NOT pass this to any function/class as that's not necessary
  */
Global = function()
{
	/**
	  * points to an array of key object names
	  */
	this.keyNames = new Array();
	
	/**
	  * points to the plasmoid's configuration
	  */
	this.configuration = null;
	
	/**
	  * points to the constants object
	  */
	this.constants = null;
	
	/**
	  * points to the plasmoid's layout handling object
	  */
	this.layout = null;
	
	/**
	  * points to an object with all key information in it
	  */
	this.keyInformation = null;
	
	/**
	  * points to an object with all localization information in it
	  */
	this.localization = null;
}

/**
  * initializes the global object
  */
Global.initialize = function()
{
	global = new Global();
	
	// include the plasmoid handler
	plasmoid.include("plasmoidhandler.js");
	
	// initialize a plasmoid handler (which initializes the whole plasmoid)
	PlasmoidHandler.initialize();
}
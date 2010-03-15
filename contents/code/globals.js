/**
  * our globals object which is available everywhere in the code
  * do NOT pass this to any function/class as that's not necessary
  */
Globals = function()
{
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
	  * points to a list of key information objects
	  */
	this.keyInformationList = null;
}
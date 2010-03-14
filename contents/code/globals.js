/**
  * our globals object which is available everywhere in the code
  * do NOT pass this to any function/class as that's not necessary
  */
Globals = function()
{
	/**
	  * the state of the num lock key
	  */
	this.numLockEnabled = false;
	
	/**
	  * the state of the caps lock key
	  */
	this.capsLockEnabled = false;
	
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
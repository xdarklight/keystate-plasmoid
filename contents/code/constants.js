/**
  * an object which holds all constants
  */
Constants = function()
{
	// constants
	engineName = "keystate";
	numLockObjectName = "Num Lock";
	capsLockObjectName = "Caps Lock";
	
	/**
	  * returns the name of the data engine
	  */
	this.engineName = function()
	{
		return engineName;
	}
	
	/**
	  * returns the value of the num lock object name
	  */
	this.numLockObjectName = function()
	{
		return numLockObjectName;
	}
	
	/**
	  * returns the value of the caps lock object name
	  */
	this.capsLockObjectName = function()
	{
		return capsLockObjectName;
	}
}
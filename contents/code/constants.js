/**
  * an object which holds all constants
  */
Constants = function()
{
	// constants
	engineName = "keystate";
	numLockObjectName = "Num Lock";
	capsLockObjectName = "Caps Lock";
	verticalLayoutName = "vertical";
	horizontalLayoutName = "horizontal";
	
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
	
	/**
	  * returns the name of the vertical layout
	  */
	this.verticalLayoutName = function()
	{
		return verticalLayoutName;
	}
	
	/**
	  * returns the name of the horizontal layout
	  */
	this.horizontalLayoutName = function()
	{
		return horizontalLayoutName;
	}
}
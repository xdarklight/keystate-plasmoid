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
	textLayoutName = "text";
	textLayoutNumText = "Num Lock: %1";
	textLayoutCapsText = "Caps Lock: %1";
	textLayoutPlaceholderNotLocked = "Off";
	textLayoutPlaceholderLocked = "On";
	
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
	  * returns the name of the text layout
	  */
	this.textLayoutName = function()
	{
		return textLayoutName;
	}
	
	/**
	  * returns the name of the horizontal layout
	  */
	this.horizontalLayoutName = function()
	{
		return horizontalLayoutName;
	}
	
	/**
	  * returns the text (with placeholders) for the num lock status for the text layout
	  */
	this.textLayoutNumText = function()
	{
		return textLayoutNumText;
	}
	
	/**
	  * returns the text (with placeholders) for the caps lock status for the text layout
	  */
	this.textLayoutCapsText = function()
	{
		return textLayoutCapsText;
	}
	
	/**
	  * returns the text for the "is locked" placeholder in the text layout when the modifier is enabled
	  */
	this.textLayoutPlaceholderLocked = function()
	{
		return textLayoutPlaceholderLocked;
	}
	
	/**
	  * returns the text for the "not locked" placeholder in the text layout when the modifier is disabled
	  */
	this.textLayoutPlaceholderNotLocked = function()
	{
		return textLayoutPlaceholderNotLocked;
	}
}
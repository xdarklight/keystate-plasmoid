/**
  * an object which holds all constants
  */
Constants = function()
{
	// constants
	engineName = "keystate";
	numLockObjectName = "Num Lock";
	capsLockObjectName = "Caps Lock";
	shiftPressedObjectName = "Shift";
	controlPressedObjectName = "Ctrl";
	altPressedObjectName = "Alt";
	altgrPressedObjectName = "AltGr";
	metaPressedObjectName = "Meta";
	superPressedObjectName = "Super";
	hyperPressedObjectName = "Hyper";
	verticalLayoutName = "vertical";
	horizontalLayoutName = "horizontal";
	textLayoutName = "text";
	singleLayoutName = "single";
	numLockedText = "Num";
	capsLockedText = "Caps";
	shiftPressedText = "Shift";
	controlPressedText = "Ctrl";
	altPressedText = "Alt";
	altgrPressedText = "AltGr";
	metaPressedText = "Meta";
	superPressedText = "Super";
	hyperPressedText = "Hyper";
	indexNotFound = -1;
	
	fullyTransparentColor = new QColor(0, 0, 0, 0);
	
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
	  * returns the value of the shift pressed object name
	  */
	this.shiftPressedObjectName = function()
	{
		return shiftPressedObjectName;
	}
	
	/**
	  * returns the value of the control pressed object name
	  */
	this.controlPressedObjectName = function()
	{
		return controlPressedObjectName;
	}
	
	/**
	  * returns the value of the alt pressed object name
	  */
	this.altPressedObjectName = function()
	{
		return altPressedObjectName;
	}
	
	/**
	  * returns the value of the alt gr pressed object name
	  */
	this.altgrPressedObjectName = function()
	{
		return altgrPressedObjectName;
	}
	
	/**
	  * returns the value of the meta pressed object name
	  */
	this.metaPressedObjectName = function()
	{
		return metaPressedObjectName;
	}
	
	/**
	  * returns the value of the super pressed object name
	  */
	this.superPressedObjectName = function()
	{
		return superPressedObjectName;
	}
	
	/**
	  * returns the value of the hyper pressed object name
	  */
	this.hyperPressedObjectName = function()
	{
		return hyperPressedObjectName;
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
	  * returns the name of the single layout
	  */
	this.singleLayoutName = function()
	{
		return this.singleLayoutName;
	}
	
	/**
	  * returns the text for the num lock status
	  */
	this.numLockedText = function()
	{
		return numLockedText;
	}
	
	/**
	  * returns the text for the caps lock status
	  */
	this.capsLockedText = function()
	{
		return capsLockedText;
	}
	
	/**
	  * returns the text for the shift pressed status
	  */
	this.shiftPressedText = function()
	{
		return shiftPressedText;
	}
	
	/**
	  * returns the text for the control pressed status
	  */
	this.controlPressedText = function()
	{
		return controlPressedText;
	}
	
	/**
	  * returns the text for the alt pressed status
	  */
	this.altPressedText = function()
	{
		return altPressedText;
	}
	
	/**
	  * returns the text for the alt gr pressed status
	  */
	this.altgrPressedText = function()
	{
		return altPressedText;
	}
	
	/**
	  * returns the text for the meta pressed status
	  */
	this.metaPressedText = function()
	{
		return metaPressedText;
	}
	
	/**
	  * returns the text for the super pressed status
	  */
	this.superPressedText = function()
	{
		return superPressedText;
	}
	
	/**
	  * returns the text for the hyper pressed status
	  */
	this.hyperPressedText = function()
	{
		return hyperPressedText;
	}
	
	/**
	  * returns a fully transparent color
	  */
	this.fullyTransparentColor = function()
	{
		return fullyTransparentColor;
	}
	
	/**
	  * returns a value when an index was not found
	  */
	this.indexNotFound = function()
	{
		return indexNotFound;
	}
}
/**
  * an object which holds all constants
  */
Constants = function()
{
	// constants
	numLockObjectName = "Num Lock";
	capsLockObjectName = "Caps Lock";
	shiftPressedObjectName = "Shift";
	controlPressedObjectName = "Ctrl";
	altPressedObjectName = "Alt";
	altgrPressedObjectName = "AltGr";
	metaPressedObjectName = "Meta";
	superPressedObjectName = "Super";
	hyperPressedObjectName = "Hyper";
	verticalLayoutName = "VerticalLayout";
	horizontalLayoutName = "HorizontalLayout";
	textLayoutName = "TextLayout";
	singleLayoutName = "SingleLayout";
	dataLockedPropertyName = "Locked";
	dataPressedPropertyName = "Pressed";
	indexNotFound = -1;
	
	fullyTransparentColor = new QColor(0, 0, 0, 0);
	
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
		return singleLayoutName;
	}
	
	/**
	  * returns a fully transparent color
	  */
	this.fullyTransparentColor = function()
	{
		return fullyTransparentColor;
	}
	
	/**
	  * returns the name of the property of the 'Locked' status in
	  * the data object which contains the key information
	  */
	this.dataLockedPropertyName = function()
	{
		return dataLockedPropertyName;
	}
	
	/**
	  * returns the name of the property of the 'Pressed' status in
	  * the data object which contains the key information
	  */
	this.dataPressedPropertyName = function()
	{
		return dataPressedPropertyName;
	}
	
	/**
	  * returns a value when an index was not found
	  */
	this.indexNotFound = function()
	{
		return indexNotFound;
	}
}
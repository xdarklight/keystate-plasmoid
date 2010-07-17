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
	rectangleLayoutName = "RectangleLayout";
	textLayoutName = "TextLayout";
	symbolLayoutName = "SymbolLayout";
	horizontalOrientationName = "HorizontalOrientation";
	verticalOrientationName = "VerticalOrientation";
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
	  * returns the name of the rectangle layout
	  */
	this.rectangleLayoutName = function()
	{
		return rectangleLayoutName;
	}
	
	/**
	  * returns the name of the text layout
	  */
	this.textLayoutName = function()
	{
		return textLayoutName;
	}
	
	/**
	  * returns the name of the symbol layout
	  */
	this.symbolLayoutName = function()
	{
		return symbolLayoutName;
	}
	
	/**
	  * returns a fully transparent color
	  */
	this.fullyTransparentColor = function()
	{
		return fullyTransparentColor;
	}
	
	/**
	  * returns the name of the horizontal orientation
	  */
	this.horizontalOrientation = function()
	{
		return horizontalOrientationName;
	}
	
	/**
	  * returns the name of the vertical orientation
	  */
	this.verticalOrientation = function()
	{
		return verticalOrientationName;
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
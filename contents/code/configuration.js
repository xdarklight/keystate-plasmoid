/**
  * an object which holds all configuration related data
  */
Configuration = function()
{
	// configuration properties
	iconPadding = 1;
	imageSpacing = 1;
	numLockColor = new QColor();
	capsLockColor = new QColor();
	fullyTransparentColor = new QColor(0, 0, 0, 0);
	
	/**
	  * reads the settings from the configuration file
	  * and fills the properties of the configuration object
	  */
	this.initialize = function()
	{
		// constants
		var numLockColorConfigName = "NumLockColor";
		var capsLockColorConfigName = "CapsLockColor";
		var imageSpacingConfigName = "ImageSpacing";
		
		// config values
		var numLockColorConfigValue = plasmoid.readConfig(numLockColorConfigName);
		var capsLockColorConfigValue = plasmoid.readConfig(capsLockColorConfigName);
		var imageSpacingConfigValue = plasmoid.readConfig(imageSpacingConfigName);
		
		// save our settings internally
		numLockColor = new QColor(numLockColorConfigValue);
		capsLockColor = new QColor(capsLockColorConfigValue);
		imageSpacing = parseInt(imageSpacingConfigValue);
	}
	
	/**
	  * returns the (top and bottom) padding of the icon
	  */
	this.iconPadding = function()
	{
		return iconPadding;
	}
	
	/**
	  * returns the spacing between the two images
	  */
	this.imageSpacing = function()
	{
		return imageSpacing;
	}
	
	/**
	  * returns the color for the num lock part
	  */
	this.numLockColor = function()
	{
		return numLockColor;
	}
	
	/**
	  * returns the color for the caps lock part
	  */
	this.capsLockColor = function()
	{
		return capsLockColor;
	}
	
	/**
	  * returns a fully transparent color
	  */
	this.fullyTransparentColor = function()
	{
		return fullyTransparentColor;
	}
}
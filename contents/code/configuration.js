/**
  * an object which holds all configuration related data
  */
Configuration = function()
{
	// configuration properties
	imageSpacing = 1;
	numLockColor = new QColor();
	capsLockColor = new QColor();
	layoutName = "";
	
	// transient values (values that are never saved)
	fullyTransparentColor = new QColor(0, 0, 0, 0);
	constants = null;
	
	// internal constants
	numLockColorConfigName = "NumLockColor";
	capsLockColorConfigName = "CapsLockColor";
	imageSpacingConfigName = "ImageSpacing";
	verticalLayoutConfigName= "VerticalLayout";
	horizontalLayoutConfigName= "HorizontalLayout";
	
	/**
	  * gets the layout name depending on the configuration options
	  */
	this.getLayoutName = function()
	{
		// read the config file values
		var verticalLayoutConfigValue = plasmoid.readConfig(verticalLayoutConfigName);
		var horizontalLayoutConfigValue = plasmoid.readConfig(horizontalLayoutConfigName);
		
		// parse the values from the config file
		var verticalLayout = Boolean(verticalLayoutConfigValue);
		var horizontalLayout = Boolean(horizontalLayoutConfigValue);
		
		// check which layout is enabled
		if (verticalLayout == true)
		{
			// the vertical layout is enabled
			return constants.verticalLayoutName();
		}
		else
		{
			// default to horizontal layout
			return constants.horizontalLayoutName();
		}
	}
	
	/**
	  * constructor - does initial setup for the object
	  */
	this.Configuration = function()
	{
		// include the constants file
		plasmoid.include("constants.js");
		
		// create a constants object
		constants = new Constants();
	}
	
	/**
	  * reads the settings from the configuration file
	  * and fills the properties of the configuration object
	  */
	this.initialize = function()
	{
		// config values
		var numLockColorConfigValue = plasmoid.readConfig(numLockColorConfigName);
		var capsLockColorConfigValue = plasmoid.readConfig(capsLockColorConfigName);
		var imageSpacingConfigValue = plasmoid.readConfig(imageSpacingConfigName);
		
		// save our settings internally
		numLockColor = new QColor(numLockColorConfigValue);
		capsLockColor = new QColor(capsLockColorConfigValue);
		imageSpacing = parseInt(imageSpacingConfigValue);
		
		// get the correct layout
		layoutName = this.getLayoutName();
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
	
	/**
	  * returns the name of the selected layout
	  */
	this.layoutName = function()
	{
		return layoutName;
	}
}
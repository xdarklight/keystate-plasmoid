/**
  * an object which holds all configuration related data
  */
Configuration = function()
{
	// configuration properties
	imageSpacing = 1;
	topAndBottomPadding = 2;
	numLockColor = new QColor();
	capsLockColor = new QColor();
	layoutName = "";
	
	// transient values (values that are never saved)
	constants = null;
	
	// internal constants
	numLockColorConfigName = "NumLockColor";
	capsLockColorConfigName = "CapsLockColor";
	imageSpacingConfigName = "ImageSpacing";
	imagePaddingConfigName = "ImagePadding";
	verticalLayoutConfigName= "VerticalLayout";
	horizontalLayoutConfigName= "HorizontalLayout";
	textLayoutConfigName = "TextLayout";
	
	/**
	  * gets the layout name depending on the configuration options
	  */
	this.getLayoutName = function()
	{
		// read the config file values
		var verticalLayoutConfigValue = plasmoid.readConfig(verticalLayoutConfigName);
		var horizontalLayoutConfigValue = plasmoid.readConfig(horizontalLayoutConfigName);
		var textLayoutConfigValue = plasmoid.readConfig(textLayoutConfigName);
		
		// parse the values from the config file
		var verticalLayout = Boolean(verticalLayoutConfigValue);
		var horizontalLayout = Boolean(horizontalLayoutConfigValue);
		var textLayout = Boolean(textLayoutConfigValue);
		
		// check which layout is enabled
		if (verticalLayout == true)
		{
			// the vertical layout is enabled
			return constants.verticalLayoutName();
		}
		else if (textLayout == true)
		{
			// the text layout is enabled
			return constants.textLayoutName();
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
		var imagePaddingConfigValue = plasmoid.readConfig(imagePaddingConfigName);
		
		// save our settings internally
		numLockColor = new QColor(numLockColorConfigValue);
		capsLockColor = new QColor(capsLockColorConfigValue);
		imageSpacing = parseInt(imageSpacingConfigValue);
		imagePadding = parseInt(imagePaddingConfigValue);
		
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
	
	this.imagePadding = function()
	{
		return imagePadding;
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
	  * returns the name of the selected layout
	  */
	this.layoutName = function()
	{
		return layoutName;
	}
}
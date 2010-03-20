/**
  * the layout configuration object which handles all 
  * layout related configuration (layout selection, fonts, etc.)
  */
LayoutConfiguration = function()
{
	this.selectedLayout = null;
	this.imageSpacing = 1;
	this.topAndBottomPadding = 2;
	this.font = new QFont("Sans Serif", 7);
	
	// internal constants
	uninitializedFontFamily = "FONT_FALLBACK";
	imageSpacingConfigName = "ImageSpacing";
	imagePaddingConfigName = "ImagePadding";
	fontConfigName = "Font";
	verticalLayoutConfigName= "VerticalLayout";
	horizontalLayoutConfigName= "HorizontalLayout";
	textLayoutConfigName = "TextLayout";
	singleLayoutConfigName = "SingleLayout";
	
	/**
	  * initializes the layout configuration
	  */
	this.initialize = function()
	{
		// config values
		var imageSpacingConfigValue = plasmoid.readConfig(imageSpacingConfigName);
		var imagePaddingConfigValue = plasmoid.readConfig(imagePaddingConfigName);
		var fontConfigValue = plasmoid.readConfig(fontConfigName);
		
		// TODO: workaround for the font problem:
		// we cannot specify a default font in the kcfg xml file
		// instead we use a fake default font family -> we can compare
		// the fake font familiy and see if it already has been initialized
		if (fontConfigValue.family == uninitializedFontFamily)
		{
			// write the default font settings to the config file
			plasmoid.writeConfig(fontConfigName, font);
			
			// re-read the font from the config file
			fontConfigValue = plasmoid.readConfig(fontConfigName);
		}
		
		// save our settings internally
		this.imageSpacing = parseInt(imageSpacingConfigValue);
		this.imagePadding = parseInt(imagePaddingConfigValue);
		this.font = fontConfigValue;
		
		// create an instance of the selected layout
		global.layout.instantiateSelectedLayout();
	}
	
	/**
	  * gets the layout name depending on the configuration options
	  */
	this.getSelectedLayoutName = function()
	{
		// read the config file values
		var verticalLayoutConfigValue = plasmoid.readConfig(verticalLayoutConfigName);
		var horizontalLayoutConfigValue = plasmoid.readConfig(horizontalLayoutConfigName);
		var textLayoutConfigValue = plasmoid.readConfig(textLayoutConfigName);
		var singleLayoutConfigValue = plasmoid.readConfig(singleLayoutConfigName);
		
		// parse the values from the config file
		var verticalLayout = Boolean(verticalLayoutConfigValue);
		var horizontalLayout = Boolean(horizontalLayoutConfigValue);
		var textLayout = Boolean(textLayoutConfigValue);
		var singleLayout = Boolean(singleLayoutConfigValue);
		
		// default to horizontal layout
		var selectedLayoutName = global.constants.horizontalLayoutName();
		
		// check which layout is enabled
		if (verticalLayout)
		{
			// the vertical layout is enabled
			selectedLayoutName = global.constants.verticalLayoutName();
		}
		else if (textLayout)
		{
			// the text layout is enabled
			selectedLayoutName = global.constants.textLayoutName();
		}
		else if (singleLayout)
		{
			// the single layout is enabled
			selectedLayoutName = global.constants.singleLayoutName();
		}
		
		return selectedLayoutName;
	}
	
	/**
	  * returns the layout which was selected by the user
	  */
	this.getSelectedLayout = function()
	{
		return this.selectedLayout;
	}
	
	/**
	  * returns the spacing between the two images
	  */
	this.getImageSpacing = function()
	{
		return this.imageSpacing;
	}
	
	/**
	  * returns the (top and bottom) borderspacing
	  */
	this.getImagePadding = function()
	{
		return this.imagePadding;
	}
	
	/**
	  * returns the configured font
	  */
	this.getFont = function()
	{
		return this.font;
	}
	
}
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
	this.preferredSizeEnabled = true;
	this.preferredWidth = 24;
	this.preferredHeight = 24;
	
	// internal constants
	uninitializedFontFamily = "FONT_FALLBACK";
	imageSpacingConfigName = "ImageSpacing";
	imagePaddingConfigName = "ImagePadding";
	fontConfigName = "Font";
	preferredSizeEnabledConfigName = "PreferredSizeEnabled";
	preferredWidthConfigName = "PreferredWidth";
	preferredWidthConfigName = "PreferredHeight";
	
	/**
	  * initializes the layout configuration
	  */
	this.initialize = function()
	{
		// config values
		var imageSpacingConfigValue = plasmoid.readConfig(imageSpacingConfigName);
		var imagePaddingConfigValue = plasmoid.readConfig(imagePaddingConfigName);
		var fontConfigValue = plasmoid.readConfig(fontConfigName);
		var preferredSizeEnabledConfigValue = plasmoid.readConfig(preferredSizeEnabledConfigName);
		var preferredWidthConfigValue = plasmoid.readConfig(preferredWidthConfigName);
		var preferredHeightConfigValue = plasmoid.readConfig(preferredWidthConfigName);
		
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
		this.preferredSizeEnabled = Boolean(preferredSizeEnabledConfigValue);
		this.preferredWidth = parseInt(preferredWidthConfigValue);
		this.preferredHeight = parseInt(preferredHeightConfigValue);
		
		// create an instance of the selected layout
		global.layout.instantiateSelectedLayout();
		
		// update the preferred size of the plasmoid
		global.layout.updatePreferredSize();
	}
	
	/**
	  * gets the layout name depending on the configuration options
	  */
	this.getSelectedLayoutName = function()
	{
		// build an array with all available layout names in it
		var availableLayouts = new Array(
			global.constants.horizontalLayoutName(),
			global.constants.verticalLayoutName(),
			global.constants.textLayoutName(),
			global.constants.singleLayoutName());
		
		// default to horizontal layout
		var selectedLayoutName = global.constants.horizontalLayoutName();
		
		for (var i = 0; i < availableLayouts.length; i++)
		{
			var layoutName = availableLayouts[i];
			
			// read the value from the config file
			var layoutConfigValue = plasmoid.readConfig(layoutName);
			
			// check if the layout is enabled
			if (Boolean(layoutConfigValue))
			{
				selectedLayoutName = layoutName;
				break;
			}
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
	
	/**
	  * returns whether the user prefers a size or not
	  */
	this.getPreferredSizeEnabled = function()
	{
		return this.preferredSizeEnabled;
	}
	
	/**
	  * returns the preferred width of the plasmoid
	  */
	this.getPreferredWidth = function()
	{
		return this.preferredWidth;
	}
	
	/**
	  * returns the preferred height of the plasmoid
	  */
	this.getPreferredHeight = function()
	{
		return this.preferredHeight;
	}
}
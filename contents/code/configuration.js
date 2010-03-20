/**
  * an object which holds all configuration related data
  */
Configuration = function()
{
	// configuration properties
	keyConfiguration = new KeyConfiguration();
	layoutConfiguration = new LayoutConfiguration();
	
	/**
	  * reads the settings from the configuration file
	  * and fills the properties of the configuration object
	  */
	this.initialize = function()
	{
		// initialize the key settings
		keyConfiguration.initialize();
		
		// initialize the layout settings
		layoutConfiguration.initialize();
	}
	
	/**
	  * returns the key configuration object
	  */
	this.keyConfiguration = function()
	{
		return keyConfiguration;
	}
	
	/**
	  * returns the layout configuration object
	  */
	this.layoutConfiguration = function()
	{
		return layoutConfiguration;
	}
}
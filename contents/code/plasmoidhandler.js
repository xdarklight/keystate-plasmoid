PlasmoidHandler = function()
{
	/**
	  * initializes the whole plasmoid
	  */
	this.initialize = function()
	{
		// tell everyone we're busy
		plasmoid.busy = true;
		
		// all includes
		plasmoid.include("layout.js");
		plasmoid.include("constants.js");
		plasmoid.include("configuration.js");
		
		// fill our globals object with information
		globals.configuration = new Configuration();
		globals.constants = new Constants();
		globals.contentLayout = new Layout();
		
		// read the config file
		globals.configuration.initialize();
		
		// register all events of the plasmoid object
		this.registerPlasmoidEvents();
	}
	
	/**
	  * registers all events (and related things) with the plasmoid object
	  */
	this.registerPlasmoidEvents = function()
	{
		// tell the global plasmoid object that it should send
		// all of it's events to us
		plasmoid.configChanged = this.configChanged;
		plasmoid.sizeChanged = this.sizeChanged;
		plasmoid.paintInterface = this.paintInterface;
		plasmoid.dataUpdated = this.dataUpdated;
		
		// register dataengines with our events
		dataEngine(globals.constants.engineName()).connectSource(globals.constants.numLockObjectName(), plasmoid);
		dataEngine(globals.constants.engineName()).connectSource(globals.constants.capsLockObjectName(), plasmoid);
	}
	
	/**
	  * called when the configuration of the plasmoid changed
	  */
	this.configChanged = function()
	{
		// re-read the config file
		globals.configuration.initialize();
		
		// then update the icon
		plasmoid.update();
	}

	/**
	  * called when the size of the plasmoid changed
	  */
	this.sizeChanged = function()
	{
		// the plasmoid's size changed -> update the icon
		plasmoid.update();
	}

	/**
	  * called when the interface should be updated
	  *
	  * @param painter a QPainter with which you can paint the interface
	  */
	this.paintInterface = function(painter)
	{
		// say we're busy
		plasmoid.busy = true;
		
		// paint the icon
		globals.contentLayout.paintIcon(painter);
		
		// we're done
		plasmoid.busy = false;
	}

	
	/**
	  * called when the DataEngines are updated
	  *
	  * @param name the name of the data source
	  * @param data the DateEngine's data
	  */
	this.dataUpdated = function(name, data)
	{
		var dataChanged = false;
		var currentModifierIsLocked = Boolean(data.Locked);
		
		// check which modifier was changed
		switch (name)
		{
			case globals.constants.capsLockObjectName():
				// check the CAPS lock modifier
				if (globals.capsLockEnabled != currentModifierIsLocked)
				{
					globals.capsLockEnabled = currentModifierIsLocked;
					dataChanged = true;
				}
				
				break;
			case globals.constants.numLockObjectName():
				// check the NUM lock modifier
				if (globals.numLockEnabled != currentModifierIsLocked)
				{
					globals.numLockEnabled = currentModifierIsLocked;
					dataChanged = true;
				}
				
				break;
			default:
				// well... this shouldn't have happened :(
				// but anyway: dataChanged is false: we will not update
				break;
		}
		
		// only update if the data changed
		if (dataChanged)
		{
			plasmoid.update();
		}
	}
}
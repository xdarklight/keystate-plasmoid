/**
  * the base layout - all layouts should inherit this.
  * NOTE: there's the abstract method drawKey(painter, keyName) which you have to implement!
  */
BaseLayout = function()
{
	// convenience variables
	this.layoutConfiguration = null;
	this.fontSize = null;
	
	// current coordinates for the painter
	this.xPosition = 0;
	this.yPosition = 0;
	
	// the number of pixels the drawing code will walk after a key has been painted
	this.walkSize = 0;
	
	/**
	  * paints the current layout
	  *
	  * @param painter the painter with which the code will draw
	  */
	this.paint = function(painter)
	{
		// initialize the layout
		this.initializeLayout(painter);
		
		// paint the keys
		this.paintKeys(painter);
	}
	
	/**
	  * resets all internal variables to their default values
	  */
	this.resetLayout = function()
	{
		// reset the painter positions
		this.xPosition = 0;
		this.yPosition = 0;
		this.walkSize = 0;
		
		// create a convenience variable so we don't need to enter the long
		// name for the layout configuration all time
		this.layoutConfiguration = global.configuration.layoutConfiguration();
		
		// update the fontSize
		this.fontSize = this.layoutConfiguration.font().pointSize;
	}
	
	/**
	  * initializes the layout
	  *
	  * @param painter the painter with which the code will draw
	  */
	this.initializeLayout = function(painter)
	{
		// reset all internal variables
		global.layout.currentLayout().resetLayout();
		
		// initialize the border
		this.initializeBorder();
		
		// initialize the layout (if necessary)
		this.initialize(painter);
		
		// append the spacing to the walking size
		this.walkSize += this.layoutConfiguration.imageSpacing();
	}
	
	/**
	  * paints all keys
	  */
	this.paintKeys = function(painter)
	{
		// FIXME this is a workaround for some oddity in plasma/the javascript interpreter ;)
		// create a new pen
		var pen = new QPen();
		
		for (var i = 0; i < global.keyInformation.count(); i++)
		{
			var keyName = global.keyInformation.getName(i);
			
			// tell our pen which color it has
			pen.color = global.keyInformation.getColor(keyName);
			
			// tell the painter to use our pen
			painter.pen = pen;
			
			// set our font
			painter.font = this.layoutConfiguration.font();
			
			// draw the current key
			this.drawKey(painter, keyName);
			
			// walk (update the positions on the x/y axis)
			this.walk();
		}
	}
	
	/**
	  * changes the position on the x or y axis so the painter
	  * doesn't overwrite the current items on the next run
	  *
	  * @parameter pixels (optional) forces the layout to walk the given number of pixels
	  */
	this.walk = function(pixels)
	{
		var walkingSize = null;
		
		// was the pixels parameter given?
		if (pixels)
		{
			// since it was given we're just walking by the given pixels
			walkingSize = pixels;
		}
		else
		{
			// since it was not given we're using the global walking size
			walkingSize = this.walkSize;
		}
		
		// change the positions on the correct axis
		if (this.layoutConfiguration.orientation() == global.constants.horizontalOrientation())
		{
			// we're walking on the x-axis: move on the x-axis
			this.xPosition += walkingSize;
		}
		else
		{
			// we're walking on the y-axis: move on the y-axis
			this.yPosition += walkingSize;
		}
	}
	
	/**
	  * base implementation which can be overwritten to initialize the layout
	  * this should initialize the layout-specific variables, for example walkSize
	  */
	this.initialize = function()
	{
		// base implementation does nothing
	}
	
	/** 
	  * initializes the painter positions so the painter is starting at the inner
	  * end of the border
	  */
	this.initializeBorder = function()
	{
		// walk one step so we're starting at the correct position (namely after
		// the border spacing)
		this.walk(this.layoutConfiguration.borderSpacing());
	}
	
	/**
	  * calculates the average size may be available for an item
	  * (ignoring any borders, spacing and other values)
	  */
	this.calculateAverageSize = function()
	{
		var size = null;
		
		// are we horizontal or vertical?
		if (global.configuration.layoutConfiguration().orientation() == global.constants.horizontalOrientation())
		{
			// we're horizontal - use the width as base value
			size = plasmoid.size.width;
		}
		else
		{
			// we're vertical - use the height as base value
			size = plasmoid.size.height;
		}
		
		// the average size an item may take
		return size / global.keyInformation.count();
	}
	
	/**
	  * try to guess a border spacing which looks fine on all systems/configurations
	  */
	this.guessBestBorderSpacing = function()
	{
		var averageSize = this.calculateAverageSize();
		
		// calculate the border spacing (the spacing between the border and the first/last item)
		// the lower limit is 8px
		// the best settings should be 50% of the the average item size
		// the upper limit is 20% of the average item size
		return Number.qBound(8, averageSize / 2, averageSize / 100 * 20);
	}
	
	/**
	  * try to guess an image spacing which looks fine on all systems/configurations
	  */
	this.guessBestImageSpacing = function()
	{
		var averageSize = this.calculateAverageSize();
		
		// calculate the image spacing (the spacing between two key items)
		// the lower limit is 3px
		// the best settings should be 25% of the average item size
		// the upper limit is 15% of the average item size
		return Number.qBound(3, averageSize / 4, averageSize / 100 * 15);
	}
}
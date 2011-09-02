/**
  * the generic layout object which is responsible
  * for drawing the correct layout (selected by the user)
  */
Layout = function()
{
	currentLayout = null;
	
	/**
	  * creates an instance of the selected layout
	  */
	this.createSelectedLayout = function()
	{
		var layoutName = global.configuration.layoutConfiguration().selectedLayoutName();
		
		// include the base layout
		plasmoid.include("baselayout.js");
		
		// handle the layout selection
		switch (layoutName)
		{
			case global.constants.rectangleLayoutName():
				// include the layout code
				plasmoid.include("rectanglelayout.js");
				
				// initialize the layout
				currentLayout = new RectangleLayout();
				
				break;
			case global.constants.textLayoutName():
				// include the layout code
				plasmoid.include("textbaselayout.js");
				plasmoid.include("textlayout.js");
				
				// initialize the layout
				currentLayout = new TextLayout();
				
				break;
				
			case global.constants.symbolLayoutName():
				// include the layout code
				plasmoid.include("textbaselayout.js");
				plasmoid.include("symbollayout.js");
				
				// initialize the layout
				currentLayout = new SymbolLayout();
				
				break;
				
			case global.constants.svgLayoutName():
				// include the layout code
				plasmoid.include("svglayout.js");
				
				// initialize the layout
				currentLayout = new SvgLayout();
				
				break;
		}
		
		// reset all internal variables of the layout
		currentLayout.resetLayout();
	}
	
	/**
	  * returns the instance of the current layout
	  */
	this.currentLayout = function()
	{
		return currentLayout;
	}
	
	/**
	  * paints the icon to the screen
	  *
	  * @param painter the painter used to paint the icon
	  */
	this.paintIcon = function(painter)
	{
		// paint the layout
		currentLayout.paint(painter);
	}
}
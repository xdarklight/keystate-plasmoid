/**
  * the generic layout object which is responsible
  * for drawing the correct layout (selected by the user)
  */
Layout = function()
{
	layout = null;
	
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
				layout = new RectangleLayout();
				
				break;
			case global.constants.textLayoutName():
				// include the layout code
				plasmoid.include("textbaselayout.js");
				plasmoid.include("textlayout.js");
				
				// initialize the layout
				layout = new TextLayout();
				
				break;
				
			case global.constants.symbolLayoutName():
				// include the layout code
				plasmoid.include("textbaselayout.js");
				plasmoid.include("symbollayout.js");
				
				// initialize the layout
				layout = new SymbolLayout();
				
				break;
				
			case global.constants.svgLayoutName():
				// include the layout code
				plasmoid.include("svglayout.js");
				
				// initialize the layout
				layout = new SvgLayout();
				
				break;
		}
		
		// reset all internal variables of the layout
		layout.resetLayout();
	}
	
	/**
	  * returns the instance of the current layout
	  */
	this.layout = function()
	{
		return layout;
	}
	
	/**
	  * paints the icon to the screen
	  *
	  * @param painter the painter used to paint the icon
	  */
	this.paintIcon = function(painter)
	{
		// paint the layout
		layout.paint(painter);
	}
}
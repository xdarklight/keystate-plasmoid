// by default we want to be quite small
plasmoid.setPreferredSize(24, 24);

// mandatory includes
plasmoid.include("globals.js");
plasmoid.include("plasmoidhandler.js");

// create a new globals object (which is globally available)
globals = new Globals();

// create a plasmoid handler object which does all general stuff
plasmoidHandler = new PlasmoidHandler();

// initialize the plasmoid handler (and thus the whole plasmoid)
plasmoidHandler.initialize();
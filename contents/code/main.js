// by default we want to be quite small
plasmoid.setPreferredSize(24, 24);

// mandatory includes
plasmoid.include("global.js");
plasmoid.include("plasmoidhandler.js");

// create a new global.object (which is globally available)
global = new Global();

// create a plasmoid handler object which does all general stuff
plasmoidHandler = new PlasmoidHandler();

// initialize the plasmoid handler (and thus the whole plasmoid)
plasmoidHandler.initialize();
// by default we want to be quite small
plasmoid.setPreferredSize(24, 24);

// mandatory includes
plasmoid.include("global.js");

// create a new global.object (which is globally available)
Global.initialize();
# KeyState Plasmoid

An accessibility Plasmoid that shows the status of various key on your keyboard (for example if "Caps Lock" is enabled or "Meta" is pressed).

### Installation

Download this git repository, then run:
```
plasmapkg2 -i /path/to/keystate-plasmoid/
```

Updating it is very similar: update to the latest git version and run:
```
plasmapkg2 -i /path/to/keystate-plasmoid/
```

### Questions + Answers

**Q:** Where does the plasmoid get it's data from?<br>
**A:** It gets it's data from the 'keystatus' DataEngine (which is shipped with Plasma)

**Q:** Ok, I've installed it but how do I uninstall it?<br>
**A:** ```plasmapkg2 -u eu.blumenstingl.martin.keystateplasmoid```

### Todo's

 - Maybe add a SVG layout that uses files shipped with the Plasma theme?
 - A better KConfig default value for the font

License
----

The code is licensed under the GNU General Public License v2.0

Copyright (c) 2010-2015 Martin Blumenstingl

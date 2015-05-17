import QtQuick 2.0
import org.kde.plasma.plasmoid 2.0
import org.kde.plasma.core 2.0 as PlasmaCore

Item {
	property ListModel model
	property int spacing

	id: keyState

	KeyNameDelegate {
		id: keyNameRenderer
	}

	KeySymbolDelegate {
		id: keySymbolRenderer
	}

	ColoredRectangleDelegate {
		id: coloredRectangleRenderer
	}

	ListView {
		id: mainListView

		anchors.fill: parent
		spacing: keyState.spacing

		orientation: plasmoid.configuration["VerticalOrientation"] ? ListView.Vertical : ListView.Horizontal

		model: keyState.model
		delegate: {
			if (plasmoid.configuration["TextLayout"]) {
				return keyNameRenderer;
			} else if (plasmoid.configuration["SymbolLayout"]) {
				return keySymbolRenderer;
			} else if (plasmoid.configuration["RectangleLayout"]) {
				return coloredRectangleRenderer;
			} else {
				console.log("None of the layouts is selected!");
				return keyNameRenderer;
			}
		}
	}
}

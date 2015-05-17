import QtQuick 2.0
import org.kde.plasma.plasmoid 2.0
import org.kde.plasma.core 2.0 as PlasmaCore
import "plasmapackage:/code/logic.js" as Logic

Item {
	id: root

	PlasmaCore.DataModel {
		id: keyStateDataModel

		dataSource: PlasmaCore.DataSource {
			engine: "keystate"
			connectedSources: Logic.getDataSources()
			onNewData: {
				Logic.setData(keyStateDataModel.dataSource.data)

				updateModel();
			}
		}
		keyRoleFilter: "Pressed"
	}

	KeyNameDelegate {
		id: keyNameRenderer
	}

	KeySymbolDelegate {
		id: keySymbolRenderer
	}

	ColoredRectangleDelegate {
		id: coloredRectangleRenderer
	}

	ListModel {
		id: keyListModel
	}

	ListView {
		id: mainListView

		anchors.fill: parent
		anchors.margins: 5

		orientation: plasmoid.configuration["VerticalOrientation"] ? ListView.Vertical : ListView.Horizontal

		model: keyListModel
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

	function updateModel() {
		keyListModel.clear();

		var keyInfoItems = [];

		Logic.getModel().forEach(function(keyInfo) {
			keyInfoItems.push(keyInfo);
		});

		keyInfoItems.sort(function(a, b) {
			return a.sortIndex - b.sortIndex;
		}).forEach(function(keyInfo) {
			keyListModel.append(keyInfo);
		});
	}
}

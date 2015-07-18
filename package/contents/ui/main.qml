import QtQuick 2.0
import org.kde.plasma.plasmoid 2.0
import org.kde.plasma.core 2.0 as PlasmaCore
import "../code/logic.js" as Logic

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

	ListModel {
		id: keyListModel
	}

	Plasmoid.compactRepresentation: KeyState {
		model: keyListModel

		spacing: 1
	}

	Plasmoid.fullRepresentation: KeyState {
		model: keyListModel

		spacing: theme.mSize(plasmoid.configuration["Font"]).width / 2
	}

	function updateModel() {
		keyListModel.clear();

		var keyInfoItems = [];

		Logic.getModel().forEach(function(keyInfo) {
			if (keyInfo.isPressed && plasmoid.configuration[keyInfo.visibilityConfigKey]) {
				keyInfoItems.push(keyInfo);
			}
		});

		keyInfoItems.sort(function(a, b) {
			return a.sortIndex - b.sortIndex;
		}).forEach(function(keyInfo) {
			keyListModel.append(keyInfo);
		});
	}
}

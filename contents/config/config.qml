import QtQuick 2.0
import org.kde.plasma.configuration 2.0

ConfigModel {
	ConfigCategory {
		name: i18n("Appearance")
		icon: "preferences-desktop-color"
		source: "config/AppearancePage.qml"
	}

	ConfigCategory {
		name: i18n("Keys")
		icon: "preferences-desktop-keyboard"
		source: "config/KeysPage.qml"
	}
}

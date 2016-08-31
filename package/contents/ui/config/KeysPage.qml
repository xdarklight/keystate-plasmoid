import QtQuick 2.0
import QtQuick.Controls 1.2 as QtControls
import QtQuick.Layouts 1.0 as QtLayouts
import "../components" as KeyStateComponents

Item {
	width: childrenRect.width
	height: childrenRect.height

	property alias cfg_ShowNumLock: checkBoxNumLock.checked
	property alias cfg_ShowCapsLock: checkBoxCapsLock.checked
	property alias cfg_ShowScrollLock: checkBoxScrollLock.checked
	property alias cfg_ShowShiftPressed: checkBoxShiftPressed.checked
	property alias cfg_ShowCtrlPressed: checkBoxCtrlPressed.checked
	property alias cfg_ShowMetaPressed: checkBoxMetaPressed.checked
	property alias cfg_ShowSuperPressed: checkBoxSuperPressed.checked
	property alias cfg_ShowHyperPressed: checkBoxHyperPressed.checked
	property alias cfg_ShowAltPressed: checkBoxAltPressed.checked
	property alias cfg_ShowAltGrPressed: checkBoxAltGrPressed.checked
	property alias cfg_ShowInactiveKeys: checkBoxShowInactiveKeys.checked

	property alias cfg_NumLockColor: colorSelectorNumLock.color
	property alias cfg_CapsLockColor: colorSelectorCapsLock.color
	property alias cfg_ScrollLockColor: colorSelectorScrollLock.color
	property alias cfg_ShiftPressedColor: colorSelectorShiftPressed.color
	property alias cfg_CtrlPressedColor: colorSelectorCtrlPressed.color
	property alias cfg_MetaPressedColor: colorSelectorMetaPressed.color
	property alias cfg_SuperPressedColor: colorSelectorSuperPressed.color
	property alias cfg_HyperPressedColor: colorSelectorHyperPressed.color
	property alias cfg_AltPressedColor: colorSelectorAltPressed.color
	property alias cfg_AltGrPressedColor: colorSelectorAltGrPressed.color
	property alias cfg_InactiveKeyColor: colorSelectorInactiveKey.color

	QtLayouts.GridLayout {
		columns: 2

		QtControls.CheckBox {
			id: checkBoxNumLock
			text: i18n("Num Lock")
		}

		KeyStateComponents.ColorSelector {
			id: colorSelectorNumLock
		}

		QtControls.CheckBox {
			id: checkBoxCapsLock
			text: i18n("Caps Lock")
		}

		KeyStateComponents.ColorSelector {
			id: colorSelectorCapsLock
		}

		QtControls.CheckBox {
			id: checkBoxScrollLock
			text: i18n("Scroll Lock")
		}

		KeyStateComponents.ColorSelector {
			id: colorSelectorScrollLock
		}

		QtControls.CheckBox {
			id: checkBoxShiftPressed
			text: i18n("Shift pressed")
		}

		KeyStateComponents.ColorSelector {
			id: colorSelectorShiftPressed
		}

		QtControls.CheckBox {
			id: checkBoxCtrlPressed
			text: i18n("Control pressed")
		}

		KeyStateComponents.ColorSelector {
			id: colorSelectorCtrlPressed
		}

		QtControls.CheckBox {
			id: checkBoxMetaPressed
			text: i18n("Meta pressed")
		}

		KeyStateComponents.ColorSelector {
			id: colorSelectorMetaPressed
		}

		QtControls.CheckBox {
			id: checkBoxSuperPressed
			text: i18n("Super pressed")
		}

		KeyStateComponents.ColorSelector {
			id: colorSelectorSuperPressed
		}

		QtControls.CheckBox {
			id: checkBoxHyperPressed
			text: i18n("Hyper pressed")
		}

		KeyStateComponents.ColorSelector {
			id: colorSelectorHyperPressed
		}

		QtControls.CheckBox {
			id: checkBoxAltPressed
			text: i18n("Alt pressed")
		}

		KeyStateComponents.ColorSelector {
			id: colorSelectorAltPressed
		}

		QtControls.CheckBox {
			id: checkBoxAltGrPressed
			text: i18n("AltGr pressed")
		}

		KeyStateComponents.ColorSelector {
			id: colorSelectorAltGrPressed
		}

		QtControls.CheckBox {
			id: checkBoxShowInactiveKeys
			text: i18n("Always show inactive keys")
		}

		KeyStateComponents.ColorSelector {
			id: colorSelectorInactiveKey
		}
	}
}

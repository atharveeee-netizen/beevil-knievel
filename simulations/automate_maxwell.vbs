
Set oAnsoftApp = CreateObject("Ansoft.ElectronicsDesktop")
Set oDesktop = oAnsoftApp.GetAppDesktop()
oDesktop.RestoreWindow
Set oProject = oDesktop.GetActiveProject()
Set oDesign = oProject.GetActiveDesign()
Set oEditor = oDesign.SetActiveEditor("3D Modeler")

' Draw Ferrite Core
oEditor.CreateCylinder _
  Array("NAME:CylinderParameters", "XCenter:=", "0mm", "YCenter:=", "0mm", "ZCenter:=", "-4mm", "Radius:=", "6mm", "Height:=", "8mm", "WhichAxis:=", "Z"), _
  Array("NAME:Attributes", "Name:=", "Ferrite_Core", "Flags:=", "", "Color:=", "(132 132 132)", "Transparency:=", 0, "PartCoordinateSystem:=", "Global", "UDMId:=", "", "MaterialValue:=", "" & chr(34) & "ferrite" & chr(34) & "", "SurfaceMaterialValue:=", "" & chr(34) & "" & chr(34) & "", "SolveInside:=", true, "ShellElement:=", false, "ShellElementThickness:=", "0mm", "IsMaterialEditable:=", true, "UseMaterialAppearance:=", false, "IsLightweight:=", false)

' Create Region
oEditor.CreateRegion _
  Array("NAME:RegionParameters", "PaddingType:=", "Absolute Offset", "XPadding:=", "50mm", "YPadding:=", "50mm", "ZPadding:=", "50mm"), _
  Array("NAME:Attributes", "Name:=", "Region", "Flags:=", "Wireframe#", "Color:=", "(255 0 0)", "Transparency:=", 0.8)

MsgBox "Maxwell 3D Solar MPPT Geometry & Region Built Automatically!"

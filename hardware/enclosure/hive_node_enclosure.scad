// ============================================================================
// BEEVIL KNIEVEL — 3D Printable IP67 Hexagonal Hive Node Enclosure
// Compatible with OpenSCAD / FreeCAD -> Export STL for 3D Printing
// Fits: Wio-E5 Mini, 1000mAh LiPo, 1W Solar Panel (60x55mm), ICS-43434 Mic Port
// ============================================================================

$fn = 60;

// Outer Dimensions
width_mm = 80.0;
height_mm = 90.0;
depth_mm = 35.0;
wall_thickness = 2.5;

// Solar Panel Recess Dimensions (Top Lid)
solar_w = 60.5;
solar_h = 55.5;
solar_d = 2.0;

module hex_body() {
    difference() {
        // Outer Hexagonal Shell
        cylinder(r = width_mm / 2, h = depth_mm, $fn = 6);
        
        // Inner Cavity
        translate([0, 0, wall_thickness])
            cylinder(r = (width_mm / 2) - wall_thickness, h = depth_mm, $fn = 6);
            
        // ICS-43434 Acoustic Mic Port (Bottom Vented Hole)
        translate([0, -width_mm/3, -1])
            cylinder(r = 3.0, h = wall_thickness + 2);
            
        // Cable Gland Hole for 1-Wire Temp Probes
        translate([width_mm/3, 0, depth_mm/2])
            rotate([0, 90, 0])
                cylinder(r = 4.0, h = wall_thickness + 2);
    }
}

module top_lid_with_solar_recess() {
    difference() {
        // Hex Lid Cap
        cylinder(r = (width_mm / 2) + 1.0, h = 4.0, $fn = 6);
        
        // Solar Panel Recess Slot
        translate([-solar_w/2, -solar_h/2, 2.0])
            cube([solar_w, solar_h, solar_d + 1.0]);
    }
}

// Render Main Body
translate([0, 0, 0]) hex_body();

// Render Top Lid (Separated for printing)
translate([width_mm * 1.3, 0, 0]) top_lid_with_solar_recess();

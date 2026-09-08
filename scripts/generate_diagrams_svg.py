"""
BEEVIL KNIEVEL - Programmatic Vector Diagram Generator
Wraps and executes the master publication-grade diagram generator.
Generates all 8 precision vector diagrams in docs/media/diagrams/.
"""

import sys
import os

from generate_publication_diagrams import (
    generate_01_problem,
    generate_02_sensor_placement,
    generate_03_acoustic_pipeline,
    generate_04_field_node,
    generate_05_lora_mesh,
    generate_06_gateway,
    generate_07_edge_analytics,
    generate_08_full_architecture
)

def generate_all():
    print("Regenerating all 8 publication-grade vector diagrams...")
    generate_01_problem()
    generate_02_sensor_placement()
    generate_03_acoustic_pipeline()
    generate_04_field_node()
    generate_05_lora_mesh()
    generate_06_gateway()
    generate_07_edge_analytics()
    generate_08_full_architecture()
    print("All 8 vector diagrams updated successfully.")

if __name__ == "__main__":
    generate_all()

#!/usr/bin/env python3

import json
from pathlib import Path

import yaml

cwd = Path(__file__).parents[0]
catalog_dir = cwd / "../carbonplan_data/catalogs"

out_file = "data.js"


def main():

    files = catalog_dir.glob("*yaml")

    data = {}
    for file in files:
        key = file.stem
        with open(file, "r") as f:
            data[key] = yaml.safe_load(f.read())

    with open(out_file, "w") as f:
        f.write("module.exports =")
        json.dump(data, f, indent=2)


if __name__ == "__main__":
    main()

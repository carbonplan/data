#!/usr/bin/env python3

import json
from pathlib import Path

import yaml

cwd = Path(__file__).parents[0]
catalog_dir = cwd / "../catalogs"

out_file = "data.json"


def main():

    files = catalog_dir.glob("*yaml")

    data = {}
    for file in files:
        key = file.stem
        print(key)
        with open(file, "r") as f:
            data[key] = yaml.safe_load(f.read())

    with open(out_file, "w") as f:
        json.dump(data, f, indent=2)

    print(data)


if __name__ == "__main__":
    main()

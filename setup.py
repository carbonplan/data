#!/usr/bin/env python

"""The setup script."""


import pathlib

from setuptools import find_packages, setup

with open("requirements.txt") as f:
    INSTALL_REQUIRES = f.read().strip().split("\n")

LONG_DESCRIPTION = pathlib.Path("README.md").read_text()
PYTHON_REQUIRES = ">=3.7"

description = "Preprocessing utilities for CarbonPlan's data catalog"

CLASSIFIERS = [
    "Development Status :: 3 - Alpha",
    "License :: OSI Approved :: MIT License",
    "Operating System :: OS Independent",
    "Intended Audience :: Science/Research",
    "Programming Language :: Python",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.7",
    "Programming Language :: Python :: 3.8",
    "Topic :: Scientific/Engineering",
]

setup(
    name="carbonplan-data",
    description=description,
    long_description=LONG_DESCRIPTION,
    long_description_content_type="text/markdown",
    maintainer="Joe Hamman",
    maintainer_email="joe@carbonplan.org",
    url="https://github.com/carbonplan/data",
    packages=find_packages(),
    include_package_data=True,
    python_requires=PYTHON_REQUIRES,
    install_requires=INSTALL_REQUIRES,
    tests_require=["pytest"],
    license="MIT",
    keywords="carbon, data, climate",
    use_scm_version={"version_scheme": "post-release", "local_scheme": "dirty-tag"},
)

[![Node CI](https://github.com/IlliaTemnov/frontend-project-lvl1/workflows/Node%20CI/badge.svg)](https://github.com/IlliaTemnov/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/71f8e550658aa9c68326/maintainability)](https://codeclimate.com/github/IlliaTemnov/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/dd8340b2c6abdc94b4cc/test_coverage)](https://codeclimate.com/github/IlliaTemnov/frontend-project-lvl2/test_coverage)

#                                                    Gendiff

Gendiff is a simple to use command-line program which compares two configuration files (.ini, .json, .yml) and shows
a difference in the stylish, plain, or json output formats.

## Installation

npm install gendiff

## Usage

`gendiff -f [type] <filepath1> <filepath2>`

`[type]` - stylish, plain or json

`<filepath1>` - path to the configuration file ( json, yml, ini)

* `-v, --vers, output the current version`                                                                                           
* `-f, --format [type] Output format`                                                                                              
* `-h, --help output usage information`

## Examples

Data comparing example of two plane .json files: 

[![asciicast](https://asciinema.org/a/96rRSMSaS4WdSUKUMr389L2nC.svg)](https://asciinema.org/a/96rRSMSaS4WdSUKUMr389L2nC)

Data comparing example of two plane .yml files:

[![asciicast](https://asciinema.org/a/eYEPZTyfzezLyaaZ61kM3CYw4.svg)](https://asciinema.org/a/eYEPZTyfzezLyaaZ61kM3CYw4)

Data comparing example of two plane .ini files:

[![asciicast](https://asciinema.org/a/e6vOtpcDt49ErUB8RmnzgfgIy.svg)](https://asciinema.org/a/e6vOtpcDt49ErUB8RmnzgfgIy)

Data comparing example of two .ini, .json, and .yml treelike files with stylish formatter:

[![asciicast](https://asciinema.org/a/44XbO5ybZdvCQ34v2wS0kQuyI.svg)](https://asciinema.org/a/44XbO5ybZdvCQ34v2wS0kQuyI)

Data comparing example of two .json treelike files with plain formatter:

[![asciicast](https://asciinema.org/a/tsqdVutwqPrzOuoXaayX6DtPx.svg)](https://asciinema.org/a/tsqdVutwqPrzOuoXaayX6DtPx)

Data comparing example of two tree files with JSON formatter:

[![asciicast](https://asciinema.org/a/FvhtzlonLJ1CdrleF7Jq9WjZk.svg)](https://asciinema.org/a/FvhtzlonLJ1CdrleF7Jq9WjZk)
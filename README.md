# WASM toolkit

A Javascript toolkit for wasm exploitation and reverse.

## Goals

Make WASM exploitation and reverse as easy as possible.

## Currently available

### The memory wrapper
A wrapper for the memory used to perform various actions on the memory like reading, writing and searching on multiple types:
* 8, 16, 32 bits unsigned numbers
* 8, 16, 32 bits signed numbers
* strings

To use it, you need to instantiate the classe contained in the memWrapper.js file in the console of your browser (Copy/Paste).

Once done, you can instantiate the classe:

* Chrome:
`var wrapper = new memoryWrapper($memory.buffer)`

* Firefox:
**TODO**

## TODO
- [ ] Add float support
- [ ] Add 64 bits signed and unsigned support
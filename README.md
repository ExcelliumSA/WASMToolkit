# WASM toolkit

A Javascript toolkit for wasm exploitation and reverse.

## Goals

Make WASM exploitation and reverse as easy as possible.

## Currently available

### The memory wrapper
A wrapper for the memory used to perform various actions on the memory like reading, writing and searching on multiple types:
* 8, 16, 32 bits unsigned numbers
* 8, 16, 32 bits signed numbers
* bytes array
* strings

To use it, you need to instantiate the classe contained in the memoryWrapper.js file in the console of your browser (Copy/Paste). This must be done when the debugger is not pausing the execution of the script (not on a breakpoint).

Once done, you can instantiate the classe when the WASM memory buffer is created by the browser, I usually breakpoint in the wasm code.

* Chrome:
`var wrapper = new memoryWrapper($memory.buffer);`

* Firefox:
`var wrapper = new memoryWrapper(wasmMemory.buffer);`

## TODO
- [ ] Add float support
- [ ] Add 64 bits signed and unsigned support

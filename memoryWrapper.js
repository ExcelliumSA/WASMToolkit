class memoryWrapper {
    ///*
    //
    // The goal of this class is to provide a way to easily handle the memory used by a wasm code
    //
    ///*

    constructor(memoryBuffer) {
        ///*
        // The constructor of the class. It needs a reference to the memory buffer
        ///*
        this.memoryView = new DataView(memoryBuffer);
    }

    read32bitsUnsigned(address) {
        ///*
        // Returns the 32 bits unsigned value in the memory buffer at the *address* memory address
        ///*
        return this.memoryView.getUint32(address);
    }

    read32bitsSigned(address) {
        ///*
        // Returns the 32 bits signed value in the memory buffer at the *address* memory address
        ///*
        return this.memoryView.getInt32(address);
    }

    read16bitsUnsigned(address) {
        ///*
        // Returns the 16 bits unsigned value in the memory buffer at the *address* memory address
        ///*
        return this.memoryView.getUint16(address);
    }

    read16bitsSigned(address) {
        ///*
        // Returns the 16 bits signed value in the memory buffer at the *address* memory address
        ///*
        return this.memoryView.getInt16(address);
    }

    read8bitsUnsigned(address) {
        ///*
        // Returns the 8 bits unsigned value in the memory buffer at the *address* memory address
        ///*
        return this.memoryView.getUint8(address);
    }

    read8bitsSigned(address) {
        ///*
        // Returns the 8 bits signed value in the memory buffer at the *address* memory address
        ///*
        return this.memoryView.getInt8(address);
    }

    write32bitsUnsigned(address, value) {
        ///*
        // Write the 32 bits unsigned *value* value in the memory buffer at the *address* memory address
        ///*
        this.memoryView.setUint32(address, value);
    }

    write32bitsSigned(address, value) {
        ///*
        // Write the 32 bits signed *value* value in the memory buffer at the *address* memory address
        ///*
        this.memoryView.setInt32(address, value);
    }

    write16bitsUnsigned(address, value) {
        ///*
        // Write the 16 bits unsigned *value* value in the memory buffer at the *address* memory address
        ///*
        this.memoryView.setUint16(address, value);
    }

    write16bitsSigned(address, value) {
        ///*
        // Write the 16 bits signed *value* value in the memory buffer at the *address* memory address
        ///*
        this.memoryView.setInt16(address, value);
    }

    write8bitsUnsigned(address, value) {
        ///*
        // Write the 8 bits signed *value* value in the memory buffer at the *address* memory address
        ///*
        this.memoryView.setUint8(address, value);
    }

    write8bitsSigned(address, value) {
        ///*
        // Write the 8 bits signed *value* value in the memory buffer at the *address* memory address
        ///*
        this.memoryView.setInt8(address, value);
    }

    readString(address) {
        ///*
        // Returns the string in the memory buffer starting at the *address* memory address.
        // The function stop at the first '0x00' character encountered.
        ///*
        var result = "";
        var i = 0;
        var currentChar = this.read8bitsUnsigned(address);
        while (currentChar !== 0) {
            result = result + String.fromCharCode(currentChar);
            i += 1;
            currentChar = this.read8bitsUnsigned(address + i);
        }
        return result;
    }

    writeString(address, value) {
        ///*
        // Write the *value* string in the memory buffer starting at the *address* memory address.
        // The function writes a '0x00' character at the end of the string.
        ///*
        var i = 0;
        for (; i < value.length; i++){
            this.write8bitsUnsigned(address + i, value.charCodeAt(i));
        }
        this.write8bitsUnsigned(address + i, 0);
    }

    readBytes(address, length) {
        ///*
        // Returns an array of values representing the bytes at the *address* memory address.
        // The function reads exactly *length* bytes
        ///*
        var result = [];
        for (var i = 0; i < length; i++) {
            result.push(this.read8bitsUnsigned(address + i));
        }
        return result;
    }

    writeBytes(address, values) {
        ///*
        // Write the *values* bytes in the memory buffer starting at the *address* memory address.
        // The *values* argument must be an array of bytes (int < 255).
        ///*
        for (var i = 0; i < values.length; i++) {
            this.write8bitsUnsigned(address + i, values[i])
        }
    }

    search32bitsUnsigned(value) {
        ///*
        // Returns a list of memory addresses where the 32 bits unsigned value *value* is present in the memory buffer.
        ///*
        var addresses = [];
        for (var i = 0; i < this.memoryView.byteLength; i += 4) {
            if (this.read32bitsUnsigned(i) === value) {
                addresses.push(i);
            }
        }
        return addresses;
    }

    search32bitsSigned(value) {
        ///*
        // Returns a list of memory addresses where the 32 bits signed value *value* is present in the memory buffer.
        ///*
        var addresses = [];
        for (var i = 0; i < this.memoryView.byteLength; i += 4) {
            if (this.read32bitsSigned(i) === value) {
                addresses.push(i);
            }
        }
        return addresses;
    }

    search16bitsUnsigned(value) {
        ///*
        // Returns a list of memory addresses where the 16 bits unsigned value *value* is present in the memory buffer.
        ///*
        var addresses = [];
        for (var i = 0; i < this.memoryView.byteLength; i += 2) {
            if (this.read16bitsUnsigned(i) === value) {
                addresses.push(i);
            }
        }
        return addresses;
    }

    search16bitsSigned(value) {
        ///*
        // Returns a list of memory addresses where the 16 bits signed value *value* is present in the memory buffer.
        ///*
        var addresses = [];
        for (var i = 0; i < this.memoryView.byteLength; i += 2) {
            if (this.read16bitsSigned(i) === value) {
                addresses.push(i);
            }
        }
        return addresses;
    }

    search8bitsUnsigned(value) {
        ///*
        // Returns a list of memory addresses where the 8 bits unsigned value *value* is present in the memory buffer.
        ///*
        var addresses = [];
        for (var i = 0; i < this.memoryView.byteLength; i += 1) {
            if (this.read8bitsUnsigned(i) === value) {
                addresses.push(i);
            }
        }
        return addresses;
    }

    search8bitsSigned(value) {
        ///*
        // Returns a list of memory addresses where the 8 bits signed value *value* is present in the memory buffer.
        ///*
        var addresses = [];
        for (var i = 0; i < this.memoryView.byteLength; i += 1) {
            if (this.read8bitsSigned(i) === value) {
                addresses.push(i);
            }
        }
        return addresses;
    }

    searchString(value) {
        ///*
        // Returns a list of memory addresses where the string *value* is present in the memory buffer.
        // The returned values point to the start of the strings.
        // The function considers a string is finished at the first '0x00' character encountered.
        ///*
        var potAddresses = this.search8bitsUnsigned(value.charCodeAt(0));
        var addresses = [];
        for (var address of potAddresses) {
            if (this.readString(address) === value) {
                addresses.push(address);
            }
        }
        return addresses;
    }

    searchStringRegex(value) {
        ///*
        // Returns a list of memory addresses where the regex *value* matches in the memory buffer.
        // The returned values point to the start of the strings.
        // The function considers a string is finished at the first '0x00' character encountered.
        //
        // Not as slow as I thought it would be...
        ///*
        try {
            value = new RegExp(value, 'g');
        } catch(e) {
            console.log("Invalid regular expression")
            return []
        }
        var addresses = [];
        var currentAddress = 0;

        while (currentAddress < this.memoryView.byteLength) {
            if (this.read8bitsUnsigned(currentAddress) === 0) {
                currentAddress += 1;
            } else {
                var tmpString = this.readString(currentAddress);
                let found;
                while ((found = value.exec(tmpString)) !== null) {
                    addresses.push(currentAddress + found.index)
                }
                currentAddress += tmpString.length;
            }
        }

        return addresses;
    }
}

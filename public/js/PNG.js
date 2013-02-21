// PNG Module
// File: PNG.js
// Author: Chris Lemler
//
// This module encapsulates convenience functions for developing NextGen
// applications. Requires that jQuery is loaded prior to loading this module.
//
// Access the global PNG namespace object or create it if it does not exist
if (undefined === PNG || typeof(PNG) !== "object") {
    console.log("Creating PNG = {}");
    var PNG = {};
}
// Create the PNG module. Make use of the new
// EcmaScript 'strict mode'
PNG = (function($) {
    "use strict";
    console.log("Constructing PNG");
    //=======================================
    // Private Module Variables Here
    //=======================================
    //=======================================
    // Private Module Functions Here
    //=======================================
    // Returns a referenece to the Global javascript object.
    // This function gets the global object using a technique
    // that is compatible in a browser and also in server
    // side javascript (e.g. node.js)
    //
    // This function relies on the fact that the 'this' object always
    // points to the global object when not under "use strict". Functions
    // created using "Function()" do not inherit "use strict" so fall back
    // to E3 behavior where an unscoped 'this' would point to the global
    // object.
    //
    // Usage: var myglobal = PNG.getGlobal();
    //    

    function getGlobal() {
        return Function('return this')();
    }
    // Generates a nested set of objects within the PNG namespace. If the
    // intervening objects do not exist, empty objects will be created
    // to complete the requested object tree. The innermost (last) object will
    // be returned.
    // 
    // Example: PNG.add("myapp", "1.0.0", fn);
    //          PNG.myapp.myviews = 
    //
    // Usage: var model = PNG.namespace("MySpace.model");
    // This will create the object 'MySpace' as a property of the
    // global object, and create 'model' as a child object of MySpace.
    // Returns a reference to the last named entity (e.g. model)
    //

    function namespace(namespaceString) {
        var parent = PNG.getGlobal(),
            parts = namespaceString.split('.'),
            currentPart = '',
            length, i;
        for (i = 0, length = parts.length; i < length; i++) {
            currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart];
        }
        return parent;
    }
    // Registers a submodule under the PNG global.
    //
    // name -   module name
    // fn -     the function that encapsulates the private and public
    //          functions and methods
    //
    // Returns the submodule PNG.name. An exception will be thrown if the
    // module name was previously defined.
    //
    // Usage:
    //  PNG.add("shape", function() {
    //      "use strict";
    //      var myPrivateVar;
    //
    //      function draw() {
    //          console.log('Entered PNG.shape.draw()');
    //          return "I just drew something";
    //      }
    //
    //      return {
    //          draw: draw
    //      };
    //  });
    //
    //  PNG.shape.draw();
    //

    function add(name, version, fn) {
        // Make certain this module was not previously defined
        if (undefined !== PNG[name]) {
            throw 'ERROR[PNG.add()] - module previously defined! PNG.' + name;
        }
        // Execute the provided module function which returns an object
        // that contains the public methods
        PNG[name] = fn();
        PNG[name].VERSION = version;
        return PNG[name];
    }
    //=======================================
    // Public Module Variables and Functions
    //=======================================
    return {
        getGlobal: getGlobal,
        namespace: namespace,
        add: add
    };
}(jQuery));
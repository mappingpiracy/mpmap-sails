module.exports = {
	/**
	 * Takes an object of objects and a property of
	 * these objects, returns the equivalent object
	 * of objects,  but keyed on this new property.
	 */
	pivotObject: function(object, newKey) {
		var keys = Object.keys(object);

	},
	arrayToObject: function(array, key) {
		var object = {};
		array.map(function(d) {
			object[d[key]] = d;
		})
		return object;
	},
	findInArray: function(array, findValue, findProperty, returnProperty, returnNotFound) {
	    for (var i = 0; i < array.length; i++) {
	        if (array[i][findProperty] === findValue) return array[i][returnProperty];
	    }
	    return returnNotFound;
	}
}
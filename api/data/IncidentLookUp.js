/**
 * LookUp contains the encoding translations for:
 * incidentType
 * incidentAction
 * vesselType
 * vesselStatus
 *
 * In other words, these are numerical columns in the database
 * which should be translated to a string in the API. These JSON
 * lookup "tables" serve to alleviate the query from performing
 * expensive joins in the database.
 */
function LookUp() {

    this.incidentType = {
        "0": "Attempted",
        "1": "Actual",
        "-99": "Unknown"
    };

    this.incidentAction = {
        "1": "Hijacked",
        "2": "Boarded",
        "3": "Fired Upon",
        "4": "Attempted",
        "5": "Missing",
        "6": "Detaining",
        "10": "TBD",
        "-99": "Unknown"
    };

    this.vesselType = {
        "1": "Barge or Tug",
        "2": "Carrier",
        "3": "Chemical Tanker",
        "4": "Container Ship",
        "5": "Fishing Boat, Trawler, or Vessel",
        "6": "General Cargo",
        "7": "LNG, LPG, or Oil Tanker",
        "8": "Tanker or Produce Tanker",
        "9": "Yacht, Leisure Craft, or Passenger Ship",
        "10": "TBD",
        "-99": "Unknown"
    }

    this.vesselStatus = {
    	"1": "Steaming",
    	"2": "Anchored",
    	"3": "Berthed",
    	"4": "Stationary",
    	"-99": "Unknown"
    }
    
}

module.exports = LookUp;

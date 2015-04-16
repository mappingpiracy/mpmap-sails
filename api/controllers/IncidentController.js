/**
 * IncidentController
 *
 * @description :: Server-side logic for managing Incidents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `IncidentController.index()`
     */
    index: function(req, res) {
        var params = req.params.all();

        Incident.find().exec(function(err, users) {
            return res.json(users);
        });
    }
};

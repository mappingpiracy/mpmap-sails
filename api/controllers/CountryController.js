/**
 * CountryController
 *
 * @description :: Server-side logic for managing Countries
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `CountryController.index()`
     */
    index: function(req, res) {
        var params = req.params.all();

        Country.find({
            sort: 'id'
        }).exec(function(err, users) {
            return res.json(users);
        });
    }

};

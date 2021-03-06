var fs = require("fs");
var mongoose = require('mongoose');
var _ = require('lodash');


//Loads the form structure from the json and from the model
exports.getForm = function(identifier){
    var form;
    if (identifier != undefined) //Check if the admin has specified a form to use
        form = require('../models/forms/'+identifier.replace(' ','-')+'.json');
    else //If not use the default form
        form = require('../models/forms/form-default.json');

    //Load all the elementary fields
    var schema = mongoose.model('Application').schema['formProperties'];
    //Load all the fields from the json file
    var newFields = [];
    _.forEach(schema,function(f,i){
        var newField = {
            "name": i,
            "label": f['label'],
            "type": f['formType'],
            "values": (f['values'])?f['values']:"",
            "alt": "",
            "weight": 75,
            "student":f['student'],
            "mentor": f['mentor'],
            "required": true,
            "analyze":f['analyze'],
            "analyzeRef" : f['analyzeRef'],
            "showChart" : f['showChart']
        };
        newFields.push(newField);
    });
    form = newFields.concat(form);
    return form;
}

// Helper function to get all names from the forms folder
exports.getAllFormNames = function(){
    var forms = fs.readdirSync('./models/forms/');
    var formNames = {};
    for (var i in forms){
        if (forms[i]!= "form-default.json")
            formNames[i] = forms[i].split('.')[0].replace('-',' ');
    }
    return formNames;
}

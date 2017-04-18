import * as mongoose from 'mongoose';
import CONFIG from '../config';
import ListModel from '../models/ListModel';
const checklists  = require('./checklists.json');


mongoose.Promise = Promise;
mongoose.connect(CONFIG.mongodb.uri, function(err) {
    if (!err) {
        console.log('Connected to database')

        Promise.all(checklists.map(checklist => findOrCreate(checklist)))
            .then((lists) => {
              console.log(lists.filter(e => !!e).length + " lists created");
              process.exit(1);
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        console.error('Seed error:', err.stack);
        process.exit(1);
    }
});


function findOrCreate(checklist) {
    return new Promise((resolve, reject) => {
        let query;
        if (checklist.countryCode)
            query = { type: checklist.type, countryCode: checklist.countryCode };
        else
            query = { type: checklist.type };

        ListModel.findOne(query).exec((err, list) => {
            if (err)
                reject(err);
            else if (!list) {
                //create
                ListModel.create(checklist, (err, list) => {
                    if (err)
                        reject(err);
                    else
                        resolve(list)
                })
            } else {
                //exist
                console.log("Checlist " + checklist.type + " (" + (checklist.countryCode || "all")  + ") exist");
                resolve()
            }
        })
    })
}

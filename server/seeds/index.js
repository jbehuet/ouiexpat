import * as mongoose from 'mongoose';
import CONFIG from '../config';
import ListModel from '../models/ListModel';
const checklists = require('./checklists.json');

import BlogModel from '../models/BlogModel';
const blogs = require('./blogs.json');


mongoose.Promise = Promise;
mongoose.connect(CONFIG.mongodb.uri, function(err) {
    if (!err) {
        console.log('Connected to database')
        const chkP = seedCheckLists();
        const blogP = seedBlogs();

        Promise.all([chkP, blogP])
            .then((lists) => {
                console.log("SEED OVER");
                process.exit(0);
            })
            .catch((err) => {
                console.log(err);
            })

    } else {
        console.error('Seed error:', err.stack);
        process.exit(1);
    }
});


function seedCheckLists() {

    return new Promise((resolve, reject) => {
        Promise.all(checklists.map(checklist => findOrCreateList(checklist)))
            .then((lists) => {
                console.log(lists.filter(e => !!e).length + " lists created");
                resolve();
            })
            .catch((err) => {
                console.log(err);
                resolve();
            })
    })


}

function seedBlogs() {

    return new Promise((resolve, reject) => {
        Promise.all(blogs.map(blog => findOrCreateBlog(blog)))
            .then((blogs) => {
                console.log(blogs.filter(e => !!e).length + " blogs created");
                resolve();
            })
            .catch((err) => {
                console.log(err);
                resolve();
            })
    })


}


function findOrCreateList(checklist) {
    return new Promise((resolve, reject) => {
        let query;
        if (checklist.countryCode)
            query = {
                type: checklist.type,
                countryCode: checklist.countryCode
            };
        else
            query = {
                type: checklist.type
            };

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
                console.log("Checlist " + checklist.type + " (" + (checklist.countryCode || "all") + ") exist");
                resolve()
            }
        })
    })
}

function findOrCreateBlog(blog) {
    return new Promise((resolve, reject) => {
        let query = {
            name: blog.name
        };

        BlogModel.findOne(query).exec((err, list) => {
            if (err)
                reject(err);
            else if (!list) {
                //create
                BlogModel.create(blog, (err, list) => {
                    if (err)
                        reject(err);
                    else
                        resolve(list)
                })
            } else {
                //exist
                console.log("Blog " + blog.name + " exist");
                resolve()
            }
        })
    })
}

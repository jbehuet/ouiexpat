'use strict';
import * as mongoose from 'mongoose';
import CONFIG from '../config';

import ListModel from '../models/ListModel';
const checklists = require('./checklists.json');

import BlogModel from '../models/BlogModel';
const blogs = require('./blogs.json');


export default class Seeds {

    constructor() {

    }

    start():Promise<any> {

        const chkP = this.seedCheckLists();
        const blogP = this.seedBlogs();

        return Promise.all([chkP, blogP]);

    }

    private seedCheckLists() {

        return new Promise((resolve, reject) => {
            Promise.all(checklists.map(checklist => this.findOrCreateList(checklist)))
                .then((lists) => {
                    console.log('>> ' + lists.filter(e => !!e).length + " lists created");
                    resolve();
                })
                .catch((err) => {
                    console.log(err);
                    resolve();
                })
        })


    }

    private seedBlogs() {

        return new Promise((resolve, reject) => {
            Promise.all(blogs.map(blog => this.findOrCreateBlog(blog)))
                .then((blogs) => {
                    console.log('>> ' + blogs.filter(e => !!e).length + " blogs created");
                    resolve();
                })
                .catch((err) => {
                    console.log(err);
                    resolve();
                })
        })


    }

    private findOrCreateList(checklist) {
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
                    console.log(">> Checlist : " + checklist.type + " (" + (checklist.countryCode || "all") + ") exist");
                    resolve()
                }
            })
        })
    }

    private findOrCreateBlog(blog) {
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
                    console.log(">> Blog : " + blog.name + " exist");
                    resolve()
                }
            })
        })
    }
}

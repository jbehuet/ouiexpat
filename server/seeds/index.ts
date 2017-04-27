'use strict';
import * as mongoose from 'mongoose';
import CONFIG from '../config';

import UserModel from '../models/UserModel';
const users = require('./users.json');

import ListModel from '../models/ListModel';
const checklists = require('./checklists.json');

import BlogModel from '../models/BlogModel';
const blogs = require('./blogs.json');


export default class Seeds {

    constructor() {

    }

    start(): Promise<any> {

        const userP = this.seedUsers();
        const chkP = this.seedCheckLists();
        const blogP = this.seedBlogs();

        return Promise.all([userP, chkP, blogP]);

    }

    private seedUsers() {

        return new Promise((resolve, reject) => {
            Promise.all(users.map(user => this.findOrCreateUser(user)))
                .then((users) => {
                    console.log('>> ' + users.filter(e => !!e).length + " users created");
                    resolve();
                })
                .catch((err) => {
                    console.log(err);
                    resolve();
                })
        })


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

    private findOrCreateUser(user) {
        return new Promise((resolve, reject) => {
            let query = {
                email: user.email
            };

            UserModel.findOne(query).exec((err, doc) => {
                if (err)
                    reject(err);
                else if (!doc) {
                    //create
                    UserModel.create(user, (err, doc) => {
                        if (err)
                            reject(err);
                        else
                            resolve(doc)
                    })
                } else {
                    //exist
                    console.log(">> User : " + user.email + " exist");
                    resolve()
                }
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

            ListModel.findOne(query).exec((err, doc) => {
                if (err)
                    reject(err);
                else if (!doc) {
                    //create
                    ListModel.create(checklist, (err, doc) => {
                        if (err)
                            reject(err);
                        else
                            resolve(doc)
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

            BlogModel.findOne(query).exec((err, doc) => {
                if (err)
                    reject(err);
                else if (!doc) {
                    //create
                    BlogModel.create(blog, (err, doc) => {
                        if (err)
                            reject(err);
                        else
                            resolve(doc)
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

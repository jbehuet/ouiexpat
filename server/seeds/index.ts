'use strict';
import * as mongoose from 'mongoose';
import CONFIG from '../config';

import UserModel from '../models/UserModel';
const users = require('./users.json');

import ListModel from '../models/ListModel';
const checklists = require('./checklists.json');

import BlogModel from '../models/BlogModel';
const blogs = require('./blogs.json');

import AssociationModel from '../models/AssociationModel';
const associations = require('./associations.json');


export default class Seeds {

    constructor() {

    }

    start(): Promise<any> {
        console.log('Seed : .. ');
        const chkP = this.seedCheckLists();
        const blogP = this.seedBlogs();
        const associationP = this.seedAssociations();


        return this.getUsersCount().then(count => {
            let promises = [chkP, blogP, associationP];
            if (count === 0) {
                const userP = this.seedUsers();
                promises.push(userP);
            } else {
              console.log('Users : ' + count + ' exist');
            }

            return Promise.all(promises);
        });

    }

    private seedUsers() {
        return new Promise((resolve, reject) => {
            Promise.all(users.map(user => this.findOrCreateUser(user)))
                .then((users) => {
                    console.log('>> Users : ' + users.filter(e => !!e).length + " created");
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
                    console.log('>> Checklists : ' + lists.filter(e => !!e).length + " created");
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
                    console.log('>> Blogs ' + blogs.filter(e => !!e).length + " created");
                    resolve();
                })
                .catch((err) => {
                    console.log(err);
                    resolve();
                })
        })
    }

    private seedAssociations() {
        return new Promise((resolve, reject) => {
            Promise.all(associations.map(association => this.findOrCreateAssociation(association)))
                .then((associations) => {
                    console.log('>> Associations ' + associations.filter(e => !!e).length + " created");
                    resolve();
                })
                .catch((err) => {
                    console.log(err);
                    resolve();
                })
        })
    }

    private getUsersCount() {
        return new Promise((resolve, reject) => {
            UserModel.find({ administrator: true }).exec((err, docs) => {
                if (err)
                    reject()
                else
                    resolve(docs.length)
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
                        else {
                            console.log(">> User : " + doc.email + " created");
                            resolve(doc)
                        }
                    })
                } else {
                    //exist
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
                        else {
                            console.log(">> Checklists : " + doc.type + " (" + (doc.countryCode || "all") + ") created");
                            resolve(doc)
                        }
                    })
                } else {
                    //exist
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
                        else {
                            console.log(">> Blogs : " + doc.name + " created");
                            resolve(doc)
                        }
                    })
                } else {
                    //exist
                    resolve()
                }
            })
        })
    }

    private findOrCreateAssociation(association) {
        return new Promise((resolve, reject) => {
            let query = {
                name: association.name
            };

            AssociationModel.findOne(query).exec((err, doc) => {
                if (err)
                    reject(err);
                else if (!doc) {
                    //create
                    AssociationModel.create(association, (err, doc) => {
                        if (err)
                            reject(err);
                        else {
                            console.log(">> Associations : " + doc.name + " created");
                            resolve(doc)
                        }
                    })
                } else {
                    //exist
                    resolve()
                }
            })
        })
    }

}

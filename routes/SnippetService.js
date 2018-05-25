const express = require('express');
const router = express.Router();
const BlobStorage = require('../client/blob');
const config = require('../config');
const path = require('fs');


router.get('/',getAllSnippets);
router.get('/:name',getSnippet);
router.post('/',insertSnippet);
router.delete('/',deleteSnippet);

const blob = new BlobStorage(config.storageAccount,config.storagekey);
const containername = 'azure-webjobs-hosts';

async function getSnippet(req, res){
    let blobtemp = await blob.downloadString('azure-webjobs-hosts',req.params.name);
    res.json(blobtemp);
}
async function getAllSnippets(req, res){
    let blobtemp = await blob.list('azure-webjobs-hosts');
    res.json(blobtemp);
}


async function insertSnippet(req, res){
    let blobtemp = await blob.createContainer('azure-webjobs-hosts');
    let created = await blob.uploadString('azure-webjobs-hosts',req.body.name,req.body.data);
    res.json(created);
}

async function deleteSnippet(req,res){
    var result = await blob.remove(containername,req.body.name);
    res.json(result);
}

module.exports = router;
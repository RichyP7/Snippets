const config = require('../config');
const moment = require('moment');
const path = require('path');
const storage = require('azure-storage');

function promisify(func) {
    return new Promise((resolve, reject) => {
        func(function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    })
}

class BlobStorage {
    constructor(storageAccount, storageKey) {
        console.log(storageAccount);
        console.log(storageKey);
        this.blobService = storage.createBlobService(storageAccount, 'nEibz3zls+3xzQQukBVf1MgWnC8ItUmtG2STdoGuMHi93K7LZFG7kxvkQSc2Sbt59CStBP6fduY3zuJdzQJqiw==');
    }

    createContainer(containerName) {
        return promisify(callback => {
            this.blobService.createContainerIfNotExists(containerName, {publicAccessLevel: 'blob'}, callback);
        });
    }

    list(containerName) {
        return promisify(callback => {
            this.blobService.listBlobsSegmented(containerName, null, callback);
        });
    }

    uploadFile(containerName, destBlobName, sourceFilePath) {
        return promisify(callback => {
            this.blobService.createBlockBlobFromLocalFile(containerName, destBlobName, sourceFilePath, callback);
        });
    }

    uploadString(containerName, destBlobName, sourceString) {
        return promisify(callback => {
            this.blobService.createBlockBlobFromText(containerName, destBlobName, sourceString, callback);
        });
    }

    downloadFile(containerName, sourceBlobName, destFilePath) {
        return promisify(callback => {
            this.blobService.getBlobToLocalFile(containerName, sourceBlobName, destFilePath, callback);
        });
    }

    downloadString(containerName, sourceBlobName) {
        return promisify(callback => {
            this.blobService.getBlobToText(containerName, sourceBlobName, callback);
        });
    }

    remove(containerName, blobName) {
        return promisify(callback => {
            this.blobService.deleteBlobIfExists(containerName, blobName, callback);
        });
    }

    createAppendBlob(containerName, blobName) {
        return promisify(callback => {
            this.blobService.createOrReplaceAppendBlob(containerName, blobName, callback);
        })
    }

    appendTextToBlob(containerName, blobName, textString) {
        return promisify(callback => {
            this.blobService.appendFromText(containerName, blobName, textString, callback);
        })
    }
}


function prettyPrint(listing) {
    for (let entry of listing) {
        console.log(entry.name + ' (' + entry.blobType + ': ' + entry.contentLength + ' bytes) - ' + entry.lastModified);
    }
}


const sourceFilePath = path.resolve('client/listEvents.js');
// const blobName = path.basename(sourceFilePath, path.extname(sourceFilePath));

async function run() {
    let blob = new BlobStorage(config.storageAccount,config.storageKey);
    //blob.uploadFile('blobbyvolley', 'neuer-blob1',sourceFilePath);
    blob.createAppendBlob('logfiles','kalender');
    blob.createAppendBlob('logfiles','users');
    blob.createAppendBlob('logfiles','events');
}

module.exports= BlobStorage;

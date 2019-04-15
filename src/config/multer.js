const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const destino = path.resolve(__dirname, '..', '..', 'tmp');

module.exports = {
    dest: destino,
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, destino);
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) {
                    callback(err);
                }else {
                    file.key = `${hash.toString('hex')}-${file.originalname}`;
                    callback(null, file.key);
                }
            });
        }
    })
};
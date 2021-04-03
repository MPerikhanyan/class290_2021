const fs = require('fs');
const ADMIN_ROLE = 'amin';
const CUSTOMER_ROLE ='customer';
const DEFAULT_ROLE= 'customer';

module.exports = {
    ADMIN_ROLE,
    CUSTOMER_ROLE,
    DEFAULT_ROLE,
    writeInFile(content) {
        return new Promise((resolve) => {
            fs.writeFile('content.txt', content, {encoding: 'utf-8'}, () => {
                resolve();
            });
        })
    },

    readFromFile() {
        return new Promise((resolve, reject) => {
            fs.readFile('content.txt', (err, data) => {
                if(err) {
                    return reject(err);
                }

                resolve(data);
            });
        });
    }
}
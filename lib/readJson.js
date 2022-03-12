const fs = require('fs')
const path = require('path')

module.exports =  {
    select : (filePath) => {
        let str = fs.readFileSync(path.join(process.cwd(),'database',filePath+'.json'),'utf-8')
        return JSON.parse(str)
    }
}
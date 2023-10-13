import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, __dirname + "/client/public/srs/assets")
    },

    filename: function( req, file, callback) {
        callback(null, file.originalname)
    }
    
})

const uploads = multer({storage:storage })

module.exports = uploads;
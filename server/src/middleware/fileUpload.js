import multer from "multer";
import {dirname, join as pathJoin} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const imgFolder = pathJoin(__dirname, "..", "..", "..", "client", "public", "img"  );

const storage = multer.diskStorage({
    destination: function(req, file, callback){
      
        callback(null, imgFolder )
    },

    filename: function( req, file, callback) {
        callback(null, file.originalname)

        
    }
})

const uploads = multer({storage: storage});

export default uploads; 
const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    writer : {
        type : mongoose.Schema.Types.ObjectId,
        // 유저 모델에 있는 모든 정보를 가져옴
        ref : "User"
    },
    title : {
        type:String,
        maxlength : 50
    },
    description: {
        type : String
    },
    privacy: {
        type : Number
    },
    filePath: {
        type : String
    },
    category : {
        type : String
    },
    views : {
        type : Number,
        default : 0
    },
    duration : {
        type :String
    },
    thumbnail : {
        type : String
    }
}, {timestamps : true})



const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }
const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");
const mongoose = require('mongoose');
const { auth } = require("../middleware/auth");
const multer = require("multer");
const path = require('path');
const { request } = require('express');
var ffmpeg = require('fluent-ffmpeg');
const { Console } = require('console');


//=================================
//             Video
//=================================

router.post('/subscribeNumber', (req, res) => {
    // 클라이언트에서 받아온 비디오를 서버에 저장
    Subscriber.find({'userTo' : req.body.userTo})
    .exec((err, subscribe)=> {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success:true, subscribeNumber : subscribe.length })
    })
})

router.post('/subscribed', (req, res) => {
    // 구독 중인지 데이터 확인
    Subscriber.find({'userTo' : req.body.userTo, 'userFrom' : req.body.userFrom})
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err);
        let result = false;
        if(subscribe.length != 0) {
            result = true;            
        }
        return res.status(200).json({success:true, subscribed : result});
    })
})

router.post('/unSubscribe', (req, res) => {
    // 구독 중인지 데이터 확인
    Subscriber.findOneAndDelete({userTo : req.body.userTo, userFrom : req.body.userFrom})
    .exec((err, doc)=> {
        if(err) return res.status(400).json({success :false, err})
        return res.status(200).json({success : true, doc})
    })
})

router.post('/subscribe', (req, res) => {
    
    const subscribe = new Subscriber(req.body);

    subscribe.save((err, doc) => {
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, doc})
    })
})

module.exports = router;

// var LinkMassageLayer = require('LinkMassageLayer');
// var LinkLayer = require('LinkLayer');
// var Clock = require('Clock');
// var PlayerList = require('PlayerList');
// var RadioLayer = require('RadioLayer');
// var LeftProps = require('LeftProps');
// var backCallback;
// cc.Class({
//     extends: cc.Component,
//
//     properties: {
//         linkMassageLayer : LinkMassageLayer,
//         linkLayer: LinkLayer,
//         clock : Clock,
//         playerList : PlayerList,
//         back : cc.Node,
//         radioLayer : RadioLayer,
//         leftProps : LeftProps
//     },
//
//     // use this for initialization
//     onLoad: function () {
//         this.listenBack();
//     },
//     getLinkMassageLayer : function(){
//         return this.linkMassageLayer;
//     },
//     getLinkLayer: function(){
//         return this.linkLayer;
//     },
//     getClock : function(){
//         return this.clock;
//     },
//     getPlayerList : function(){
//         return this.playerList;
//     },
//     getRadioLayer : function(){
//         return this.radioLayer;
//     },
//     getLeftProps : function(){
//         return this.leftProps;
//     },
//     listenBack : function() {
//         this.back.on('touchstart', function () {
//             if(backCallback){
//                 backCallback();
//             }
//             cc.director.loadScene("launch");
//         });
//     },
//     hideBackButton : function(){
//         this.back.active = false;
//     },
//     setBackCallback : function(callback){
//         backCallback = callback;
//     }
// });

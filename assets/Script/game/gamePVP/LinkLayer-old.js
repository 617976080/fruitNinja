// var playerName;
// var callback;
// var Global = require('Global');
// cc.Class({
//     extends: cc.Component,
//
//     properties: {
//         editBox : cc.EditBox,
//         freeMatch : cc.Node,
//         findMatch : cc.Node
//     },
//     onLoad : function() {
//         // 读取记录中的名称
//         var storeString = cc.sys.localStorage.getItem('playerName');
//         if(storeString){
//             this.editBox.string = storeString;
//         }
//
//         var storePlayerName = function(){
//             cc.sys.localStorage.setItem('playerName', this.editBox.string);
//         }.bind(this);
//
//         // 自由匹配
//         var freeCallback = function(){
//             storePlayerName();
//             callback.call(null, this.editBox.string, 'freeMatch');
//             this.freeMatch.off('touchstart',freeCallback );
//         }.bind(this);
//         this.freeMatch.on('touchstart',freeCallback );
//
//         // 寻找队友
//         var findCallback = function(){
//             storePlayerName();
//             callback.call(null, this.editBox.string, 'findMatch');
//             this.findMatch.off('touchstart', findCallback);
//         }.bind(this);
//         this.findMatch.on('touchstart', findCallback);
//     },
//     init : function(_callback){
//         callback = _callback;
//     },
//     clearEditBox : function(){
//         this.editBox.string = '';
//     }
// });
// cc.Class({
//     extends: cc.Component,
//
//     properties: {
//         label : cc.Label
//     },
//     setString : function(string, callback, delayTime){
//         var self = this;
//         delayTime = delayTime || 1000;
//         this.node.active = true;
//         this.label.string = string;
//         if(typeof callback == 'function'){
//             setTimeout(function(){
//                 callback();
//                 self.node.active = false;
//             }, delayTime);
//         }
//     }
// });
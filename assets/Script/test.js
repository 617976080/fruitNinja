// cc.Class({
//     extends: cc.Component,
//
//     properties: {
//         knife : cc.Node,
//         bar : cc.Node,
//         prefab : cc.Prefab
//     },
//
//     // use this for initialization
//     onLoad: function () {
//         this.addTouchListen();
//     },
//     addTouchListen : function(){
//         // 触摸移动事件
//         var limit = function(val, min, max){
//           if(val < min){
//               return min;
//           }
//             if(val > max){
//                 return max;
//             }
//             return val;
//         };
//         var startLocation;
//         var startTime = new Date().getTime();
//         this.node.on("touchstart", function(event){
//             var touch = event.touch;
//             startLocation = touch.getLocation();
//         }.bind(this));
//         this.node.on('touchmove', function(event){
//             //cc.log(event.getTouches());
//         });
//         this.node.on("touchend", function(event){
//             var minSpeed = 20;
//             var maxSpeed = 60;
//             var minAngle = 0.523;
//             var maxAngle = 2.617;
//             var touch = event.touch;
//             var location = touch.getLocation();
//             var distance = cc.pDistance(startLocation, location);
//             var angle = cc.pToAngle(cc.pSub(location,startLocation));
//             angle = limit(angle, minAngle, maxAngle);
//             var x = this.node.convertToNodeSpaceAR(startLocation).x;
//             var speed = (new Date().getTime() - startTime) / distance;
//             speed = limit(speed, minSpeed, maxSpeed);
//             this.node.addChild(createNode(this.prefab, x, angle, speed));
//             console.log('angle:', angle, ',location:', location, ',distance:', distance, ',x:', x, ', speed:', speed);
//         }.bind(this));
//     }
// });
//
// var winSize = cc.director.getWinSize();
// var createNode = function(prefab, PVPThrowX, angle, speed){
//     var node = cc.instantiate(prefab);
//     var g = 20;
//     var speedY = speed * Math.sin(angle);
//     var speedX = speed * Math.cos(angle);
//     var time = speedY / g;
//     var x = speedX * time * 45;
//     var h = speedY * time * 0.5 * 45;
//     console.log('x:', x,',h:', h, ',time:', time);
//     var jumpAction = cc.jumpBy(time, cc.p(x, 0), h, 1);
//     var callback = cc.callFunc(function(){
//         //currentFruit.node.removeFromParent();
//         //Global.putIntoPool("fruit", currentFruit.node);
//         //Global.publish("miss");
//         node.removeFromParent();
//     });
//     node.runAction(cc.sequence(jumpAction, callback));
//     return node;
//     //return cc.sequence(jumpAction, callback);
// };
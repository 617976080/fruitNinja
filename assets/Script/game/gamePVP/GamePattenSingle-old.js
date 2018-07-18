// /**
//  * Created by xushaojun on 17/3/16.
//  */
// var GamePattenAbstract = require('GamePattenAbstract');
// var Global = require("Global");
// var Fruit = require('Fruit');
// module.exports = function(game){
//     return GamePattenAbstract({
//         addTouchMoveListen : function(angle, touchPos){
//             // 遍历切割水果
//             game.forEachFruit(function(fruit){
//                 if(fruit.isSeparate){
//                     return;
//                 }
//                 if(game.isIncised(touchPos, fruit.getPosition())){
//                     cc.log(fruit);
//                     cc.log(fruit.getComponent(Fruit));
//                     cc.log(fruit.getComponent('Fruit'));
//                     fruit.getComponent(Fruit).separate(angle);
//                 }
//             });
//         },
//         listenGameOver : function(){
//             // 重置各项参数
//             Global.reset();
//             cc.director.loadScene("launch");
//         },
//         createFruits : function(){
//             game.schedule(function(){
//                 var node = Global.getFromPool("fruit",Global.getRandomFruitName(true));
//                 // 传入游戏组件的引用, 用于水果调用removeFruit方法移除自身
//                 node.getComponent("Fruit").game = game;
//                 // 将数据推入成员属性中
//                 // 添加节点
//                 game.addFruit(node, 0);
//             }, Global.getThrowInterval());
//         }
//     },game, 'single');
// };
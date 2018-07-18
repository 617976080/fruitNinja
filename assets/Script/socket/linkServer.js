var Global = require("Global");
var Link = function(game){
    var socket = io("http://112.74.22.46:3001",{timeout : 5000});
    var character;
    var userName;
    var enemyName;
    var launch;
    var gamePVP = game.getGamePVP();
    var matchType;
    var characterName = {knifeUser : '切割', throwUser : '投掷'};
    var isFirstLink = true;
    var linkMassage = gamePVP.getLinkMassageLayer();
    var linkLayer =  gamePVP.getLinkLayer();
    var clock = gamePVP.getClock();
    var radioLayer = gamePVP.getRadioLayer();
    var leftProps = gamePVP.getLeftProps();
    var playerList = gamePVP.getPlayerList();
    clock.node.active = false;
    playerList.node.active = false;
    leftProps.node.active = false;

    var prepare = {
        freeMatch : function(){
            socket.on('waitMatch', function(){
                linkMassage.setString('请等待系统匹配对手');
            });
        },
        findMatch : function(){
            // 获取玩家列表
            socket.on('findEnemy',function(list){
                playerList.node.active = true;
                console.log(list);
                playerList.updateList(list);
            });

            // 监听点击玩家, 选择对战身份
            playerList.listenTouchPlayer(function(enemyId){
                radioLayer.radio('请选择您的对战身份',[
                    {
                        string : '投掷',
                        callback : function(){
                            socket.emit('chooseEnemy', 'throwUser', enemyId);
                        }
                    },
                    {
                        string : '切割',
                        callback : function(){
                            socket.emit('chooseEnemy', 'knifeUser', enemyId);
                        }
                    }
                ]);
            });

            // 等待对方确认
            socket.on('waitConfirm', function(){
                radioLayer.radio('等待对方确认中,请等待', [
                    {
                        string : '退出',
                        callback : function(){
                            socket.emit('endWait');
                        }
                    }
                ]);
            });

            socket.on('refuseGame', function(){
                radioLayer.confirm('对方拒绝了您的对战请求');
            });

            // 确认对方邀请
            socket.on('confirmGame', function(enemyName, character, fn){
                radioLayer.radio(enemyName + '对方邀请您一起对战, 您是' + characterName[character] + '方, 是否同意对战',[
                    {
                        string : '同意',
                        callback : function(){
                            fn(true);
                        }
                    },
                    {
                        string : '拒绝',
                        callback : function(){
                            fn(false);
                        }
                    }
                ]);
            });

            socket.on('start', function(){
                playerList.node.active = false;
            });
        }
    };

    linkMassage.setString('正在与服务器建立连接');
    socket.on('connected', function(error){
        if(error){
            linkMassage.setString(error,function(){
                linkLayer.node.active = false;
                cc.director.loadScene('launch');
            });
            return;
        }
        linkMassage.setString('连接成功,请输入您的昵称');
        linkLayer.node.active = true;
        gamePVP.setBackCallback(function(){
            socket.emit('disconnect');
        });
    });

    linkLayer.init(function(name, _matchType){
        if(name == ''){
            linkMassage.setString('昵称不能为空');
        }
        userName = name;
        socket.emit('link', name, _matchType);
        matchType = _matchType;
        linkLayer.node.active = false;
        prepare[matchType]();
        socket.on('repeatPlayerName', function(){
            linkMassage.setString('您输入的昵称已存在', function(){
                cc.director.loadScene('launch');
            });
        });
    });

    socket.on('start', function(otherUserID, ch){
        gamePVP.hideBackButton();
        linkLayer.node.active = false;
        radioLayer.node.active = false;
        var isStart = false;
        var start = function(){
            character = ch;
            clock.run();
            clock.node.active = true;
            leftProps.node.active = true;
            leftProps.setCount(Global.fruitCount, Global.boomCount);
            launch(ch, gamePVP);
        };
        var time = 3;
        var schedule = setInterval(function(){
            if(time <= 0 && !isStart){
                isStart = true;
                cc.log('start');
                linkMassage.setString('开始');
                clearInterval(schedule);
                linkMassage.node.active = false;
                start();
                return;
            }
            enemyName = otherUserID;
            linkMassage.setString('您的对手是:' + otherUserID + ',游戏开始倒计时:' + time);
            time--;
        }, 1000);
    });
    socket.on('enemyOut', function(){
        linkMassage.setString('您的对手' + enemyName + "退出游戏", function(){
            cc.director.loadScene('launch');
        });
        socket.close();
    });
    socket.on('updateScore', function(score){
        Global.setScore(score);
    });
    var gameOver = {
        throwUser : function(score){
            return '你的对手获得' + score +'分' ;
        },
        knifeUser : function(score){
            return '你获得' + score +'分' ;
        }
    };
    // 监听等待结果
    Global.addListen('waitResult', function(){
        linkMassage.setString('正在等待结果...');
    });
    socket.on('over', function(score){
        console.log(character);
        console.log(score);
        radioLayer.confirm(gameOver[character](score),'确认', function(){
            cc.director.loadScene('launch');
        });
    });
    return {
        init : function(Launch){
            launch = Launch;
        },
        socket : socket
    };
};
module.exports = Link;
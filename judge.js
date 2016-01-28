var J = {};
(function(global) {
  "use strict";
  
    var Judge = function(env, envTeAgent, envSpAgent1, envSpAgent2, envSpAgent3) {
        this.env = env; // store pointer to environment
        this.envTeAgent = envTeAgent; // store pointer to environment
        this.envSpAgent1 = envSpAgent1; // store pointer to environment
        this.envSpAgent2 = envSpAgent2; // store pointer to environment
        this.envSpAgent3 = envSpAgent3; // store pointer to environment
        this.TAB_MAX = 50;
        this.reset();
    };
    Judge.prototype = {
        reset: function() {
            //Temporal agent history
            this.freqHumanAgent = [];
            this.freqAction = [];

            //Spatial env history
            this.white = [];
            this.red = [];
            this.blue = [];
            this.a1 = [];
            this.a2 = [];
            this.a3 = [];
            
            this.tabOccur = [];
        },
        getRewardTemporal:function(){
            var reward = 0;
            var state = this.envTeAgent.getState();
            var freqAction = state[0];
            var freqHumanAgent = state[1];
            this.freqAction.push(freqAction);
            this.freqHumanAgent.push(freqHumanAgent);
            
            reward = freqHumanAgent;
            return reward; 
        },
        getRewardSpatial:function(a1,a2,a3){
            this.pushValue(a1,a2,a3);
            var entWhite = this.computeEntropy(this.white, 729);
            var entRed = this.computeEntropy(this.red, 729);
            var entBlue = this.computeEntropy(this.blue, 729);
            var entA1 = this.computeEntropy(this.a1, 8);
            var entA2 = this.computeEntropy(this.a2, 8);
            var entA3 = this.computeEntropy(this.a3, 8);
            
            //Global entropy TODO
            
            var reward;
            return reward; 
        },
        createHistogram:function(tab){
            var a = [], b = [], prev;
            tab.sort();
            for ( var i = 0; i < tab.length; i++ ) {
                if ( tab[i] !== prev ) {
                    a.push(tab[i]);
                    b.push(1);
                } else {
                    b[b.length-1]++;
                }
                prev = tab[i];
            }
            return b;
        },
        computeEntropy:function(tab, n){
            var entropy = 0;
            var value = 0;
            var cpt = 0;
            for(var i = 0;i <= n;i++){
                cpt = 0;
                for(var j = 0;j < tab.length;j++){
                    if(tab[j] === i){
                        cpt = cpt + 1;
                    }
                }
                if(cpt !== 0){
                    value = cpt / tab.length;
                    entropy = entropy -  value*(Math.log(value)/Math.log(2));
                }
           }
           return entropy;
        },
        pushValue:function(a1,a2,a3){
            if (this.white.length === this.TAB_MAX) {
                this.white = this.white.slice(1);
                this.red = this.red.slice(1);
                this.blue = this.blue.slice(1);
                this.a1 = this.a1.slice(1);
                this.a2 = this.a2.slice(1);
                this.a3 = this.a3.slice(1);
            }
            this.white.push(this.env.white);
            this.red.push(this.env.red);
            this.blue.push(this.env.blue);
            this.a1.push(a1);
            this.a2.push(a2);
            this.a3.push(a3);
        }
    };
    global.Judge = Judge;
})(J);



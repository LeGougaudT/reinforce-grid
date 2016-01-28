var J = {};
(function(global) {
  "use strict";
  
    var Judge = function(env, envTeAgent, envSpAgent1, envSpAgent2, envSpAgent3) {
        this.env = env; // store pointer to environment
        this.envTeAgent = envTeAgent; // store pointer to environment
        this.envSpAgent1 = envSpAgent1; // store pointer to environment
        this.envSpAgent2 = envSpAgent2; // store pointer to environment
        this.envSpAgent3 = envSpAgent3; // store pointer to environment
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
            var entWhite = this.process(this.white);
            var entRed = this.process(this.red);
            var entBlue = this.process(this.blue);
            var entA1 = this.process(this.a1);
            var entA2 = this.process(this.a2);
            var entA3 = this.process(this.a3);
            
            //Global entropy TODO
            
            var reward;
            return reward; 
        },
        process:function(tab){
          this.tabOccur = this.createHistogram(tab);
          return this.computeEntropy(this.tabOccur);    
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
        computeEntropy:function(tab){
            var somme = 0;
            var value = 0;
            for(var i = 0;i < tab.length;i++){ //Histogramme des niveaux de gris entre 0 et 256 donc
               value = tab[i] / tab.length;
               somme = somme -  value*(Math.log(value)/Math.log(2));
           }
           return somme;
        },
        pushValue:function(a1,a2,a3){
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



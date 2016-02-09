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
        this.xCell0 = null;
        this.yCell0 = null;
        this.d0 = 0;
        this.reset();
    };
    Judge.prototype = {
        reset: function() {
            //Temporal agent history
            this.freqHumanAgent = [];
            this.freqAction = [];

            //Spatial env history
            this.histWhite = [];
            this.initTab(this.histWhite, 4);
            this.histRed = [];
            this.initTab(this.histRed, 4);
            this.histBlue = [];
            this.initTab(this.histBlue, 4);
            this.a1 = [];
            this.a2 = [];
            this.a3 = [];
            
            this.tabOccur = [];
        },
        initTab:function(tab, nb){
            for(var i = 0; i < nb; i++){
                tab[i] = 0;
            }
        },
        getRewardTemporal:function(){
            var reward = 0;
            var state = this.envTeAgent.getState();
            var freqAction = state[0];
            var freqHumanAgent = state[1];
            this.freqAction.push(freqAction);
            this.freqHumanAgent.push(freqHumanAgent);
            //reward - pour freqAction
            if(this.freqAction[this.freqAction.length-2]>=this.freqAction[this.freqAction.length-1]){
                reward = 0;
            }else{
               reward = 0;
            }
            return reward;
        },
        getRewardSpatial:function(a1,a2,a3,cell){
            var cellHuman = this.env.cClick;
            var xCellH1 = this.env.stox(cellHuman);
            var yCellH1 = this.env.stoy(cellHuman);

            var entWhite = this.computeEntropy(this.white);
            var entRed = this.computeEntropy(this.red);
            var entBlue = this.computeEntropy(this.blue);
            var xCell1 = this.env.stox(cell);
            var yCell1 = this.env.stoy(cell);
            
            // Compute distance
            var d1 = Math.sqrt(Math.pow(xCellH1 - xCell1,2) + Math.pow(yCellH1 - yCell1,2));
            var rewardDistance = -d1;
            
            if(xCell1 === this.xCell0 && yCell1 === this.yCell0){
                rewardDistance-=0.5;
            }
            this.xCell0 = xCell1;
            this.yCell0 = yCell1;        
            this.d0 = d1;
            
            // Color
            this.updateHistogramColor();
            
            var reward = rewardDistance;
            
            //Global entropy TODO
            var entA1 = this.computeEntropy(this.a1, 8);
            var entA2 = this.computeEntropy(this.a2, 8);
            var entA3 = this.computeEntropy(this.a3, 8);
            
            
            return reward; 
        },
        updateHistogramColor:function(){
            var max = 729;
            var nbInterval = 4;
            var borne = Math.floor(max/nbInterval)+1;
            
            for(var i = 0; i < nbInterval; i++){
                if(this.env.white >= i*borne && this.env.white < (i+1)*borne){
                    this.histWhite[i] = this.histWhite[i]+1;
                }
                if(this.env.red >= i*borne && this.env.red < (i+1)*borne){
                    this.histRed[i] = this.histRed[i]+1;
                }
                if(this.env.blue >= i*borne && this.env.blue < (i+1)*borne){
                    this.histBlue[i] = this.histBlue[i]+1;
                }
            }  
        },
        updateFrequenceColor:function(){
            var max = 729;
            var nbInterval = 4;
            var borne = Math.floor(max/nbInterval)+1;
            
            for(var i = 0; i < nbInterval; i++){
                if(this.env.white >= i*borne && this.env.white < (i+1)*borne){
                    this.histWhite[i] = this.histWhite[i]+1;
                }
                if(this.env.red >= i*borne && this.env.red < (i+1)*borne){
                    this.histRed[i] = this.histRed[i]+1;
                }
                if(this.env.blue >= i*borne && this.env.blue < (i+1)*borne){
                    this.histBlue[i] = this.histBlue[i]+1;
                }
            }  
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
        }
    };
    global.Judge = Judge;
})(J);



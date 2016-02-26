var J = {};
(function(global) {
  "use strict";
    
    // init of a judge
    // save environement, compute rewards and heck the stability of the system
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
        
        //Entropy
        this.entHistColor;
        this.freqActionHistory = [];
        this.freqJ1J2History= [];
        
        //Goal
        this.colorG = 0;
        
        this.valuesAction = new Object();
        this.valuesAction.min = 0;
        this.valuesAction.max = 1;
        this.valuesAction.cpt = 0;
        this.valuesAction.target = Math.random();
        
        this.valuesJ1J2 = new Object();        
        this.valuesJ1J2.min = 0;
        this.valuesJ1J2.max = 1;
        this.valuesJ1J2.cpt = 0;
        this.valuesJ1J2.target =  Math.random();
        
        this.spatialValues = new Object();        
        this.spatialValues.min = 0;
        this.spatialValues.max = 1;
        this.spatialValues.cpt = 0;
        this.spatialValues.target =  Math.random();
        
        //Final reward
        this.rewardT = 0;
        this.rewardS = 0;
        
        this.reset();
    };
    Judge.prototype = {
        // init judge
        reset: function() {
            //Spatial env history
            this.a1 = [];
            this.a2 = [];
            this.a3 = [];
        },
        getReward:function(){
            return this.rewardT + this.rewardS;
        },
        getRewardSpatial:function(){
            return this.rewardS;
        },
        setRewardSpatial:function(reward){
            return this.rewardS = reward;
        },
        computeRewardTemporal:function(){
            this.rewardT = 0;
            var state = this.envTeAgent.getState();
            
            // save entropy values in history
            if(this.freqActionHistory.length >= 1000){
                this.freqActionHistory = this.freqActionHistory.slice(1);
                this.freqJ1J2History = this.freqJ1J2History.slice(1);
            }
            
            // decision of play / total decision
            this.freqActionHistory.push(state[0]);
            this.freqJ1J2History.push(state[1]);
            
            // check the stability on the entropy history
            this.checkStability(this.freqActionHistory,this.valuesAction);
            this.checkStability(this.freqJ1J2History,this.valuesJ1J2);
            
            this.rewardT = -Math.abs(state[0] - this.valuesAction.target);
            this.rewardT += -Math.abs(state[1] - this.valuesJ1J2.target);
        },
        computeRewardSpatial:function(){
            
            // Color
            var histColor = this.updateHistogramColor();
                        
            // Global entropy TODO
            var spatialEntropy = this.computeEntropy(histColor);
            this.rewardS = -Math.abs(spatialEntropy - this.spatialValues.target);
        },
        updateHistogramColor:function(){
            var tab = [];
            tab[0] = this.env.white / 729;
            tab[1] = this.env.red / 729;
            tab[2] = this.env.blue / 729;
            return tab;
        },
        computeEntropy:function(tab){
            var entropy = 0;
            for(var i = 0;i < tab.length;i++){
                if(tab[i] !== 0){
                    entropy = entropy -  tab[i]*(Math.log(tab[i]));
                }
            }
            return entropy;
        },
        // check if reward is stable
        checkStability:function(history,obj){
            obj.cpt = obj.cpt + 1;
            if(history.length >= 1000){
                var sum = 0;
                for(var i = 0;i < history.length;i++){
                    sum += history[i];
                }
                var mean = sum/(history.length);
                
                // compute standard deviation
                var distanceRelative = 0;
                for(var i = 0;i < history.length;i++){
                    distanceRelative += Math.pow((history[i]-mean), 2);
                }
                
                distanceRelative = distanceRelative/history.length;
                
                distanceRelative = Math.sqrt(distanceRelative);
                
                // compute the mean last 10 reward
                var sumLast = 0;
                for(var i = 1; i <=10; i++){
                    sumLast += history[history.length-i];
                }
                var meanLast = sumLast/10;
                
                if(((distanceRelative < 0.02) && (Math.abs(meanLast-obj.target)) < 0.1) || (obj.cpt > 4000)){
                    obj.target = Math.random();
                    obj.cpt = 0;
                }
            }    
        }
        
    };
    global.Judge = Judge;
})(J);
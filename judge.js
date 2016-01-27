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
      
  },
  getRewardTemporal:function(){
      var reward = 0;
      var state = this.envTeAgent.getState();
      var freqAction = state[0];
      var freqHumanAgent = state[1];
      reward = freqHumanAgent;
      return reward; 
  },
  getRewardSpatial:function(){
      var reward;
      if(a1 === 0){
          reward = 5;
      }
      else if(a2 === 3){
          reward = 4;
      }
      else{
          reward = -0.5;
      }
      return reward; 
  }
};
global.Judge = Judge;
})(J);



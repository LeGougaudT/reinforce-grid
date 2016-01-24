var J = {};
(function(global) {
  "use strict";
  
  var Judge = function(env) {
  this.env = env; // store pointer to environment
  this.reset();
};
Judge.prototype = {
  reset: function() {
      
  },
  getReward:function(a1, a2, a3){
      var reward;
      if(a1 === 0){
          reward = 5;
      }
      else{
          reward = -0.5;
      }
      return reward; 
  }
};
global.Judge = Judge;
})(J);



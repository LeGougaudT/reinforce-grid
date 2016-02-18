// Temporal agent that allows plays or no
var TemporalAgent = function() {
    this.cptAgent = 1;// to avoid NaN value (div by 0)
    actionTab = [];
    sizeEnt = 300;
    this.reset();
};
TemporalAgent.prototype = {
    reset: function(){
        this.freqAction = 0;
        this.freqJ1J2 = 0;
    },
    getNumStates: function() {
        return 2; // Different value of game timer
    },
    getMaxNumActions: function() {
        return 2; // True/False
    },
    getState: function() {
        var s = [this.freqAction, this.freqJ1J2];
        return s;
    },
    sampleNextState: function(a) {
        if(this.cptAgent > 2*Math.pow(10,9)){
            this.cptAgent = Math.round(this.cptAgent / 2);
            cptHuman = Math.round(cptHuman / 2);
        }
        if(actionTab.length >= sizeEnt){
            actionTab = actionTab.slice(1);
        }
        if(a){
            this.cptAgent = this.cptAgent + 1;
            actionTab.push(1);
        }
        else{
            actionTab.push(0);
        }
        this.freqAction = actionTab.reduce((prev,current) => prev + current) / actionTab.length;
    }
};

// Spatial agent that play on cell
var SpatialAgent = function() {
    this.reset();
};
SpatialAgent.prototype = {
    reset: function() {
        // Init of states
        this.white = 0;            
        this.red = 0;
        this.blue = 0;
        this.area = 0;
    },
    getNumStates: function() {
        return 4; // Different color of cell in view
    },
    getMaxNumActions: function() {
        return 9; // cell number
    },
    getState: function() {
        var s = [this.white, this.red, this.blue, this.area];
        return s;
    }
};
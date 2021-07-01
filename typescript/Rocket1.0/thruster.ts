class Thruster{
    
    public thrusterId:string;
    public thrustMaxPower:number;
    public currentThrust:number;

    
    constructor(thrusterId:string, thrustMaxPower:number, currentThrust:number){
        this.thrusterId = thrusterId;
        this.thrustMaxPower = thrustMaxPower;
        this.currentThrust = currentThrust;

    }

}
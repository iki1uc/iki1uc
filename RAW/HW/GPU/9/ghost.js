DirectV.routeRUN3 = function(run3){
    this.run3 = run3;

    // Speed = Orbit-Speed + Operator-Bewegung
    this.state.speed = 
        run3.orbital.speed +
        run3.operator.bewegung;

    // Stabilität = Operator-Stabilität + Orbit-Evo
    this.state.stabil = 
        run3.operator.stabilitaet +
        run3.orbital.evo;

    // Quantisierung = Raster
    this.state.quant = run3.operator.raster;

    // Boost aktivieren wenn Speed + Stabil > Schwellwert
    this.state.boost = (this.state.speed + this.state.stabil) > 10;

    return this.state;
};
DirectV.route = function(data){

    // 1. USB Cache
    if(this.usb){
        this.usb.write(data);
    }

    // 2. TMP/HDF
    if(this.hdf){
        this.hdf.store(this.run3.fusion);
    }

    // 3. SSD Boost
    if(this.state.boost && this.ssd){
        this.ssd.accel(data);
    }

    return {
        routed: true,
        speed: this.state.speed,
        stabil: this.state.stabil,
        boost: this.state.boost,
        quant: this.state.quant
    };
};
const movement = RUN3_Movement(axes.bewegung, ghost.orbit, ghost.operatoren);

DirectV.routeRUN3(movement);

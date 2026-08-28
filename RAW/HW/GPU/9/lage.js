// RAW/HW/GPU/directV.js

import { GPU_MATRIX_692_TENSOR } from "./9/gpu.matrix692.tensor.js";
import { tmp } from "../tmp.js";

export const DirectV = {

    usb: null,      // Primärer Cache
    hdf: null,      // Hauptspeicher (TMP/HDF)
    ssd: null,      // Beschleuniger
    tensor: GPU_MATRIX_692_TENSOR,  // GPU 692 Tensor

    state: {
        mode: "usb-first",
        speed: 0,
        boost: false
    },

    attachUSB(device){
        this.usb = device;
        this.state.mode = "usb-first";
    },

    attachHDF(hdf){
        this.hdf = hdf;
    },

    attachSSD(ssd){
        this.ssd = ssd;
    },

    computeSpeed(){
        let base = 0;

        if(this.usb) base += 1.0;      // USB Cache aktiv
        if(this.hdf) base += 0.5;      // TMP/HDF aktiv
        if(this.ssd) base += 2.0;      // SSD Boost

        // Tensor‑Stabilität einrechnen
        const stab = this.tensor.tensor.stabil?.mini || 1;
        base *= stab;

        this.state.speed = base;
        this.state.boost = base > 2.5;

        return this.state;
    },

    route(data){
        // 1. USB zuerst
        if(this.usb){
            this.usb.write(data);
        }

        // 2. TMP/HDF als RAM‑Ebene
        if(this.hdf){
            this.hdf.store(tmp.lastPosition);
        }

        // 3. SSD zuschalten wenn Boost aktiv
        if(this.state.boost && this.ssd){
            this.ssd.accel(data);
        }

        return {
            routed: true,
            speed: this.state.speed,
            boost: this.state.boost
        };
    }
};

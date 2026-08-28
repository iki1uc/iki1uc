import { HDF5 } from "../hdf5.js";   // dein HDF5‑Modul
createBuildingHierarchy(name, floors, roomsPerFloor){
    if(!this.hdf) return;

    const building = this.hdf.createGroup(name);

    for(let f = 1; f <= floors; f++){
        const floor = building.createGroup(`Etage_${f}`);

        for(let r = 1; r <= roomsPerFloor; r++){
            const room = floor.createGroup(`Raum_${f}${r}`);
            room.attrs["Adresse"] = `Gebaeude:${name}/Etage:${f}/Raum:${f}${r}`;
            room.attrs["Typ"] = "Standard";
        }
    }

    return building;
}
routeToRoom(buildingName, floor, room){
    if(!this.hdf) return;

    const path = `${buildingName}/Etage_${floor}/Raum_${room}`;
    const node = this.hdf.get(path);

    if(!node) return { error: "Raum nicht gefunden" };

    // DirectV‑Routing
    if(this.usb) this.usb.write(node.attrs.Adresse);
    if(this.hdf) this.hdf.store(node);
    if(this.state.boost && this.ssd) this.ssd.accel(node);

    return {
        routed: true,
        adresse: node.attrs.Adresse,
        speed: this.state.speed,
        boost: this.state.boost
    };
}
DirectV.createBuildingHierarchy("Gebaeude_A", 3, 12);
cell.hdfRoom = DirectV.routeToRoom("Gebaeude_A", cell.r, cell.c);

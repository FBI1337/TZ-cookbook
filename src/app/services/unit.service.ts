import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Unit } from '../models/unit.model';

@Injectable({
    providedIn: 'root',
})

export class UnitService {
    private units: Unit[] = [
        { id: '1', name: 'г'},
        { id: '2', name: 'мл'},
        { id: '3', name: 'шт'},
        { id: '4', name: 'ст.л.'},
        { id: '5', name: 'ч.л.'},
    ];

    getUnits(): Observable<Unit[]> {
        return of(this.units);
    }

    addUnit(unit: Unit): void {
        this.units.push(unit);
    }

    deleteUnit(unit: Unit): void {
        this.units = this.units.filter(u => u.id !== unit.id);
    }

    editUnit(unit:Unit): void {
        const index = this.units.findIndex(u => u.id === unit.id);
        if (index!=-1){
            this.units[index] = unit;
        }
    }
}
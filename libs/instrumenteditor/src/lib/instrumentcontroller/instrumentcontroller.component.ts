import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstrumentService } from '../instrument.service';
import { InstrumentinputformComponent } from '../instrumentinputform/instrumentinputform.component';
import { InstrumentupdateformComponent } from '../instrumentupdateform/instrumentupdateform.component';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'mffrontend-instrumentcontroller',
  standalone: true,
  imports: [CommonModule, MatTabsModule, InstrumentinputformComponent, InstrumentupdateformComponent],
  templateUrl: './instrumentcontroller.component.html',
  styleUrls: ['./instrumentcontroller.component.scss'],
})
export class InstrumentcontrollerComponent {
  noInstrumentSelected = true;

  constructor(private instrumentService: InstrumentService) {

    this.instrumentService.newInstrumentSelectedSubject.subscribe(
      () => {
        this.noInstrumentSelected = false;
      }
    )
  }
}

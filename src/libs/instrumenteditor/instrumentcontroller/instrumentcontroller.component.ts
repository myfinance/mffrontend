import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstrumentService } from '../instrument.service';
import { InstrumentinputformComponent } from '../instrumentinputform/instrumentinputform.component';
import { InstrumentupdateformComponent } from '../instrumentupdateform/instrumentupdateform.component';
import { TabViewModule } from 'primeng/tabview';


@Component({
  selector: 'mffrontend-instrumentcontroller',
  standalone: true,
  imports: [CommonModule, TabViewModule, InstrumentinputformComponent, InstrumentupdateformComponent],
  templateUrl: './instrumentcontroller.component.html',
  styleUrls: ['./instrumentcontroller.component.scss'],
})
export class InstrumentcontrollerComponent {
  noInstrumentSelected = true;

  constructor(private instrumentService: InstrumentService) {

    this.instrumentService.newInstrumentSelectedSubject.subscribe(
      () => {
        if(this.instrumentService.getSelectedInstrument() == null){
          this.noInstrumentSelected = true;
        } else {
          this.noInstrumentSelected = false;
        }
      }
    )
  }
}

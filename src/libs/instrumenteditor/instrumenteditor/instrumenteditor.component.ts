import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstrumentviewComponent } from '../instrumentview/instrumentview.component';
import { InstrumentcontrollerComponent } from '../instrumentcontroller/instrumentcontroller.component';
import { InstrumentService } from '../instrument.service';

@Component({
  selector: 'mffrontend-instrumenteditor',
  standalone: true,
  imports: [CommonModule, InstrumentviewComponent, InstrumentcontrollerComponent],
  providers: [
    InstrumentService
  ],
  templateUrl: './instrumenteditor.component.html',
  styleUrls: ['./instrumenteditor.component.css'],
})
export class InstrumenteditorComponent {}

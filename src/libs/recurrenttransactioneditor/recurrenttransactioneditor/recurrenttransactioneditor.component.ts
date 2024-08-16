import { Component } from '@angular/core';
import { RecurrenttransactionviewComponent } from '../recurrenttransactionview/recurrenttransactionview.component';
import { RecurrenttransactioninputformComponent } from '../recurrenttransactioninputform/recurrenttransactioninputform.component';

@Component({
  selector: 'mffrontend-recurrenttransactioneditor',
  standalone: true,
  imports: [RecurrenttransactionviewComponent, RecurrenttransactioninputformComponent],
  templateUrl: './recurrenttransactioneditor.component.html',
  styleUrl: './recurrenttransactioneditor.component.scss'
})
export class RecurrenttransactioneditorComponent {

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';


interface RandomUser {
  title: string;
  state: any;
  date: string;
  startHour: string;
  endHour: string;
  day: any;
  unit: string;
  responsibleUnit: string;
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  @Input() data: RandomUser = {
    title: '',
    state: null,
    date: '',
    startHour: '',
    endHour: '',
    day: null,
    unit: '',
    responsibleUnit: '',
  };

  @Output() onSave = new EventEmitter<RandomUser>();
  @Output() onClose = new EventEmitter<void>();

  constructor(private modal: NzModalRef) {
    console.log("object",this.data);
  }

  saveChanges() {
    this.onSave.emit(this.data);
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}

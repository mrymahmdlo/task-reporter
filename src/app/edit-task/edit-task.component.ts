import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { DayEnum, TaskStateEnum } from '../task-list/task-list-enums';

interface RandomUser {
  id: number;
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
  enumDayKeys = Object.keys(DayEnum).map((key) => ({
    label: (DayEnum as any)[key],
    value: key,
  }));
  enumStateKeys = Object.keys(TaskStateEnum).map((key) => ({
    label: (TaskStateEnum as any)[key],
    value: key,
  }));

  @Input() data: RandomUser = {
    id: 0,
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

  constructor(private modal: NzModalRef) {}

  saveChanges() {
    this.onSave.emit(this.data);
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { EditTaskComponent } from '../edit-task/edit-task.component';
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

interface tableData {
  content: RandomUser[];
  totalElements: number;
}

@Injectable({ providedIn: 'root' })
export class RandomUserService {
  randomUserUrl = 'http://localhost:8080/task/';

  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<tableData> {
    let params = sortField
      ? new HttpParams()
          .append('page', `${pageIndex}`)
          .append('size', `${pageSize}`)
          .append('sort', `${sortField}`)
      : new HttpParams()
          .append('page', `${pageIndex}`)
          .append('size', `${pageSize}`);
    filters.forEach((filter) => {
      filter.value.forEach((value) => {
        params = params.append(filter.key, value);
      });
    });
    return this.http
      .get<tableData>(`${this.randomUserUrl}` + 'taskPages', { params })
      .pipe(catchError(() => of()));
  }

  updateUsers(data: RandomUser): Observable<RandomUser> {
    return this.http
      .put<RandomUser>(`${this.randomUserUrl}` + 'updateTask', data)
      .pipe(catchError(() => of()));
  }

  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'app-general-task',
  templateUrl: './general-task.component.html',
  styleUrls: ['./general-task.component.scss'],
})
export class GeneralTaskComponent implements OnInit {
  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  pageSize = 100;
  pageIndex = 1;
  selectedRowData: RandomUser = {
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

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.randomUserService
      .getUsers(pageIndex - 1, pageSize, sortField, filter)
      .subscribe((data) => {
        this.loading = false;
        this.total = data.totalElements;
        this.listOfRandomUser = data.content;
      });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, filter);
  }

  constructor(
    private randomUserService: RandomUserService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, []);
  }

  getState(state: TaskStateEnum) {
    return (TaskStateEnum as any)[state];
  }

  getDay(day: DayEnum) {
    return (DayEnum as any)[day];
  }

  updateTask(data: RandomUser) {
    this.loading = true;
    this.randomUserService.updateUsers(data).subscribe(() => {
      this.loading = false;
      this.message.success('با موفقیت ویرایش شد');
    });
  }
  openEditModal(data: RandomUser) {
    this.selectedRowData = { ...data };

    this.modalService.create({
      nzTitle: 'ویرایش  ',
      nzContent: EditTaskComponent,
      nzComponentParams: {
        data,
      },
      nzFooter: [
        {
          label: 'بستن',
          onClick: (componentInstance) => componentInstance?.destroyModal(),
        },
        {
          label: 'ثبت',
          type: 'primary',
          onClick: (componentInstance) => {
            this.updateTask(data);
            componentInstance?.destroyModal();
          },
        },
      ],
    });
  }
}

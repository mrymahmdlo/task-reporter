import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DayEnum, TaskStateEnum } from './task-list-enums';

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

interface tableData {
  content: RandomUser[];
  totalElements: number;
}

@Injectable({ providedIn: 'root' })
export class RandomUserService {
  randomUserUrl = 'http://localhost:8080/task/taskPages';

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
      .get<tableData>(`${this.randomUserUrl}`, { params })
      .pipe(catchError(() => of()));
  }

  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  pageSize = 100;
  pageIndex = 1;

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

  constructor(private randomUserService: RandomUserService) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, []);
    console.log(this.pageSize);
  }

  getState(state: TaskStateEnum) {
    return (TaskStateEnum as any)[state];
  }

  getDay(day: DayEnum) {
    return (DayEnum as any)[day];
  }
}

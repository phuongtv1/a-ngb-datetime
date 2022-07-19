import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ViewChild,
  AfterViewInit,
  Injector,
  EventEmitter,
  Output
} from '@angular/core';
import {
  NgbTimeStruct,
  NgbDateStruct,
  NgbPopoverConfig,
  NgbPopover,
  NgbDatepicker
} from '@ng-bootstrap/ng-bootstrap';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { noop } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-ngb-datetime',
  templateUrl: './ngb-datetime.component.html',
  styleUrls: ['./ngb-datetime.component.scss'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgbDatetimeComponent),
      multi: true
    }
  ]
})
export class NgbDatetimeComponent
  implements ControlValueAccessor, OnInit, AfterViewInit {

    @Input()
    inputDatetimeFormat = 'd/M/yyyy H:mm:ss';
    @Input()
    placeholder: string = "dd/mm/yyyy";
    @Input()
    hourStep = 1;
    @Input()
    minuteStep = 1;
    @Input()
    secondStep = 30;
    @Input()
    seconds = true;
  
    @Input()
    disabled = false;
    @Input()
    showTimePicker;
    @Input()
    isClass = false;
    @Input()
    isMinDate = false;
  
    @Output() isTouched = new EventEmitter<boolean>();
    @Output() onTouch = new EventEmitter<boolean>();
  
    @ViewChild(NgbDatepicker, null)
    private dp: NgbDatepicker;
  
    @ViewChild(NgbPopover, null)
    private popover: NgbPopover;
  
    private onTouched: () => void = noop;
    private onChange: (_: any) => void = noop;
  
    public ngControl: NgControl;
  
    dateStruct: NgbDateStruct;
    timeStruct: NgbTimeStruct;
    date: Date;
    minDate: NgbDateStruct = { year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1, day: (new Date()).getDate() };
  
    constructor(private config: NgbPopoverConfig, private inj: Injector) {
      config.autoClose = 'outside';
      config.placement = 'bottom';
    }
  
    ngOnInit(): void {
      // tslint:disable-next-line: deprecation
      // this.ngControl = this.inj.get(NgControl);
    }
  
    ngAfterViewInit(): void {}
  
    writeValue(newModel: string) {
      if (newModel) {
        const myDate = moment(newModel).toDate();
  
        this.dateStruct = {
          year: myDate.getFullYear(),
          month: myDate.getMonth() + 1,
          day: myDate.getDate()
        };
  
        this.timeStruct = {
          hour: myDate.getHours(),
          minute: myDate.getMinutes(),
          second: myDate.getSeconds()
        };
  
        this.setDateStringModel();
      }
    }
  
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
  
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
  
    onInputChange($event: any) { }
  
    onDateChange(event: NgbDateStruct) {
      this.isTouched.emit(true);
      this.setDateStringModel();
    }
  
    onTimeChange(event: NgbTimeStruct) {
      this.isTouched.emit(true);
      this.setDateStringModel();
    }
  
    setDateStringModel() {
      if (!this.timeStruct) {
        const dateA = new Date();
        this.timeStruct = {
          hour: dateA.getHours(),
          minute: dateA.getMinutes(),
          second: dateA.getSeconds()
        };
      }
  
      if (this.dateStruct) {
        this.date = new Date(
          this.dateStruct.year,
          this.dateStruct.month - 1,
          this.dateStruct.day,
          this.timeStruct.hour,
          this.timeStruct.minute,
          this.timeStruct.second
        );
        this.onChange((new Date(this.date)).toISOString());
        // this.onChange(this.date);
        // this.onChange(new Date(new Date(this.date).getTime() - (new Date(this.date).getTimezoneOffset() * 60000)).toISOString())
      }
    }
  
    inputBlur($event) {
      this.onTouch.emit(true)
      this.onTouched();
    }
  
    onPaste(event: ClipboardEvent) {
        event.preventDefault();
    }
  
  }
  
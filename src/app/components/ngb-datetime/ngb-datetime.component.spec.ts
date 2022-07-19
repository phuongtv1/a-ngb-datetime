import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbDatetimeComponent } from './ngb-datetime.component';

describe('NgbDatetimeComponent', () => {
  let component: NgbDatetimeComponent;
  let fixture: ComponentFixture<NgbDatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbDatetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

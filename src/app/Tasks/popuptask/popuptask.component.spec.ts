import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuptaskComponent } from './popuptask.component';

describe('PopuptaskComponent', () => {
  let component: PopuptaskComponent;
  let fixture: ComponentFixture<PopuptaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopuptaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopuptaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

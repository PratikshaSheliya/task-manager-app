import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPwdComponent } from './link-pwd.component';

describe('LinkPwdComponent', () => {
  let component: LinkPwdComponent;
  let fixture: ComponentFixture<LinkPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkPwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

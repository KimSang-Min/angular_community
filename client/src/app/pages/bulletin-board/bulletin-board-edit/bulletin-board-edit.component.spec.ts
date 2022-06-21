import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinBoardEditComponent } from './bulletin-board-edit.component';

describe('BulletinBoardEditComponent', () => {
  let component: BulletinBoardEditComponent;
  let fixture: ComponentFixture<BulletinBoardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulletinBoardEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinBoardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

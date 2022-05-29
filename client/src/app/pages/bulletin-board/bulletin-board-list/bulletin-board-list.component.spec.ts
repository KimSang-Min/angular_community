import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinBoardListComponent } from './bulletin-board-list.component';

describe('BulletinBoardListComponent', () => {
  let component: BulletinBoardListComponent;
  let fixture: ComponentFixture<BulletinBoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulletinBoardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

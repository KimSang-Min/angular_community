import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinBoardUploadComponent } from './bulletin-board-upload.component';

describe('BulletinBoardUploadComponent', () => {
  let component: BulletinBoardUploadComponent;
  let fixture: ComponentFixture<BulletinBoardUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulletinBoardUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinBoardUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

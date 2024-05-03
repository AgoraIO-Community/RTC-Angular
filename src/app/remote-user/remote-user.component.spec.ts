import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteUserComponent } from './remote-user.component';

describe('RemoteUserComponent', () => {
  let component: RemoteUserComponent;
  let fixture: ComponentFixture<RemoteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoteUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

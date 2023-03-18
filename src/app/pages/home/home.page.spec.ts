import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the average of the values', () => {
    const total = 474;
    const value = 12;
    const result = component.avgGrades(total,value);
    expect(result).toBeGreaterThanOrEqual(30);
  });

  it('should get the average of 2 numbrs positive and negative', () => {
    const total = -1;
    const value = 0;
    const result =component.avgGrades(total,value);
    expect(result).toEqual(5);
  });
});

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let appComponent = new AppComponent();

  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
  }));

  it('should create the app', () => {
    const app = appComponent;
    expect(app).toBeTruthy();
  });

  it('should have `app works!` title', () => {
    const title = appComponent.title;
    expect(title).toEqual('app works!');
  });


  it('should increment/decrement value', () => {
      fixture.componentInstance.increment();
      expect(fixture.componentInstance.value).toEqual(1);

      fixture.componentInstance.decrement();
      expect(fixture.componentInstance.value).toEqual(0);
    });

    it('should increment in template', () => {
      debugElement
        .query(By.css('button.increment'))
        .triggerEventHandler('click', null);

      fixture.detectChanges();
      const value = debugElement.query(By.css('h1')).nativeElement.innerText;
      expect(value).toEqual('1');
    });

    it('should stop at 0 and show minimum message', () => {
      debugElement
        .query(By.css('button.decrement'))
        .triggerEventHandler('click', null);

      fixture.detectChanges();
      const message = debugElement.query(By.css('p.message')).nativeElement.innerText;

      expect(fixture.componentInstance.value).toEqual(0);
      expect(message).toContain('Minimum');
    });

    it('should stop at 15 and show maximum message', () => {
      fixture.componentInstance.value = 15;
      debugElement
        .query(By.css('button.increment'))
        .triggerEventHandler('click', null);

      fixture.detectChanges();
      const message = debugElement.query(By.css('p.message')).nativeElement.innerText;

      expect(fixture.componentInstance.value).toEqual(15);
      expect(message).toContain('Maximum');
    });

    it('prueba de test de cosas', () => {
      fixture.componentInstance.title = 'Hola, esto funsiona';
      debugElement
        .query(By.css('button.changeTitle'))
        .triggerEventHandler('click', null);

      fixture.detectChanges();
      /*const message = debugElement.query(By.css('p.message')).nativeElement.innerText;*/
      expect(fixture.componentInstance.title).toEqual('');
    });
});

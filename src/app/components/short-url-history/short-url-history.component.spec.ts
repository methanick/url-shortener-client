import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortUrlHistoryComponent } from './short-url-history.component';

describe('ShortUrlHistoryComponent', () => {
  let component: ShortUrlHistoryComponent;
  let fixture: ComponentFixture<ShortUrlHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ShortUrlHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortUrlHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

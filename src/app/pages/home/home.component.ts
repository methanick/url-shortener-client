import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortUrlHistoryComponent } from 'src/app/components/short-url-history/short-url-history.component';
import { FormsModule } from '@angular/forms';
import { map, Observable, throwError } from 'rxjs';
import { IShortUrl } from 'src/app/models/short-url.interface';
import { ShortUrlService } from 'src/app/services/short-url.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ShortUrlHistoryComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  originalUrl: string = '';
  shortUrl$!: Observable<IShortUrl>;
  loading: boolean = false;
  isCopy:boolean = false

  @ViewChild(ShortUrlHistoryComponent) shortUrlHistory!:ShortUrlHistoryComponent

  constructor(
    private shortUrlService: ShortUrlService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {}

  generateShortUrl() {
    this.loading = true;
    this.isCopy = false
    this.shortUrl$ = this.shortUrlService
      .generateShortUrl(this.originalUrl)
      .pipe(
        map((resp: IShortUrl) => {
          if (!resp) {
            this.loading = false;
            throwError(resp);
          }
          this.loading = false;
          this.shortUrlHistory.getHistoryShortUrls()
          return resp;
        })
      );
  }

  copyUrl(url: string) {
    this.clipboard.copy(url);
    this.isCopy = true
  }
}

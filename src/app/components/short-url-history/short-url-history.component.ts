import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortUrlService } from 'src/app/services/short-url.service';
import { map, Observable, throwError } from 'rxjs';
import { IShortUrl } from 'src/app/models/short-url.interface';

@Component({
  selector: 'app-short-url-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './short-url-history.component.html',
  styleUrls: ['./short-url-history.component.scss']
})
export class ShortUrlHistoryComponent implements OnInit {
  shortUrlHistory$!:Observable<IShortUrl[]>
  loading:boolean = false

  constructor(private shortUrlService:ShortUrlService) { }

  ngOnInit(): void {
    this.getHistoryShortUrls()
  }

  getHistoryShortUrls(){
    this.loading = true
    this.shortUrlHistory$ = this.shortUrlService.getShortUrlHistory()
    .pipe(
      map((resp: IShortUrl[]) => {
        if (!resp) {
          this.loading = false;
          throwError(resp);
        }
        this.loading = false;
        return resp;
      })
    );
  }

}

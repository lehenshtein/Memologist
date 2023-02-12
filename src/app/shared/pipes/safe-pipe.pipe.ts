import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'safePipe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string | any): unknown {
    if (!url) {
      return
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
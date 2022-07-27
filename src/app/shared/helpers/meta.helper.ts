import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environment/environment';
import { Injectable } from '@angular/core';

export interface MetaInterface {
  title: string,
  text: string,
  type: string,
  url: string,
  imgUrl?: string
}

@Injectable({
  providedIn: 'root'
})
export class MetaHelper {

  constructor (private meta: Meta, private title: Title) {
  }
  resetTitle(){
    this.title.setTitle('Мемолог');
  }

  updateTitle(title: string){
    this.title.setTitle(title);
  }

  resetMeta () {
    this.meta.updateTag({property: 'og:title', content: 'Memologist | Hot'});

    const description = 'Мемолог, український розважальний портал.';
    this.meta.updateTag({name: 'description', content: description});
    this.meta.updateTag({property: 'og:description', content: description});

    this.meta.updateTag({property: 'og:type', content: 'website'});

    this.meta.updateTag({property: 'og:url', content: environment.websiteUrl});

    this.meta.updateTag({property: 'og:image', content: '/assets/images/memologist.png'});
  }

  updateMeta (options: MetaInterface) {
    const title = ('Мемолог | ' + options.title).slice(0, 70);
    this.meta.updateTag({property: 'og:title', content: title});
    this.updateTitle(title);

    const description = options.text.slice(0, 150);
    this.meta.updateTag({name: 'description', content: description});
    this.meta.updateTag({property: 'og:description', content: description});

    this.meta.updateTag({property: 'og:type', content: options.type});

    this.meta.updateTag({property: 'og:url', content: options.url});

    const img = options.imgUrl;
    if (img) {
      this.meta.updateTag({property: 'og:image:url', content: img});
    }
  }
}

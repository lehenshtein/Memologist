import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environment/environment';
import { Injectable } from '@angular/core';
import { PostContentInterface } from '@shared/models/post.interface';

export interface MetaInterface {
  title: string,
  text: string,
  type: string,
  url: string,
  imgUrl?: string,
  tags: string[],
  content?: PostContentInterface[]
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
    this.resetTitle();
    this.meta.updateTag({property: 'og:title', content: 'Memologist | Hot'});
    this.meta.updateTag({name: 'twitter:title', content: 'Memologist | Hot'});

    this.meta.updateTag({name: 'keywords', content: 'мем, меми, розваги, розважальний контент, розважальний портал, весело, жарти'});

    const description = 'Мемолог, український розважальний портал.';
    this.meta.updateTag({name: 'description', content: description});
    this.meta.updateTag({property: 'og:description', content: description});
    this.meta.updateTag({name: 'twitter:description', content: description});

    this.meta.updateTag({property: 'og:type', content: 'website'});

    this.meta.updateTag({property: 'og:url', content: environment.websiteUrl});

    const defaultImg = 'https://memologist.com.ua/assets/images/memologist.jpg';
    this.meta.updateTag({property: 'og:image', content: defaultImg});
    this.meta.updateTag({property: 'og:image:secure_url', content: defaultImg});
    this.meta.updateTag({name: 'twitter:image', content: defaultImg});
  }

  updateMeta (options: MetaInterface) {
    const title = ('Мемолог | ' + options.title).slice(0, 70);
    this.meta.updateTag({property: 'og:title', content: title});
    this.meta.updateTag({name: 'twitter:title', content: title});
    this.updateTitle(title);

    if (options.tags && options.tags.length) {
      let keywords = '';
      options.tags.forEach(tag => {
        keywords += tag + ',';
      })
      keywords = keywords.substring(0, keywords.length - 1)
      this.meta.updateTag({name: 'keywords', content: keywords});
    }

    let description = options.text ? options.text.slice(0, 150) : '';
    let img = options.imgUrl;

    if (options.content && options.content.length) {
      let firstImg = '';
      let firstText = '';
      options.content.forEach(content => {
        if (firstImg && firstText) {
          return;
        } else if (content.type === 'text' && !firstText && content.text) {
          firstText = content.text
        } else if (content.type === 'imgUrl' && !firstImg && content.imgUrl) {
          firstImg = content.imgUrl
        }
      })

      if (firstImg) {
        img = firstImg;
      }

      if (firstText) {
        description = firstText ? firstText.slice(0, 150) : '';
      }
    }

    this.meta.updateTag({name: 'description', content: description});
    this.meta.updateTag({property: 'og:description', content: description});
    this.meta.updateTag({name: 'twitter:description', content: description});

    this.meta.updateTag({property: 'og:type', content: options.type});

    this.meta.updateTag({property: 'og:url', content: options.url});

    if (img) {
      this.meta.updateTag({property: 'og:image:url', content: img});
      this.meta.updateTag({property: 'og:image:secure_url', content: img});
      this.meta.updateTag({name: 'twitter:image', content: img});
    }
  }
}

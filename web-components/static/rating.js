const template = document.createElement('template');
template.innerHTML = `
  <style>
      .rating-stars {
      width: 100px;
      height: 100px;
      background-color: red;
    }
    /* default style */
    :host > div {
        border: 5px solid #998c4c;
          width: 110px;
          height: 110px;
    }
    /* style in a specific context */
    :host(.rating-stars) {
      border: 5px solid #4c6299;
    }
    /* style inside a specific tag */
    :host-context(main) {
      border-color: #21242d;
    }
    /* style for slotted tags from outside  */
    ::slotted(p) {
      text-align: center;
    }
    /* ... */
  </style>

<div>

    <p>Rating</p>

    <div class="rating-stars">
        <slot>
            <div class="rating-star"></div>
        </slot>
    </div>
</div>
`;

export class Rating extends HTMLElement {
  constructor() { //called onInit
    super();
    // attach Shadow DOM to the parent element.
    // save the shadowRoot in a property because, if you create your shadow DOM in closed mode,
    // you have no access from outside
    const shadowRoot = this.attachShadow({mode: 'closed'});
    // clone template content nodes to the shadow DOM
    shadowRoot.appendChild(template.content.cloneNode(true))


    // assign the div content to a class variable
    this.element = shadowRoot.querySelector('div');
    const slot = this.element.querySelector('slot');
    // assign the rating star to a class variable, that the render class can duplicate them
    this.slotNode = slot.querySelector('div');
    slot.addEventListener('slotchange', event => {
      const node = slot.assignedNodes()[0];
      if (node) {
        // assign the new node to the slotNode and render the new stars
        this.slotNode = node;
        this.render();
      }
    });
  }

  connectedCallback() {
    if (!this.rating) {
      // Set default value to zero
      this.rating = 0;
    }
    if (!this.maxRating || this.maxRating <= 0) {
      // Set default value to five
      this.maxRating = 5;
    }
    console.log('Rating added to DOM');
  };
  adoptedCallback() {
    console.log('Rating was moved into a new DOM');
  }
  disconnectedCallback() {
    console.log('Rating removed from DOM');
  }

  // then will attibute ChangedCallback will be calles

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      switch(name) {
        case 'name':
          this.rating = newVal;
          break;
        case 'max-rating':
          this.maxRating = newVal;
          break;
      }
    }
  }


  get maxRating() {
    // be careful: attributes always string, if you want a number, you must parse it on your own.
    return +this.getAttribute('max-rating');
  }

  set maxRating(value) {
    // if you set the property maxRating in this class, you must sync them with the attribute
    this.setAttribute('max-rating', value);
  }

  get rating() {
    // be careful: attributes always string, if you want a number, you must parse it by your own.
    return +this.getAttribute('rating');
  }

  set rating(value) {
    // if you set the property maxRating in this class, you must sync them with the attribute
    this.setAttribute('rating', value);
  }
}

window.customElements.define('wc-rating', Rating);

import { LitElement, html } from 'lit';

class Header extends LitElement {


  render() {
    return html`
        <kor-app-bar label="CADS - Cloud Apps Delivery System" logo="./assets/logo-dark5.png">
            <kor-icon slot="functions" icon="settings" button></kor-icon>
            <kor-avatar
              slot="functions"
              label="Miguel Garcia Sanguino"
              info="Master Cloud Apps"
              image="./assets/avatar.png"
            ></kor-avatar>
        </kor-app-bar>
    `;
  }
}

customElements.define('cads-header', Header);

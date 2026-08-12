import { Component, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  expanded = false;
  constructor(readonly auth: AuthService, readonly cart: CartService, private readonly router: Router) {
    effect(() => {
      if (this.auth.loggedIn()) this.cart.refreshItemCount();
      else this.cart.clearItemCount();
    });
  }
  logout(): void { this.auth.logout(); this.cart.clearItemCount(); this.expanded = false; this.router.navigateByUrl('/'); }
}

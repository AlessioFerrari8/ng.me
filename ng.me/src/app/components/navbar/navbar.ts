import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './navbar.css',
})
export class Navbar {
  
}

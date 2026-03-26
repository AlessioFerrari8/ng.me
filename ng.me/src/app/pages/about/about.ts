import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contributions } from '../../components/contributions/contributions';

@Component({
  selector: 'app-about',
  imports: [RouterOutlet, Contributions],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}

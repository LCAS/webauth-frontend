import { Component, Input, OnInit } from '@angular/core';
import { IdentityProvider } from '../../interface/identity-provider';

@Component({
  selector: 'app-identity-provider',
  templateUrl: './identity-provider.component.html',
  styleUrls: ['./identity-provider.component.css']
})
export class IdentityProviderComponent implements OnInit {

  @Input() title: string;
  @Input() providers: IdentityProvider[];

  constructor() { }

  ngOnInit(): void {
  }

}

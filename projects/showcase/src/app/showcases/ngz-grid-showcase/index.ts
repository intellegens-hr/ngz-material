// <ngz-grid-showcase /> component
// ----------------------------------------------------------------------------

// Import dependencies
import { Component } from '@angular/core';

// Export child components
import { NgzGridShowcaseSection01Component } from './components/section01';
import { NgzGridShowcaseSection02Component } from './components/section02';
import { NgzGridShowcaseSection03Component } from './components/section03';
import { NgzGridShowcaseSection04Component } from './components/section04';
import { NgzGridShowcaseSection05Component } from './components/section05';
import { NgzGridShowcaseSection06Component } from './components/section06';
import { NgzGridShowcaseSection07Component } from './components/section07';
import { NgzGridShowcaseSection08Component } from './components/section08';
import { NgzGridShowcaseSectionNextComponent } from './components/section99';
export const components = [
  NgzGridShowcaseSection01Component,
  NgzGridShowcaseSection02Component,
  NgzGridShowcaseSection03Component,
  NgzGridShowcaseSection04Component,
  NgzGridShowcaseSection05Component,
  NgzGridShowcaseSection06Component,
  NgzGridShowcaseSection07Component,
  NgzGridShowcaseSection08Component,
  NgzGridShowcaseSectionNextComponent
];

@Component({
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class NgzGridShowcaseComponent {}

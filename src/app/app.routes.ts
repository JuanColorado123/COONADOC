import { Routes } from '@angular/router';

import { AboutPageComponent } from '@pages/about/about-page.component';
import { AffiliationPageComponent } from '@pages/affiliation/affiliation-page.component';
import { BlogPageComponent } from '@pages/blog/blog-page.component';
import { ContactPageComponent } from '@pages/contact/contact-page.component';
import { DocumentationPageComponent } from '@pages/documentation/documentation-page.component';
import HomePageComponent from '@pages/home/home-page.component';

export const routes: Routes = [

  {
    path: 'COONADOC',
    component: HomePageComponent
  },
  // {
  //   path: 'sobre-nosotros',
  //   component: AboutPageComponent
  // },
  {
    path:'afiliados',
    component: AffiliationPageComponent
  },
  {
    path: 'documentacion',
    component: DocumentationPageComponent
  },
  {
    path: 'blog',
    component: BlogPageComponent
  },
  {
    path: 'contacto',
    component: ContactPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }

];

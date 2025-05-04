import { Routes } from '@angular/router';

import { AffiliationPageComponent } from '@pages/affiliation/affiliation-page.component';
import { BlogPageComponent } from '@pages/blog/blog-page.component';
import { PostDetailsComponent } from '@pages/blog/post-details/post-details.component';
import { ContactPageComponent } from '@pages/contact/contact-page.component';
import { DocumentationPageComponent } from '@pages/documentation/documentation-page.component';
import HomePageComponent from '@pages/home/home-page.component';

export const routes: Routes = [

  {
    path: 'COONADOC',
    component: HomePageComponent
  },
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
    component: BlogPageComponent,
  },
  {
    path: 'detail/:id',
    component: PostDetailsComponent,
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

import { Routes } from '@angular/router';
import { LoggedInService } from '../services/loggedin.service';

import { UserComponent} from './user/user.component';
import { HomeComponent} from './home/home.component';
import { LoginFormComponent} from './login-form/login-form.component';
import { SignupComponent} from './signup/signup.component';

import { AddPhotoEmotionComponent } from './add-photo-emotion/add-photo-emotion.component';
import { EmotionListComponent } from './emotion-list/emotion-list.component';
import { EmotionSingleComponent } from './emotion-single/emotion-single.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user', component: UserComponent,
        children: [
          { path: 'login', component: LoginFormComponent },
          { path: 'signup', component: SignupComponent },
        ]
    },
    { path: 'emotion/user/:userId', component: EmotionListComponent } , //  canActivate: [LoggedInService]
    { path: 'emotion/:id', component: EmotionSingleComponent },
    { path: 'new', component: AddPhotoEmotionComponent, canActivate: [LoggedInService] },
    { path: '**', redirectTo: '' }
];

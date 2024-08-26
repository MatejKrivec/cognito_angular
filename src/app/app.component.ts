import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cognito-angular';
  currentLanguage = 'fr'; // Default language

  formFields = {
    signUp: {
      name: {
        order: 1
      },
      email: {
        order: 2
      },
      password: {
        order: 3
      },
      confirm_password: {
        order: 4
      }
    },
  };

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit() {
    // Read the language from local storage if available
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    }

    // Add default translations
    I18n.putVocabularies(translations);

    // Add custom translations
    const customTranslations = {
      fr: {
        'Sign In': 'Connexion',
        'Sign Up': 'Inscription',
        'Enter your email': 'Entrez votre email',
        'Enter your Username': 'Entrez votre username',
        'Password': 'Mot de passe',
        'Forgot your password?': 'Mot de passe oublié?',
      },
      en: {
        'Sign In': 'Sign In',
        'Sign Up': 'Sign Up',
        'Enter your email': 'Enter your email',
        'Password': 'Password',
        'Forgot your password?': 'Forgot your password?',
      }
    };

    I18n.putVocabularies(customTranslations);
    I18n.setLanguage(this.currentLanguage); // Set language based on saved preference

    console.log('Initial language set to:', I18n.get(''));
  }

  onLanguageChange(event: any) {
    const selectedLanguage = event.target.value;
    this.currentLanguage = selectedLanguage;
    I18n.setLanguage(selectedLanguage); // Set the language based on user selection

    // Save the selected language to local storage
    localStorage.setItem('language', selectedLanguage);

    // Run change detection within Angular's zone
    window.location.reload();

    console.log(`Language changed to: ${selectedLanguage}`);
  }
}

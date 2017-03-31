import config from './config/config.md';
import services from './services/services.md';
import auth from './components/auth/auth.md';

angular.module('ouiexpat', [
  'ui.router',
  config,
  services,
  auth
])

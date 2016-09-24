'use strict';

require('es5-shim');
require('es5-sham');

require('jquery');
var angular = require('angular');
require('angular-resource');
require('angular-sanitize');
require('angular-route');
require('angular-cookies');
require('angular-aria');
require('angular-animate');
require('angular-messages');
require('angular-touch');
require('angular-utils-pagination');
require('bootstrap-sass');

angular
    .module('LucidAerials', [
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngCookies',
        'ngAria',
        'ngAnimate',
        'ngMessages',
        'ngTouch',
        'angularUtils.directives.dirPagination'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeCtrl',
                controllerAs: 'home'
            })
            .when('/videos', {
                templateUrl: 'views/videos.html',
                controller: 'videosCtrl',
                controllerAs: 'videos'
            })
            .when('/pictures', {
                templateUrl: 'views/pictures.html',
                controller: 'picturesCtrl',
                controllerAs: 'pics'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'contactCtrl',
                controllerAs: 'contact'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .service('videoService', require('./services/videoService'))
    .service('pictureService', require('./services/pictureService'))
    .service('transformiconService', require('./services/transformiconService'))
    .directive('hideScroll', require('./directives/homeDirective').hideScroll)
    .directive('fadeOverlay', require('./directives/homeDirective').fadeOverlay)
    .directive('mobileNav', require('./directives/indexDirective').mobileNav)
    .directive('desktopNav', require('./directives/indexDirective').desktopNav)
    .directive('mobileScrollHide', require('./directives/indexDirective').mobileScrollHide)
    .directive('footer', require('./directives/indexDirective').footer)
    .directive('modalClick', require('./directives/picturesDirective').modalClick)
    .directive('imageDropdown', require('./directives/picturesDirective').imageDropdown)
    .directive('twitterTimeline', require('./directives/twitterDirective'))
    .directive('videoPlayButton', require('./directives/videosDirective').videoPlayButton)
    .directive('scrollToCenter', require('./directives/videosDirective').scrollToCenter)
    .directive('scrollToTop', require('./directives/videosDirective').scrollToTop)
    .controller('contactCtrl', require('./controllers/contactCtrl'))
    .controller('homeCtrl', require('./controllers/homeCtrl'))
    .controller('indexCtrl', require('./controllers/indexCtrl'))
    .controller('picturesCtrl', require('./controllers/picturesCtrl'))
    .controller('videosCtrl', require('./controllers/videosCtrl'));
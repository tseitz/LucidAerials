'use strict';

lucidAerials.controller('VideosCtrl', function($scope, $timeout, $interval, $rootScope, videoService) {
        $scope.expanded = 0;
        $scope.player = videoService.player;
        $scope.videos = videoService.videos;
        $scope.playReady = true;
        $scope.seconds = 5;

        videoService.initYTPlayer();

        $scope.expand = function(index) {
            if (index !== $scope.expanded) {
                // Check if playing, if it is pause video
                if ($scope.player[$scope.expanded].getPlayerState() === 1) {
                    $scope.pause($scope.expanded);
                }

                $scope.expanded = index;

                // disable play button until video is ready
                $scope.playReady = false;

                /***** Check if type div, if it is recreate the video *****/
                if (!$scope.player[index]) {
                    // Don't block animation render
                    $timeout(function() {
                        var element = 'ytplayer' + index;
                        videoService.createPlayer(element, index).then(function () {
                            $scope.playReady = true;
                        });
                    }, 500);
                } else if ($scope.player[index]) {
                    $scope.playReady = true;
                } else {
                    console.log('Failed to expand video');
                }
            }
        };

        $scope.getImage = function (index, video) {
            if ($scope.expanded == index) {
                return video.largeImage;
            } else {
                return video.smallImage;
            }
        };

        $scope.play = function(index) {
            if ($scope.player[index]) {
                if ($scope.player[index].getPlayerState() !== 1) {
                    $scope.player[index].playVideo();
                }
            } else {
                console.log('Failed to play video ' + index);
            }
        };

        $scope.pause = function(index) {
            console.log("pause: " + index);
            if ($scope.player[index]) {
                $scope.player[index].pauseVideo();
            } else {
                console.log('Failed to pause video ' + index);
            }
        };

        $scope.cancelTimer = function (intervalPromise) {
            $interval.cancel(intervalPromise);
        }

        // Listens for videoService broadcast when video ends. Kicks off a countdown timer and autoplays next video
        $scope.$on('playNext', function (event, index) {
            var timerElem = angular.element('.expanded .countdown-timer').css({ 'display': 'block' });
            var intervalPromise = $interval(function () {
                $scope.seconds--
                if ($scope.seconds === 0) {
                    $scope.expand(index);
                    timerElem.css({ 'display': 'none' });
                    $scope.play(index);
                    $scope.cancelTimer(intervalPromise);
                }
            }, 1000);
        });
    });

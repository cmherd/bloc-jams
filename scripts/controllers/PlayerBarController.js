// PLAYER_BAR CONTROLLER ======================================================
myAppModule.controller('PlayerBarController', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
   
    $scope.volume = SongPlayer.volume / 100;
    $scope.progress = SongPlayer.getProgress();
    $scope.totalTime = '--:--';
    $scope.currentTime = '--:--';
    $scope.player = SongPlayer;
    
    $scope.$on('playSong', function (event, args) {
        $scope.message = args.songNumber;
        $scope.playing = true;
        SongPlayer.setSong(args.songNumber);
        console.log($scope.message);
    });
    
    
    $scope.$watch('progress', function(newValue, oldValue, scope) {
        var file = SongPlayer.currentSoundFile;
        if (file === null) return;
        var newPercent = newValue * 100;
        if(Math.abs(file.getPercent() - newPercent) > 1) file.setPercent(newPercent);
    });

    SongPlayer.addListener('timeupdate', function (event) {
        $scope.$apply(function () {
        $scope.progress = SongPlayer.getProgress();
        });
    });
    
    $scope.$watch('volume', function(newValue, oldValue, scope) {
        SongPlayer.setVolume(newValue * 100);
    });
      
    $scope.previousSong = function() {
        SongPlayer.previous(); 
        $scope.playing = true; 
        SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function(){
                $scope.totalTime = self.getDuration();
             });
         });
        
    SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function() {
                $scope.currentTime = self.getTime();
                });
         });
    };
    
    $scope.nextSong = function() {
        SongPlayer.next();
        $scope.playing = true; 
        
        SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
             $scope.$apply(function(){
                 $scope.totalTime = self.getDuration();
             });
        });
        SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function() {
                $scope.currentTime = self.getTime();
                });
         });
    };
    
    
    $scope.play = function(songNumber) {
        if(songNumber >= 0) {
            SongPlayer.setSong(songNumber);
            SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
                var self = this;
            $scope.$apply(function(){
                $scope.totalTime = self.getDuration();
             });
        });
            
         SongPlayer.currentSoundFile.bind('timeupdate', function(event) {
            var self = this;
            $scope.$apply(function() {
                $scope.currentTime = self.getTime();
            });
         }); 
        } else {
           SongPlayer.play();
        }
        $scope.playing = true; 
                                         
    };
                                           
    $scope.pauseSong = function() {
        SongPlayer.pause();
        $scope.playing = false;

    }; 
   
    


}]);

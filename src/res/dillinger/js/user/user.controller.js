'use strict';

module.exports = angular.module('diUser', [
  'diUser.service',
  'diDocuments.service.wordcount'
])
.controller('User', function ($rootScope, $timeout, $modal, userService, wordsCountService) {
      var vm = this;
      vm.profile = userService.profile;
      // TODO: Move this to out of here (perhaps to its own directive).
      var $divs = jQuery('.split-editor, .split-preview');
      var $allowed = $divs;
      var sync = function (e) {
          var $this = jQuery(this);
          // Prevents slow scrolling by only allows subsequent callbacks
          // on the element that the first scroll event was triggered on.
          // See #516 for details.
          if ($this.is($allowed)) {
              var other = $divs.not(this)[0],
                  percentage = this.scrollTop / (this.scrollHeight - this.offsetHeight);
                  
              other.scrollTop = Math.round(percentage * (other.scrollHeight - other.offsetHeight));
              $allowed = $this;
          } else {
              $allowed = $divs;
          }
          return false;
      };
      $rootScope.$on('preview.updated', updateWords);
      // Methods on the Controller
      vm.toggleAutoSave = toggleAutoSave;
      vm.toggleWordsCount = toggleWordsCount;
      vm.toggleNightMode = toggleNightMode;
      vm.toggleScrollSync = toggleScrollSync;
      vm.resetProfile = resetProfile;
      vm.showAbout = showAbout;

      doSync();

      function toggleAutoSave(e) {
          e.preventDefault();
          vm.profile.enableAutoSave = !vm.profile.enableAutoSave;
          userService.save(vm.profile);

          return false;
      }
      function toggleWordsCount(e) {
          e.preventDefault();
          vm.profile.enableWordsCount = !vm.profile.enableWordsCount;
          userService.save(vm.profile);

          return false;
      }
      function toggleScrollSync(e) {
          e.preventDefault();
          vm.profile.enableScrollSync = !vm.profile.enableScrollSync;
          doSync();
          userService.save(vm.profile);

          return false;
      }
      function toggleNightMode(e) {
          e.preventDefault();
          vm.profile.enableNightMode = !vm.profile.enableNightMode;
          userService.save(vm.profile);

          return false;
      }
      function resetProfile(e) {
          e.preventDefault();
          localStorage.clear();
          window.location.reload();

          return false;
      }
      function updateWords() {
          $rootScope.words = wordsCountService.count();

          return $timeout(function () {
              return $rootScope.$apply();
          }, 0);
      }
      function doSync() {
          if (vm.profile.enableScrollSync) {
              $divs.on('scroll', sync);
          } else {
              $divs.off('scroll', sync);
          }
          return false;
      }
      function showAbout(e) {
          e.preventDefault();
          $modal.open({
              template: require('raw!../components/wtfisdillinger-modal.directive.html'),
              controller: 'WTFisDillingerModalInstance',
              windowClass: 'modal--dillinger about'
          });
          return false;
      }
  });

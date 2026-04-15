var Progress = (function () {
  var STORAGE_KEY_PREFIX = "forensik_progress_";

  function getStorageKey(labId) {
    if (!labId) labId = (typeof App !== "undefined" && App.currentLab) ? App.currentLab : "default";
    return STORAGE_KEY_PREFIX + labId;
  }

  function getCompleted(labId) {
    try {
      var data = localStorage.getItem(getStorageKey(labId));
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCompleted(arr, labId) {
    try {
      localStorage.setItem(getStorageKey(labId), JSON.stringify(arr));
    } catch (e) {}
  }

  function isCompleted(labId, chapterId) {
    if (arguments.length === 1) {
      chapterId = labId;
      labId = (typeof App !== "undefined" && App.currentLab) ? App.currentLab : null;
    }
    return getCompleted(labId).indexOf(chapterId) !== -1;
  }

  function markCompleted(labId, chapterId) {
    if (arguments.length === 1) {
      chapterId = labId;
      labId = (typeof App !== "undefined" && App.currentLab) ? App.currentLab : null;
    }
    var arr = getCompleted(labId);
    if (arr.indexOf(chapterId) === -1) {
      arr.push(chapterId);
      saveCompleted(arr, labId);
    }
  }

  function markIncomplete(labId, chapterId) {
    if (arguments.length === 1) {
      chapterId = labId;
      labId = (typeof App !== "undefined" && App.currentLab) ? App.currentLab : null;
    }
    var arr = getCompleted(labId);
    var idx = arr.indexOf(chapterId);
    if (idx !== -1) {
      arr.splice(idx, 1);
      saveCompleted(arr, labId);
    }
  }

  function resetAll(labId) {
    try {
      if (labId) {
        localStorage.removeItem(getStorageKey(labId));
      } else {
        var keys = [];
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (key && key.indexOf(STORAGE_KEY_PREFIX) === 0) keys.push(key);
        }
        for (var k = 0; k < keys.length; k++) localStorage.removeItem(keys[k]);
      }
    } catch (e) {}
  }

  function getCount(labId) {
    if (!labId) labId = (typeof App !== "undefined" && App.currentLab) ? App.currentLab : null;
    return getCompleted(labId).length;
  }

  function migrateOldProgress() {
    try {
      var oldKey = "forensik_lab_progress";
      var oldData = localStorage.getItem(oldKey);
      if (!oldData) return;
      var migrated = localStorage.getItem(getStorageKey("linux-forensik"));
      if (migrated) return;
      localStorage.setItem(getStorageKey("linux-forensik"), oldData);
      localStorage.removeItem(oldKey);
    } catch (e) {}
  }

  migrateOldProgress();

  function updateChallengeProgress() {
    try {
      var labId = (typeof App !== "undefined" && App.currentLab) ? App.currentLab : "linux-forensik";
      var challengeKey = "challenge-completed-" + labId;
      var challengeData = localStorage.getItem(challengeKey);
      var completed = challengeData ? JSON.parse(challengeData) : {};
      var total = typeof Challenges !== "undefined" ? Object.keys(Challenges).length : 0;
      var solved = 0;
      var keys = Object.keys(completed);
      for (var i = 0; i < keys.length; i++) {
        if (completed[keys[i]] === true) solved++;
      }
      return {
        total: total,
        solved: solved,
        percentage: total > 0 ? Math.round((solved / total) * 100) : 0,
        completed: completed
      };
    } catch (e) {
      return { total: 0, solved: 0, percentage: 0, completed: {} };
    }
  }

  function getChallengeProgress() {
    return updateChallengeProgress();
  }

  function getOverallProgress() {
    var labId = (typeof App !== "undefined" && App.currentLab) ? App.currentLab : null;
    var chapterProgress = getCount(labId);
    var challengeProgress = getChallengeProgress();
    var totalChapters = (typeof App !== "undefined" && App.navItems) ? App.navItems.length : 0;
    var totalChallenges = typeof Challenges !== "undefined" ? Object.keys(Challenges).length : 0;
    var totalItems = totalChapters + totalChallenges;
    var completedItems = chapterProgress + challengeProgress.solved;
    return {
      chaptersCompleted: chapterProgress,
      challengesSolved: challengeProgress.solved,
      totalItems: totalItems,
      completedItems: completedItems,
      percentage: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
    };
  }

  return {
    getCompleted: getCompleted,
    isCompleted: isCompleted,
    markCompleted: markCompleted,
    markIncomplete: markIncomplete,
    resetAll: resetAll,
    getCount: getCount,
    updateChallengeProgress: updateChallengeProgress,
    getChallengeProgress: getChallengeProgress,
    getOverallProgress: getOverallProgress
  };
})();

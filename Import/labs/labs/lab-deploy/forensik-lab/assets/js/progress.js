var Progress = (function () {
  var STORAGE_KEY = "forensik_lab_progress";

  function getCompleted() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCompleted(arr) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (e) {}
  }

  function isCompleted(chapterId) {
    return getCompleted().indexOf(chapterId) !== -1;
  }

  function markCompleted(chapterId) {
    var arr = getCompleted();
    if (arr.indexOf(chapterId) === -1) {
      arr.push(chapterId);
      saveCompleted(arr);
    }
  }

  function markIncomplete(chapterId) {
    var arr = getCompleted();
    var idx = arr.indexOf(chapterId);
    if (idx !== -1) {
      arr.splice(idx, 1);
      saveCompleted(arr);
    }
  }

  function resetAll() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  function getCount() {
    return getCompleted().length;
  }

  // ========== CHALLENGE PROGRESS ==========
  function updateChallengeProgress() {
    try {
      var challengeData = localStorage.getItem('challenge-completed');
      var completed = challengeData ? JSON.parse(challengeData) : {};
      var total = Object.keys(window.Challenges).length;
      var solved = Object.keys(completed).filter(key => completed[key] === true).length;
      
      return {
        total: total,
        solved: solved,
        percentage: Math.round((solved / total) * 100),
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
    var chapterProgress = getCount();
    var challengeProgress = getChallengeProgress();
    
    var totalChapters = (window.App && App.navItems) ? App.navItems.length : 17;
    var totalChallenges = Object.keys(window.Challenges || {}).length;
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

const setLocalStorageKey = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  const getLocalStorageKey = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  
  //types - film, chara, planet
  export const getFavorites = (type) => getLocalStorageKey(type);
  export const setFavorites = (favorites, type) => setLocalStorageKey(type, favorites);
  
  export const restoreFromLocal = () => {
    try {
      if (getFavorites().length > 0) {
        for (const favorite of getFavorites()) {
          createFavoriteCard(favorite);
          console.log('hello?');
        }
      } else {
      // initFavoritesIfEmpty();
      }
    } catch {
      console.log('whoops');
    // initFavoritesIfEmpty();
    }
  };
    
  
  export const addFavorite = (newFavorite, type) => {
    let savedFavorites = getFavorites(type) || [];
  
    setFavorites([...savedFavorites, newFavorite], type);
  };
  
  export const removeFavorite = (favoriteUuid) => {
    const favoriteArr = (getFavorites());
    const removedFavorite = favoriteArr.findIndex((favorite) => favorite.uuid === favoriteUuid);
    favoriteArr.splice(removedFavorite, 1);
    setFavorites([...favoriteArr]);
  };

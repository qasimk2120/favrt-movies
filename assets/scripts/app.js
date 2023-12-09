const addMoviemodal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const userInputs = addMoviemodal.querySelectorAll('input');
const cancelAddmovieBtn = addMoviemodal.querySelector('.btn--passive');
const confirmAddMovieBtn = cancelAddmovieBtn.nextElementSibling;
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');
const alertingDeletion = () => {
  alert('To delete Movies you can press on the movies');
};
const movies = [];
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};
const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};
const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};
const deleteMovie = (movieid) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieid) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
};

const deleteMovieHandler = (movieid) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);
  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
  confirmDeletionButton.addEventListener(
    'click',
    deleteMovie.bind(null, movieid)
  );
};
const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
  <img src="${imageUrl} alt=${title}"></img> 
  </div> 
  <div class ="movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5 star </p>
  </div>
  `;
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
  alertingDeletion();
};

const closeMovieModal = () => {
  addMoviemodal.classList.remove('visible');
};
const showMovieModal = () => {
  //function
  addMoviemodal.classList.toggle('visible');
  toggleBackdrop();
};
const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};
const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInput();
  toggleBackdrop();
};
const addMovieHandler = () => {
  const titlevalue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  if (
    titlevalue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('please enter valid values(rating between 1 and 5).');
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titlevalue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
};
startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddmovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);

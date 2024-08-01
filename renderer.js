document.addEventListener('DOMContentLoaded', async () => {
  const buttonsDiv = document.getElementById('buttons');
  const videoContainer = document.getElementById('video-container');
  const videoElement = document.getElementById('video');
  let player = null;

  console.log('DOM content loaded');

  // Loads JSON file with streams
  let streams;
  try {
    const response = await fetch('streams.json');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    streams = await response.json();
    console.log('streams.json loaded');
  } catch (error) {
    console.error('Error loading streams.json:', error);
    return;
  }

  // Let's define categories (you can add or remove them)
  const categories = {
    'cat1': 'Category 1',
    'cat2': 'Category 2',
    'cat3': 'Category 3',
    'cat4': 'Category 4',
    'cat5': 'Category 5'
  };

  // A container for each category
  for (const type in categories) {
    if (categories.hasOwnProperty(type)) {
      const categoryDiv = document.createElement('div');
      const categoryTitle = document.createElement('h3');
      categoryTitle.innerText = categories[type];
      categoryDiv.appendChild(categoryTitle);
      categoryDiv.classList.add('category');
      buttonsDiv.appendChild(categoryDiv);
    }
  }

  // Groups buttons for each category
  const categoryDivs = {};
  buttonsDiv.querySelectorAll('.category').forEach(category => {
    const type = Object.keys(categories).find(key => categories[key] === category.querySelector('h3').innerText);
    if (type) {
      categoryDivs[type] = category;
    }
  });

  streams.forEach(stream => {
    const button = document.createElement('button');
    button.innerText = stream.title;
    button.onclick = () => loadStream(stream);
    
    // Adds button in the correct category
    const categoryDiv = categoryDivs[stream.type];
    if (categoryDiv) {
      categoryDiv.appendChild(button);
      console.log(`Button created for ${stream.title} in category ${stream.type}`);
    }
  });

  async function loadStream(stream) {
    console.log(`Loading stream: ${stream.title}`);

    // Shows video container
    videoContainer.style.display = 'block';

    if (player) {
      await player.destroy();
    }

    player = new shaka.Player(videoElement);
    player.configure({
      drm: {
        clearKeys: {
          [stream.keyId]: stream.keyValue
        }
      }
    });

    try {
      // Loads the manifest
      await player.load(stream.manifestUrl);
      console.log('The video has now been loaded!');
      
      // Tries to load stream automatically
      let playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Playback started automatically');
        }).catch(error => {
          console.error('Autoplay was prevented:', error);
          // Manage fallback for manually starting playback
          alert('Autoplay not allowed, please click play to start the video.');
        });
      }
    } catch (error) {
      console.error('Error loading video', error);
    }

    player.addEventListener('error', onError);
  }

  function onError(event) {
    console.error('Error event:', event);
  }
});
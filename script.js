document.addEventListener('DOMContentLoaded', function () {
    fetchRadioStations()
      .then(displayRadioStations)
      .catch(handleError);
  });
  
  function fetchRadioStations() {
    return new Promise((resolve, reject) => {
      fetch('https://api.radio-browser.info/')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch radio stations');
          }
          return response.json();
        })
        .then(data => {
          resolve(data.entries);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  function displayRadioStations(radioStations) {
    const radioStationsList = document.getElementById('radioStationsList');
    radioStations.forEach(station => {
      const stationCard = createStationCard(station);
      radioStationsList.appendChild(stationCard);
    });
  }
  
  function createStationCard(station) {
    const cardCol = document.createElement('div');
    cardCol.classList.add('col-md-4', 'mb-3');
  
    const card = document.createElement('div');
    card.classList.add('card');
  
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
  
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = station.API;
  
    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = station.Description;
  
    const link = document.createElement('a');
    link.href = station.Link;
    link.classList.add('btn', 'btn-primary');
    link.textContent = 'Visit';
  
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(link);
    card.appendChild(cardBody);
    cardCol.appendChild(card);
  
    return cardCol;
  }
  
  function handleError(error) {
    console.error('Error fetching radio stations:', error);
    // Display error message on UI
  }
  
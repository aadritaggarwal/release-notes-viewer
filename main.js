
// Initializing i18next
i18next
  .use(i18nextHttpBackend)
  .init({
    lng: 'en',
    debug: true,
    backend: {
      loadPath: 'locales/{{lng}}.json'
    }
  }, function(err, t) {
    updateContent();
  });

  
document.querySelector('#english').addEventListener(
    'click', ()=>changeLanguage('en')
  );

document.querySelector('#spanish').addEventListener(
    'click', ()=>changeLanguage('es')
  );
  

  function changeLanguage(lng) {
    console.log("Entered here: "+lng);
    i18next.changeLanguage(lng, updateContent);
  }

  function updateContent() {
    document.getElementById('title').textContent = i18next.t('title');
    document.getElementById('title').style.textAlign="center";
  
    const container = document.getElementById('release-notes-container');
    container.innerHTML = ''; 
  
    const localizedReleases = i18next.t('releases', { returnObjects: true });


    localizedReleases.forEach(note => {
      const versionHeading = document.createElement('h2');
      versionHeading.textContent = `${i18next.t('version')} ${note.version}`;
      container.appendChild(versionHeading);
  
      const notesList = document.createElement('ul');
      
      note.notes.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item; 
        notesList.appendChild(listItem);
      });
      
      container.appendChild(notesList);
    });
  }


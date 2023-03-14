const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // stores any event triggered
  window.deferredPrompt = event;

  // removes hidden class from the button
  butInstall.classList.toggle('hidden', false);
});


butInstall.addEventListener('click', async () => {
  
  const promptEvent = window.deferredPrompt;
  
  // if no prompt event triggered, stops the function here
  if (!promptEvent) {
   return;
  }
  
  // shows the prompt
  promptEvent.prompt();
  
  // resets deferred prompt variable
  window.deferredPrompt = null;
  
  // adds hidden class back to button
  butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
});

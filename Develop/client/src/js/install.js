const butInstall = document.getElementById('buttonInstall');
const textHeader = document.getElementById('textHeader');

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.visibility = 'visible';
  textHeader.textContent = 'Click the button to install!';
});

butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    if (outcome === 'accepted') {
      butInstall.setAttribute('disabled', true);
      butInstall.textContent = 'Installed!';
    } else {
      butInstall.style.visibility = 'visible';
      butInstall.textContent = 'Click the button to install!';
    }
    deferredPrompt = null;
  }
});

window.addEventListener('appinstalled', (event) => {
  textHeader.textContent = 'Successfully installed!';
  butInstall.style.visibility = 'hidden';
  console.log('👍', 'appinstalled', event);
});


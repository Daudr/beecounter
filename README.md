# Beecounter

## Server di sviluppo
Per poter utilizzare il sito/app in locale è neccessario installare [NodeJS](https://nodejs.org/it/download/).  
Fatto ciò per installare le dipendenze è necessario spostarsi della cartella root del progetto e digitare `npm install`.  
Modificare i campi del file `src/app/services/database.service.ts` per far sì che le richieste vengano inviate in locale.  
Installate le dipendenze digitate `npm start` per far partire il server e `ng serve` per l'applicazione Angular4.  
Adesso è possibile recarsi a `http://localhost/4200` per testare l'applicazione in locale

## Sito dell'applicazione
Il sito dove poter trovare l'applicazione è [Bee Counter](https://beecounter.herokuapp.com).

## Installazione applicazione
Per poter installare l'applicazione sul proprio dispositivo è necessario utilizzare [Chrome](https://www.google.it/chrome/browser/desktop/) e:  

  * Dispositivo desktop 
    Aprire gli strumenti per sviluppatori con `F12` o premere i tasti `Ctrl + Maius + I` o dal menù delle impostazioni -> altri strumenti -> strumenti per sviluppatori.  
    ![sviluppatori](https://cloud.githubusercontent.com/assets/21367391/25752137/a25d2018-31b7-11e7-91b9-5bcc82b4b615.PNG)   
    
    Dagli strumenti aprire la tab Application e poi l'opzione Manifest e cliccare su `Add to homescreen`  
    ![addhome](https://cloud.githubusercontent.com/assets/21367391/25752204/de064496-31b7-11e7-981d-126038e1879a.PNG)  
    
    Troverete l'applicazione sul desktop e nel drawer delle app di Chrome.  
    
    
  * Dispositivo mobile  
    Aprire il sito e aspettare che ci venga chiesto di aggiungere l'app alla schermata Home, se non ci viene chiesto subito è necessario ricaricare il sito
    ![cell](https://cloud.githubusercontent.com/assets/21367391/25753328/5c87afaa-31bb-11e7-8e26-b4986fab07cc.png)

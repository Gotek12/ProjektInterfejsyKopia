# ScoutScript

Stronka pod adresem [link](https://scoutscript.herokuapp.com/)

### wymagane:  node.js    
### instalacja zależności itp: ```npm install```  
### odpalanie:   ```node server.js```  -> http://localhost:8080/  

#### hasło i login: admin

####
dodać w ScoutscriptTemplate folder data/konspekty   
```diff 
+ Możliwe kożystanie bez tworzenia folderu data/konspekt i pdf
- Zawsze uruchamiamy na ekranie logowania jeśli foldery nie istnieją
```

## dodatkowa funkcjonalność
localhost:8080/del - pozwala usunąć folder data


## Nowa nawigacja:
- wszystkie części wspólne znajdują się w katalogu templates (nav, header, footer)
- aby je dołączyć używa się w danym miejscu ejs'a np:
    <%- include('templates/nav') %>
- header przyjmuje argument name który stanowi główną nazwę strony np:
    <%- include('templates/header',{'name': "Strona główna"}) %>
    

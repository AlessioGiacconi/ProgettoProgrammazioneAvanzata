# Progetto per l'esame di Programmazione Avanzata, anno accademico 2023/2024

## Obiettivo di progetto

L'obiettivo del progetto consiste nello sviluppo di un backend per la gestione di transiti attraverso varchi di controllo. In particolare, il sistema deve prevedere la gestione completa degli utenti, inclusa la gestione dei loro ruoli e stati di sospensione. Inoltre, il sistema deve essere in grado di gestire i varchi e registrare i transiti degli utenti, assicurando che siano autorizzati.

Le specifiche richieste sono le seguenti:

- Creare, eliminare e aggiornare un utente;
- Creare, eliminare e aggiornare un varco;
- Gestire le autorizzazioni di accesso ai varchi inseriti;
- Inserire i transiti nei varchi presenti, effettuando un log con il relativo status
    - Nel caso di un numero di tentativi non autorizzati superiore a 5 in un intervallo temporale di 1h è necessario sospendere l'utenza;
- Restituire un elenco degli utenti sospesi;
- Riattivare uno o più utenti sospesi;
- Restituire uno specifico transito;
- Restituire, dato un ID e un intervallo temporale, il numero di accessi (distinguendo per varco) e il numero di tentativi di accesso per violazione;
- Restituire un report (in JSON, PDF o CSV) sul numero di transiti autorizzati e non autorizzati per ogni varco in un determinato intervallo temporale, riportando le eventuali violazioni circa l'utilizzo di dispositivi di protezione individuale (DPI);
- Restituire un report (in JSON, PDF o CSV) sul numero di transiti autorizzati e non autorizzati per ogni ID, in un determinato intervallo temporale, e lo status dell'utente associato a quest'ultimo (sospeso o non sospeso).

## Rotte

Nella tabella a seguire sono presentate tutte le rotte disponibili, i livelli di utenza a cui è consentito effettuare le chiamate e una descrizione del loro obiettivo.

|     Metodo     |     Rotta     |         Livello di utenza         |     Descrizione     |
|----------------|---------------|-----------------------------------|---------------------|
| ```GET```| ```/```| Utente Std - Varco - Admin|Pagina di accesso, invita ad effettuare la registrazione oppure il login.|
|```POST```|```/register```| Utente Std - Varco - Admin|Registrazione nuovo utente-|
|```POST```|```/login```| Utente Std - Varco - Admin|Effettua il login nell'applicazione e restituisce il token JWT.|
|```GET```|```/badges/users```| Admin | Restituisce l'elenco di tutti i badge id presenti nel sistema.|
|```GET```|```/badges/user/:id```| Admin | Restituiscce leinformazioni relative all'utente con uno specifico badge id.|
|```PUT```|```/badges/user/:id```| Admin | Permette di modificare le informaizoni relative ad un utente con un determinato badge id.|
|```DELETE```|```/badges/user/:id```| Admin | Esegue l'eliminazione di un utente con un determinato badge id.|
|```GET```|```/passages/passages```| Admin | Restituisce l'elenco di tutti i varchi presenti nel sistema.|
|```POST```|```/passages/passage```| Admin | Consente l'inserimento nel sistema delle informazioni relative ad un nuovo varco.|
|```GET```|```/passages/passage/:id```| Admin | Restituisce le informazioni relative ad un determinato varco.|
|```PUT```|```/passages/passage/:id```| Admin | Permette di modificare le informazioni relative ad un determinato varco.|
|```DELETE```|```/passages/passage/:id```| Admin | Esegue l'eliminazione delle informazioni relative ad un determinato varco.|
|```POST```|```/auth/authorization```| Admin | Esegue l'inserimento di un'autorizzazione.|
|```DELETE```|```/auth/authorization/:badge/:passage```| Admin | Esegue l'eliminazione di una determinata autorizzazione.|
|```POST```|```/transits/transit```| Varco - Admin |Consente l'inserimento delle informaizoni relative al transito di un badge id attraverso un varco.|
|```GET```|```/badges/suspended-badges```| Admin | Restituisce l'elenco di tutti i badge id sospesi.|
|```PUT```|```/badges/reactivate-badges```| Admin | Permette la riattivazione di uno o più badge id sospesi.|
|```GET```|```/transits/transits```| Admin | Restituisce l'elenco di tutti i transiti che sono stati effettuati.|
|```GET```|```/transits/transit/:id```| Utente Std - Admin | Restituisce le informazioni relative ad un determinato transito che è stato effettuato.|
|```PUT```|```/transits/transit/:id```| Admin | Permette la modifica delle informazioni relative ad un transito che è stato effettuato.|
|```DELETE```|```/transits/transit/:id```| Admin | Permette l'eliminazione delle informazioni relative ad un transito.|
|```GET```|```/transits/transit-stats/:badge_id```| Utente Std - Admin | Restituisce le statistiche di accesso per un badge specifico.|
|```GET```|```/transits/passage-report```| Utente Std - Admin | Restituisce il report contenente le informazioni relative particolare varco, in formato PDF, CSV o JSON.|
|```GET```|```/transits/user-report```| Utente Std - Admin | Restituisce il report contenente le informazioni relative ai transiti di ogni badge_id.|





## Progettazione

### Diagramma dei casi d'uso

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/use-case-diagram.jpg" alt="Diagramma dei casi d'uso">
</p>

### Diagrammi delle sequenze

In questa sezione verrà fornita una descrizione di alcune delle rotte presentate precedentemente, oltre a un diagramma delle sequenze che mostri l'interazione tra i componenti del backend sviluppato. Verranno inoltre mostrati i parametri per ciascuna chiamata e gli output attesi in caso di successo.

### POST /register

Questa è la rotta di registrazione. Per ottenere una risposta, il corpo della richiesta dovrà essere del tipo:

```json
{
  "email": "francesco@mail.com",
  "passwd": "Securepassword123",
  "role": "user"
}
```
In caso di registrazione andata a buon fine, verrà mostrato il seguente risultato:

```json
{
    "status": 201,
    "message": "User registered successfully",
    "type": "application/json",
    "data": {
        "unauthorized_attempts": 0,
        "created_at": "2024-07-18T08:07:58.020Z",
        "updated_at": "2024-07-18T08:07:58.020Z",
        "badge_id": 12,
        "email": "francesco@mail.com",
        "passwd": "Securepassword123",
        "role": "user",
        "is_suspended": false,
        "tokens": 100,
        "passage_reference": null
    }
}
```

Di seguito il diagramma delle sequenze:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/Registrazione.png" alt="POST /register">
</p>
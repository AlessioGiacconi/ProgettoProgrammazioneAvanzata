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

#### POST /register

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

#### POST /login

Questa è la rotta di login. Per ottenere una risposta, il corpo della richiesta dovrà essere del tipo:

```json
{
    "email": "admin@admin.com",
    "passwd": "Password1"
}
```
In caso di accesso andato a buon fine, verrà mostrato il seguente risultato:

```json
{
    "status": 200,
    "message": "Login successful",
    "type": "application/json",
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWRnZV9pZCI6NiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpc19zdXNwZW5kZWQiOmZhbHNlLCJpYXQiOjE3MjEyOTA2MDAsImV4cCI6MTcyMTI5NDIwMH0.ZpJ28X4X59-SiX6SmvX-zR-Xki9jpgO1ubn0n8rJfFI"
}
```

Di seguito il diagramma delle sequenze:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/Login.png" alt="POST /login">
</p>

#### PUT /badges/user/:id

Questa è la rotta che permette l'aggiornamento dei dati relativi ad uno specifico utente. Una volta specificato l'ID dell'utente di interesse, occorre che il corpo della richiesta sia del seguente tipo:

```json
{
  "email": "francesco@op.com",
  "passwd": "Password5",
  "tokens": 100,
  "passage_reference": 3
}
```
In caso di avvenuto aggiornamento dei dati dell'utente con i dati inseriti nel corpo della richiesta, verrà restituito il seguente messaggio:

```json
{
    "status": 200,
    "message": "User updated successfully",
    "type": "application/json",
    "data": {
        "badge_id": 4,
        "email": "francesco@opg.com",
        "passwd": "Password5",
        "role": "passage",
        "is_suspended": false,
        "tokens": 100,
        "passage_reference": 3,
        "unauthorized_attempts": 0,
        "created_at": "2024-07-18T08:00:39.091Z",
        "updated_at": "2024-07-11T11:00:00.000Z"
    }
}
```

Di seguito il diagramma delle sequenze:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/Update_User.png" alt="PUT /badges/user/:id">
</p>

#### POST /passages/passage

Questa è una rotta che consente la creazione di un nuovo varco nel sistema. Il corpo della richiesta dovrà essere del seguente tipo:

```json
{
  "level": 2,
  "needs_dpi": true
}
```
In caso di inserimento del varco avvenuto con successo, l'output della richiesta è il seguente:

```json
{
    "status": 201,
    "message": "Passage created successfully",
    "type": "application/json",
    "data": {
        "passage_id": 6,
        "level": 2,
        "needs_dpi": true
    }
}
```
Di seguito il diagramma delle sequenze:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/Create_Passage.png" alt="POST /passages/passage">
</p>

#### PUT /passages/passage/:id

Questa rotta permette di aggiornare i dati relativi ad uno specifico varco. Una volta specificato l'ID del varco di interesse, occorre che il corpo della richiesta sia del seguente tipo:

```json
{
  "level": 3,
  "needs_dpi": false
}
```
In caso di aggiornamento andato a buon fine, verrà restituito il seguente messaggio:

```json
{
    "status": 200,
    "message": "Passage updated successfully",
    "type": "application/json",
    "data": {
        "passage_id": 1,
        "level": 3,
        "needs_dpi": false
    }
}
```

Di seguito il diagramma delle sequenze:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/Update_passage.png" alt="PUT /passages/passage/:id">
</p>

#### POST /transits/transit

Questa rotta permette l'inserimento di un nuovo transito. Il corpo della richiesta deve essere del tipo:

```json
{
  "passage": 1,
  "badge": 2,
  "transit_date": "2024-07-10T10:00:00",
  "violation_dpi": false
}
```
Se l'inserimento è andato a buon fine, verrà restituito il seguente output:

```json
{
    "status": 200,
    "message": "Transit created successfully",
    "type": "application/json",
    "data": {
        "transit_id": 7,
        "passage": 1,
        "badge": 2,
        "transit_date": "2024-07-18T09:15:37.608Z",
        "is_authorized": false,
        "violation_dpi": false
    }
}
```
Di seguito il diagramma delle sequenze:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/Create_Transit.png" alt="POST /transits/transit">
</p>

#### GET /transits/transit-stats/:badge_id

Questa rotta restituisce delle statistiche di accesso per un determinato badge ID. Una volta specificato il badge ID dell'utente di interesse, occorre passare i seguenti parametri:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/parametri_getAccessStats.png" alt="parametri da inserire per questa rotta">
</p>

In caso di successo, viene restituito il seguente risultato:

```json
{
    "status": 200,
    "message": "Access statistics retrieved successfully",
    "type": "application/json",
    "data": {
        "accessCount": {
            "1": {
                "authorized": 1,
                "unauthorized": 0,
                "violations": 1
            }
        },
        "totalUnauthorizedAttempts": 0
    }
}
```
Di seguito il diagramma delle sequenze:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/Get_Access_Stats.png" alt="GET /transits/transit-stats/:badge_id">
</p>

#### GET /transits/passage-report

Questa rotta restituisce un report con tutte le informazioni relative ai varchi presenti. Questa funzionalità permette di ottenere tale report in formato .pdf, .csv o in JSON. Occorre fornire i parametri illustrati:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/parametri_getPassageReport.png" alt="parametro relativi a questa rotta">
</p>

In caso di successo, l'output restituito è il seguente (nel caso in cui si scelga di inserire .csv come formato di output):

```
passage,authorized,unauthorized,violations
1,1,1,1
2,0,1,1
3,1,0,0
4,1,0,0
5,1,0,1
```
Nel caso in cui il formato scelto sia il pdf:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/output_pdfPassageReport.png" alt="output in pdf">
</p>

Nel caso in cui il formato scelto sia il JSON:

```json
[
    {
        "passage": 1,
        "authorized": 1,
        "unauthorized": 1,
        "violations": 1
    },
    {
        "passage": 2,
        "authorized": 0,
        "unauthorized": 1,
        "violations": 1
    },
    {
        "passage": 3,
        "authorized": 1,
        "unauthorized": 0,
        "violations": 0
    },
    {
        "passage": 4,
        "authorized": 1,
        "unauthorized": 0,
        "violations": 0
    },
    {
        "passage": 5,
        "authorized": 1,
        "unauthorized": 0,
        "violations": 1
    }
]
```

Di seguito il diagramma delle sequenze:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/Get_Passage_Report.png" alt="GET /transits/passage-report">
</p>

#### GET /transits/user-report

Questa rotta restituisce un report circa le informazioni relative ai transiti effettuati da ciascun utente presente nel sistema. Anche qui è possibile impostare il formato dell'output atteso (.pdf, .csv o JSON). I parametri richiesti sono quelli illustrati di seguito:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/parametri_getPassageReport.png" alt="parametro relativi a questa rotta">
</p>

In caso di successo, l'output restituito è il seguente (nel caso in cui si scelga di inserire .csv come formato di output):

```
badge,authorized,unauthorized,violations,status
1,1,1,1,active
2,1,0,0,active
3,0,1,1,active
4,2,0,1,active
```
Nel caso in cui il formato scelto sia il pdf:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/output_pdfUserStats.png" alt="output in pdf">
</p>

Nel caso in cui il formato scelto sia il JSON:

```json
[
    {
        "badge": 1,
        "authorized": 1,
        "unauthorized": 1,
        "violations": 1,
        "status": "active"
    },
    {
        "badge": 2,
        "authorized": 1,
        "unauthorized": 0,
        "violations": 0,
        "status": "active"
    },
    {
        "badge": 3,
        "authorized": 0,
        "unauthorized": 1,
        "violations": 1,
        "status": "active"
    },
    {
        "badge": 4,
        "authorized": 2,
        "unauthorized": 0,
        "violations": 1,
        "status": "active"
    }
]
```

Di seguito il diagramma delle sequenze:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/Get_User_Report.png" alt="GET /transits/user-report">
</p>

#### GET /badges/suspended-badges

Questa rotta restituisce un elenco degli utenti sospesi. L'output previsto in caso di successo è il seguente:

```json
{
    "status": 200,
    "message": "Suspended users returned successfully",
    "type": "application/json",
    "data": [
        {
            "badge_id": 10,
            "email": "marco@gmail.com"
        }
    ]
}
```
Di seguito il diagramma delle sequenze:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/Get_suspended_badges.png" alt="GGET /badges/suspended-badges">
</p>


#### PUT /badges/reactivate-badges

Questa rotta permette di riattivare uno o più badge id sospesi. Occorre che il corpo della richiesta sia del seguente tipo:

```json
{
    "badgeIds": [1]
}
```
Come si può vedere, è possibile passare anche una lista di badge ID sospesi. In caso di aggiornamento riuscito, l'output è il seguente:

```json
{
    "status": 200,
    "message": "User activated successfully",
    "type": "application/json",
    "updatedCount": 1,
    "data": [
        {
            "badge_id": 10,
            "email": "marco@gmail.com"
        }
    ]
}
```

Di seguito il diagramma delle sequenze:

<p align= "center">
    <img src="https://github.com/AlessioGiacconi/ProgettoProgrammazioneAvanzata/blob/master/images/Reactivate_users.png" alt="PUT /badges/reactivate-badges">
</p>

## Pattern Impiegati

### MCV (Model-View-Controller)

Il pattern MVC è un pattern architetturale che rappresenta la base per la gestione delle interaziomi tra molti sistemi web. Si basa sul principio di separazione delle responsabilità e suddivide l'applicazione in tre componenti principali: Model, responsabile dello stato e della business logic dell'applicazione; View, adibita alla sola gestione dell'interfaccia utente; e Controller, il cui compito è tradurre l'input dell'utente attraverso una gestione delle logiche di interazione.

### Singleton

Il pattern Singleton è un design pattern di tipo creazionale, ampiamente utilizzato qualora sia utile che una classe abbia un'unica istanza. Nel contesto del progetto, è stato impiegato per creare l'istanza di connessione al database, evitando la creazione di connessioni multiple che si sarebbero rivelate molto dispendiose dal punto di vista computazionale.

### Factory

Anche questo pattern fa parte della famiglia dei pattern creazionali ed è stato impiegato per l'implementazione di messaggi di errore e di successo personalizzati. Questo pattern fornisce un'interfaccia per la creazione di oggetti in una superclasse, consentendo alle sottoclassi di modificare il tipo di oggetti hce verranno creati. Un utilizzo classico di questo design pattern è proprio quello della gestione di messaggi di errore personalizzati, essendo constituiti tutti dalle medesime proprietà, status code e messaggio di errore.

### Chain of Responsability

La Chain of Responsability è un design pattern comportamentale che permette di passare richieste lungo una catena di handler. Quando una richiesta viene ricevuta, ogni handler decide se processarla o passarla al successivo handler nella catena. In altre parole, il Chain of Responsability è un pattern che disaccoppia il mittente dai suoi destinatati, dando a più di un oggetto la possibilità di gestire la richiesta. Nell'applicazione è stato impiegato questo pattern vista la grande quantità di controlli che era necessario effettuare per validare le richieste. Per implementare gli handler si sono rese utili le funzionalità di middleware messe a disposizione del framework Express ed è stato impiegato anche il modulo Express-Validator, pacchetto npm che formince un'ampia gamma di middleware per Express.js.    

### DAO (Data Access Object)

Il pattern DAO è un patterno architetturale che ha lo scopo di disaccoppiare l'accesso ai dati rispetto alla loro memorizzazione sottostante. In altre parole il DAO fornisce un'astrazione che permette di isolare il livello applicativ da quello della persistenza attraverso un'API. Tale API nasconde all'applicazione tutta la complessità delle operazione CRUD (Create, Read, Update, Delete) che avvengono nel sottostante meccanismo di memorizzazione. Solitamente, per implementare correttamente tale pattern, è necessario creare una classe DAO per ogni tablella presente nel database di riferimento, andando ad implementare come metodi delle classi le operazione CRUD. Nell'ambito del nostro progetto, il pattern DAO non è stato implementato direttamente, ma è stato adoperato l'ORM Sequelize, che consente di definire DAO, o Model, che espongono nativamente una serie di metodi per eseguire operazioni CRUD.


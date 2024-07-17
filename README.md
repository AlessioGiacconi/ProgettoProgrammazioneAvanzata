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

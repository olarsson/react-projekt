# Messageboard App - Node.js + React + Firebase
Skapad av Olof Larsson, YHJYST16, 2017.

## Om projektet
Projektets mål var att skapa en Social App i node.js på backenden med React i frontenden. Mer exakt är det en typ av skyddad messageboard där man kan läsa och kommentera på inlägg. Databasen använder sig av Google's Firebase. Exempel för användningsområde kan vara om man har en skyddad sektion på en sida där man vill informera kunder om nyheter/händeler och tillåta kunder att kommentera på inläggen.

## Hur funkar det?
Den första användaren som skapas får automatiskt rollen som "admin". Efterföljande registrerade användare blir vanliga "users". Alla kan kommentera på topics men endast admin kan skapa nya topics. Vanliga users kan ta bort sina kommenterar. Admin kan ta bort allas kommenterar inklusive hela topics. Som admin kan man även se en lista med "users" och ta bort valfri användare och ändra användares roller. Inloggning sker via Firebase autentiseringssystem. Hantering av state sker via local state i en del komponenter men på det hela taget används Redux mycket för att lyfta upp statet.

## Teknologier
Det här projektet använder React, Firebase, node, jQuery

## Extern URL
https://react-backend2.herokuapp.com/
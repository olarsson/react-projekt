# Node.js + React - Messageboard App

## Om projektet
Projektets mål var att skapa en Social App i node.js på backenden med React i frontenden. Mer exakt är det en typ av skyddad messageboard där man kan läsa och kommentera på inlägg. Exempel för användningsområde kan vara om man vill informera kunder om nyheter men endast vill att man själv ska kunna skapa en nyhet.

## Hur funkar det?
Den första användaren som skapas får automatiskt rollen som "admin". Efterföljande registrerade användare blir vanliga "users". Alla kan kommentera på topics men endast admin kan skapa nya topics. Vanliga users kan ta bort sina kommenterar. Admin kan ta bort allas kommenterar inklusive hela topics. Som admin kan man även se en lista med "users" och ta bort valfri användare.
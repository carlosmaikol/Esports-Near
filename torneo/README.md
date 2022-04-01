# Near Tournament ESPORTS
---
Near Tournament ESPORTS es un smart contract que provee un ambiente seguro para el desarrollo de torneos de videojuegos, de esta forma los videojugadores/Streamers/Patrocionadores/Empresas tienen la posibilidad de crear y gestionar torneos de un determinado juego con la finalidad de que los mismos se desarrollen de forma cómoda, organizada, se fomente el ambiente competitivo entre los videojugadores y los mismos puedan recibir algun tipo de reumeneracion o recompensas por su desempeño durante el evento.   

Las funcionalidades implementadas en el contrato son las siguientes:
* Crear Torneos
* Visualizar Torneo (Todos o torneo específico por identificador)
* Eliminar Torneos (Todos o torneo específico por identificador)
* Agregar participantes al Torneo
* Eliminar participantes (Todos los participantes del torneo o participante específico por identificador)
* Pagar al torneo el monto de la entrada de un participante

## Cómo utilizar este contrato :question:
---
### Pré-requisitos:exclamation:
1. Debe tener [NodeJs] instalado en su versión 12.0 o mayor.
2. Debe tener instalado el gestor de dependencia [Yarn]. Para saber si lo tiene, ejecute el comando "yarn --version" en la línea de comandos.
3. Instale las dependencias de yarn ejecutando "yarn install".
4. Debe tener una cuenta en la [testnet de NEAR].
5. Debe tener [NEAR-CLI] instalado de forma global en su equipo. Para saber si ya lo tiene instalado, ejecute el comando "near --version". 

## Instalación :computer:
---
1. Clone el presente repositorio con el comando "git clone https://github.com/Megazzoid/Esports-Near"
2. Vamos a iniciar sesión en nuestra wallet ubicada en la testnet mediante el comando "near login".
3. Dentro del repositorio del proyecto, instale las dependencias del mismo ejecutando "npm install" (esta operación puede tardar varios minutos)
4. Para desplegar el contrato y probar sus funciones, ejecute el comando "yarn deploy:dev" esto le devolverá un conjunto de caracteres que empezarán por "dev-" seguido por numeros generados por la red. Guárdelo, lo necesitará si quiere probar los métodos del contrato inteligente.
5. Finalmente, para ejecutar los tests (si asi lo desea) ejecute el comando "yarn test".
   
## Llamadas al Contrato desde NEAR-CLI :memo:
---
Algunos de los metodos que podemos ejecutar son los siguientes (sustituye lo marcado en negrita):

a. Crear Torneo:

near call **Super cuenta de Usuario** cTournament '{"name":"Nombre del torneo","description":"Descripcion del torneo","game":"Juego elegido para el torneo","sDate":"Fecha de Inicio del torneo"}' --accountId **Tu usuario en la testnet**

b. Visualizar todos los torneos:

near call **Super cuenta de Usuario** getTournaments '{}' --accountId **Tu usuario en la testnet**

c. Visualizar un torneo específico por Identificador:

near call **Super cuenta de Usuario** getTournament '{"tIndex":0}' --accountId **Tu usuario en la testnet**

d. Eliminar un torneo específico por Identificador:

near call **Super cuenta de Usuario** deleteTournament '{"tIndex":0}' --accountId **Tu usuario en la testnet**

e. Eliminar todos los torneos creados:

near call **Super cuenta de Usuario** deleteTournaments '{}' --accountId **Tu usuario en la testnet**

f. Agregar participantes al torneo (conociendo su identificador):

near call **Super cuenta de Usuario** addParticipant '{"tIndex": **Número identificador (Debe ser >= 0)**}' --accountId **Tu usuario en la testnet**

g. Eliminar participante específico (conociendo su identificador):

near call **Super cuenta de Usuario** deleteParticipant '{"tIndex":0,"User":"kevinhernandez.testnet"}' --accountId **Tu usuario en la testnet**

h. Eliminar todos los participantes:

near call **Super cuenta de Usuario** deleteAllParticipants '{"tIndex":0}' --accountId **Tu usuario en la testnet**

i. Pagar al torneo un determinado monto para la entrada:

near call dev-**Número de contrato** PayTicket '{"tIndex": **Número identificador de usuario**,"User":"**Usuario al que se desea transferir en la testnet**"}' --accountId **Tu usuario en la testnet** --amount **Monto a transferir (expresado en números)**

## Mockup o boceto elaborado con Figma 🎨
Abre este [enlace](https://www.figma.com/file/3xnzJcjsMmznXmsj7bs9h4/Untitled?node-id=0%3A1).

## Autores :thought_balloon:
- [Carlos Morales](https://github.com/carlosmaikol)
- [Kevin Han](https://github.com/xapho)
- [Kevin Hernandez](https://github.com/Megazzoid/)
- [Luis Gonzalez](https://github.com/ldgonzalezmedina)

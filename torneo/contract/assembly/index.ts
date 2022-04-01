/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { context, logging, storage , ContractPromiseBatch, u128 } from 'near-sdk-as';
import { Tournament, allTournaments, Participant, allParticipants,ONE_NEAR,balances } from './models';

//PASOS a seguir (cambiar vitalpoint por usuario)
//near create-account access.vitalpointai.testnet --masterAccount vitalpointai.testnet
//near keys access.usuario.testnet
//crear carpeta .env y colocar .. CONTRACT_NAME=access.youraccountname.testnet
//gitignore agregar .env
//npm run build



const contractOwner = context.sender;
//check
const allTournamentsLength = allTournaments.length;
const CONTRACT = 'torneo.kevinhernandez.testnet';



// Creates a new instance of a Tournament and stores it on a PersistentVector
//Falta por agregar el costo de entrada para el torneo y quiza limite de participantes
export function cTournament(name: string, description: string, game:string , sDate: string,owner:string,prize: u128): Tournament {
    const newTournament = new Tournament(name,description,game,sDate,owner,prize);
    allTournaments.push(newTournament);
    logging.log('New Tournament created: ' + newTournament.name)

    
    return newTournament;
}


// Returns all tournaments on the PersistentVector
export function getTournaments(): Tournament[] {
  const data = new Array<Tournament>(allTournamentsLength);
  for(let i = 0; i < allTournamentsLength; i++) {
      data[i] = allTournaments[i]
      logging.log('observando: ' +allTournaments[i].name)
      
  }
  //borrar log despues///////////
  

  return data;
}

// Returns a Tournament (if this exists)
export function getTournament(tIndex: i32): Tournament {
  //assert(allTournaments.length < tIndex,'this tournament doesnt exist') 
  //PREGUNTAR ESTO
  logging.log(allTournaments.length)
  return allTournaments[tIndex]
  
}


// Empties the PersistentVector in charge of storing all Tournaments
export function deleteTournaments(): void {
  while(allTournaments.length > 0) {
      allTournaments.pop();
  }
}

// Deletes a Tournament (if exists) based on its position on the tournament PersistentVector
export function deleteTournament(tIndex: i32): bool {
  assert(allTournaments.length < tIndex,"This tournament doesnt exist")
  allTournaments.swap_remove(tIndex);
  logging.log('The Tournament has been deleted!');
  return true
}




//OJO ESTO SE PUEDE MEJORAR
export function changeTournamentOwner(tIndex: i32): bool {
  if(allTournaments.length < tIndex) {
       logging.log('This tournament doesnt exist!')
       return false;
  } else if(allTournaments[tIndex].owner == context.sender) {
          logging.log('This user already owns this tournament.')
          return false;
      }
  else {
      allTournaments[tIndex].owner = context.sender;
      logging.log('Tournament owner swap!')
      return true;
  }
}

//returns the tournament´s owner
export function getOwner(tIndex: i32): string {
  logging.log(allTournaments.length)
  return allTournaments[tIndex].owner
}

// Adds a new contributor to the allContributors PersistentVector
export function addParticipant(tIndex: i32): Participant {
  let tournament=  getTournament(tIndex)
  const participant = new Participant()
  logging.log(tournament)
  for(let x = 0; x < tournament.participants.length; x++) {  

    assert(context.sender != tournament.participants[x].user,'this participant is already joined in the tournament')
           
  }
  logging.log('The participant has joined in the tournament successfully')
  tournament.participants.push(participant);
 // allTournaments.push("v",tournament);
  logging.log(tournament)
  allTournaments.replace(tIndex,tournament)
  
      
  return participant
}

export function deleteParticipant(tIndex: i32, User: string): Tournament {
  let tournament=  getTournament(tIndex)
  logging.log(tournament)
  for(let x = 0; x < tournament.participants.length; x++) {  
    if (User == tournament.participants[x].user) {
      var index = x;
      tournament.participants.splice(index, 1); 
      
    }
   
           
  }
  logging.log('The participant has been delete in the tournament successfully')
  
 // allTournaments.push("v",tournament);
  logging.log(tournament)
  allTournaments.replace(tIndex,tournament)
  
      
  return tournament
}

export function deleteAllParticipant(tIndex: i32): Tournament {
  let tournament=  getTournament(tIndex)
  logging.log(tournament)
  for(let x = 0; x < tournament.participants.length; x++) {  
    tournament.participants.pop()           
  }
  logging.log('The participant has been delete in the tournament successfully')
  
 // allTournaments.push("v",tournament);
  logging.log(tournament)
  allTournaments.replace(tIndex,tournament)
  
      
  return tournament
}

export function PayTicket(tIndex: i32, User: string): bool {
  let tournament=  getTournament(tIndex)
  logging.log(tournament)
  for(let x = 0; x < tournament.participants.length; x++) {  
    if (User == tournament.participants[x].user) {
      assert(context.attachedDeposit > ONE_NEAR, 'The deposit must be superior to 1 near'); 
      ContractPromiseBatch.create(CONTRACT).transfer(context.attachedDeposit)
      tournament.prize = u128.add(tournament.prize,context.attachedDeposit);
      allTournaments.replace(tIndex,tournament)
      return true
      
    }        
  }
  return false  
  
}

export function SendPrize(tIndex: i32,User: string): bool{
  let tournament=  getTournament(tIndex)
  assert(u128.le(context.attachedDeposit, tournament.prize), 'attempting to withdraw more than pool has')
  ContractPromiseBatch.create(User).transfer(context.attachedDeposit)
  return true

}
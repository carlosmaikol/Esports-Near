import { context, logging, storage , ContractPromiseBatch, u128 } from 'near-sdk-as';
import { Tournament, allTournaments, Participant, allParticipants,ONE_NEAR,balances } from '../models';
import {cTournament,getTournaments,deleteTournaments} from '..'

const name = 'nombre torneo'
const description = 'descripcion del torneo'
const owner = 'kevinhernandez.testnet'
const game = 'Dota 2'
const sData = '2016'
const prize = u128.from(0);


const torneo = new Tournament(name,description,owner,game,sData,prize)

const torneos = new Array<Tournament>()

const allTournamentsLength = allTournaments.length;


const tournamentTestingData = new Array<Tournament>(allTournamentsLength);
for(let i=0; i < allTournamentsLength; i++) {
    tournamentTestingData[i] = allTournaments[i]
}

describe("CTournament", () => {
  it('should return "a new tournament"', () => {
      expect(cTournament('nombre torneo','descripcion del torneo','kevinhernandez.testnet','Dota 2','2016',u128.from(0))).toStrictEqual(torneo);
  })
})

describe("getTournaments", () => {
  it('should return all tournaments', () => {
      expect(getTournaments()).toStrictEqual(tournamentTestingData)
  })
})

describe("deleteTournaments", () => {
  it("should delete all Tournaments", () => {
    deleteTournaments()
      expect(allTournamentsLength).toBe(0, "The tournaments must be empty.")
  })
})


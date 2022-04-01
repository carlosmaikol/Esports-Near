import { context, PersistentVector, u128,PersistentUnorderedMap,PersistentMap } from "near-sdk-as";

@nearBindgen
export class Tournament {
  name: string;
  description: string;
  owner: string;
  game: string;
  sDate: string;
  participants: Array<Participant>;
  prize: u128;



  constructor(name: string, description: string, game:string , sDate: string, owner: string,prize: u128) {
    this.owner = context.sender;
    this.name = name;
    this.description = description;
    this.game = game;
    this.sDate = sDate;
    this.participants = new Array<Participant>();
    this.prize = u128.from(0);
 
 }
} 

@nearBindgen

export class Participant {
    user: string;
    constructor() {
        this.user = context.sender;
    }
}

//check
export const allTournaments = new PersistentVector<Tournament>("v")
export const allParticipants = new PersistentVector<Participant>("c")
export const ONE_NEAR = u128.from('10000000000000000')
export const balances = new PersistentMap<string, u128>('b')
import { context, PersistentVector, u128 } from "near-sdk-as";
@nearBindgen
export class Tournament {
  name: string;
  description: string;
  owner: string;
  game: string;
  sDate: string;
  participants: Array<String>;



  constructor(name: string, description: string, game:string , sDate: string) {
    this.owner = context.sender;
    this.name = name;
    this.description = description;
    this.game = game;
    this.sDate = sDate;
    this.participants = [];
 
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
//export const ONE_NEAR = u128.from('10000000000000000')
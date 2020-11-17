import { Repository, EntityRepository } from "typeorm";
import { Participacao } from "./participacao.entity";

@EntityRepository(Participacao)
export class ParticipacaoRepository extends Repository<Participacao>
{ } 

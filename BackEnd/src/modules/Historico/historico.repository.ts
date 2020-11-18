import { Repository, EntityRepository } from "typeorm";
import { Historico } from "./historico.entity";

@EntityRepository(Historico)
export class HistoricoRepository extends Repository<Historico>
{ } 

import { Repository, EntityRepository } from "typeorm";
import { Metatrader } from "./metatrader.entity";

@EntityRepository(Metatrader)
export class MetatraderRepository extends Repository<Metatrader>
{ } 

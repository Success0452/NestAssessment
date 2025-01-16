import { Injectable } from '@nestjs/common';
import {CreateSearchDto} from "../dto/inbound/create-search.dto";
import {UpdateSearchDto} from "../dto/inbound/update-search.dto";

@Injectable()
export class SearchService {
  create(createSearchDto: CreateSearchDto) {
    return 'This action adds a new search';
  }

  findAll() {
    return `This action returns all search`;
  }

  findOne(id: number) {
    return `This action returns a #${id} search`;
  }

  update(id: number, updateSearchDto: UpdateSearchDto) {
    return `This action updates a #${id} search`;
  }

  remove(id: number) {
    return `This action removes a #${id} search`;
  }
}

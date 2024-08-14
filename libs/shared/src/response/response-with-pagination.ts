import { PaginationDto } from "../dto";

export class ResponseWithPagination<T> extends PaginationDto {
  total!: number;

  data: T[];
}
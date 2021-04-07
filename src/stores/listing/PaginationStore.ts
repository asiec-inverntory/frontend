import { makeAutoObservable } from 'mobx';

class PaginationStore {
  page = 1;

  pageSize = 10;

  constructor() {
    makeAutoObservable(this);
  }

  setPage = (page: number) => {
    this.page = page;
  }

  setPageSize = (pageSize: number) => {
    this.pageSize = pageSize;
  }
}

export default PaginationStore;

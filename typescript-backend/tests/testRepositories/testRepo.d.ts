type WhereType = Partial<{
  id: string;
  updatedAt: string;
  createdAt: string;
}>;

export interface TestRepoInterface {
  get(condition: object): Promise<object[]>;
  getOne(condition: object): Promise<object>;
  insert(data: object): Promise<object[]>;
  update(where: WhereType, data: object): Promise<object[]>;
  updateOne(where: object, data: object): Promise<object>;
  delete(condition: object): Promise<void>;
  generate(options: object): Promise<object[]>;
  generateMany(times: number, options: object): Promise<object[]>;
}
